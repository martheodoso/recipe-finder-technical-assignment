import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const filters = Object.keys(req.body).filter(key => req.body[key] === 'on');
    
    const search = req.headers.referer ? new URL(req.headers.referer).searchParams.get('search') : null;
    
    const redirectUrl = new URL(req.headers.referer || "/");
    const params: Record<string, string> = {};
    if (filters.length) params.filters = filters.join(',');
    if (search) params.search = search;
    const newParams = new URLSearchParams(params);

    res.redirect(`${redirectUrl.pathname}?${newParams.toString()}`);
}
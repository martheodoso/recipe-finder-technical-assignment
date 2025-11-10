import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Handles request to filter data by area or cuisine 
 * and return only the data that match the filters
 * This handler is called when js is off
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const filters = Object.keys(req.body).filter(key => req.body[key] === 'on');
    
    const search = req.headers.referer ? new URL(req.headers.referer).searchParams.get('search') : null;
    
    const redirectUrl = new URL(req.headers.referer as string);
    const params: Record<string, string> = {};
    if (filters.length) params.filters = filters.join(',');
    if (search) params.search = search;
    const newParams = new URLSearchParams(params);

    res.redirect(`${redirectUrl.pathname}?${newParams.toString()}`);
}
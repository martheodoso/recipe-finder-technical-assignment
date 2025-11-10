import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Add search query parameter and rediret to the filter page
 * It is only called when js is off
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const { 
        headers: {referer}, 
        body : { search }
    } = req;
 
    const searchParams = new URL(referer as string).searchParams;
    searchParams.set('search', search);
    
    res.redirect(`${new URL(referer as string).pathname}?${searchParams.toString()}`);

}
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const { 
        headers: {referer}, 
        body : { search }
    } = req;
 
    const searchParams = new URL(referer || '/').searchParams;
    searchParams.set('search', search);
    
    res.redirect(`${new URL(referer || '/').pathname}?${searchParams.toString()}`);

}
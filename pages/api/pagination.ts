// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  
  const {
    headers: {referer}, 
    query
} = req;
const { action, nextPage } = query;
const search = referer ? new URL(referer).search : "";
const { page } = Object.fromEntries(new URLSearchParams(search));

const refererUrl = referer ? new URL(referer) : null;
const currentPage = page ? parseInt(page as string, 10) : 1;
const clickedPage = nextPage ? parseInt(nextPage as string, 10) : 1;
const params = new URLSearchParams(search);

	if(action === 'previous' && currentPage <= 1) {
		params.set('page', (currentPage - 1).toString());
	} else if(action === 'next') {
		params.set('page', (currentPage + 1).toString());
	} else {
		params.set('page', clickedPage.toString());
	}


	res.redirect(`${refererUrl?.pathname}?${params.toString()}`);

}

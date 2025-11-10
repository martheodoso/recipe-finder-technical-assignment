import { filterTags } from "@/libs/utils/pageFilter";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Update or remove all filters from query params
 * It is called by the reset button and the tags
 * 
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    
    const searchParams = new URL(req.headers.referer as string).searchParams;
    const removeTag = req.query?.removeTag as string;
    const reset = req.query?.reset as string;

    if(reset && Boolean(reset)) {
        searchParams.delete('filters');
    } else {
			const filters = searchParams.get('filters')?.split(',') || [];
			const updatedFilters = filterTags(filters, removeTag);
			
			if(updatedFilters.length > 0) {
					searchParams.set('filters', updatedFilters.join(','));
			} else {
				 searchParams.delete('filters');
			}
    }
    
    const redirectUrl = new URL(req.headers.referer || '/');
    res.redirect(`${redirectUrl.pathname}?${searchParams.toString()}`);
}
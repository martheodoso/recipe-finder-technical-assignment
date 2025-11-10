import { NextApiRequest, NextApiResponse } from "next";
import handler from "./remove-filters";
import { filterTags } from "@/libs/utils/pageFilter";

jest.mock("@/libs/utils/pageFilter", () => ({
  filterTags: jest.fn(),
}));

describe("pages/api/remove-filters handler", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("removes a tag and preserves other query params", () => {
    (filterTags as jest.Mock).mockReturnValue(["a"]);
    const req = {
      headers: { referer: "https://example.com/recipes?filters=a,b&search=rice" },
      query: { removeTag: "b" },
    } as Partial<NextApiRequest>;
    const redirect = jest.fn();
    const res = { redirect } as Partial<NextApiResponse>;

    handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect((filterTags as jest.Mock)).toHaveBeenCalledWith(["a", "b"], "b");
    expect(redirect).toHaveBeenCalledTimes(1);
    const calledWith = redirect.mock.calls[0][0] as string;
    expect(calledWith.startsWith("/recipes?")).toBe(true);
    expect(calledWith).toContain("filters=a");
    expect(calledWith).toContain("search=rice");
  });

  it("removes the last filter resulting in no filters param (redirect ends with '?')", () => {
    (filterTags as jest.Mock).mockReturnValue([]);
    const req = {
      headers: { referer: "https://example.com/recipes?filters=only" },
      query: { removeTag: "only" },
    } as Partial<NextApiRequest>;
    const redirect = jest.fn();
    const res = { redirect } as Partial<NextApiResponse>;

    handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect((filterTags as jest.Mock)).toHaveBeenCalledWith(["only"], "only");
    expect(redirect).toHaveBeenCalledWith("/recipes?");
  });

});
import handler from "./search";
import type { NextApiRequest, NextApiResponse } from "next";

describe("handler", () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;

  beforeEach(() => {
    res = {
      redirect: jest.fn(),
    };
  });

  it("redirects to referer with updated search param", () => {
    req = {
      headers: { referer: "http://localhost:3000/recipes?foo=bar" },
      body: { search: "pasta" },
    };

    handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.redirect).toHaveBeenCalledWith(
      "/recipes?foo=bar&search=pasta"
    );
  });

  it("overwrites existing search param", () => {
    req = {
      headers: { referer: "http://localhost:3000/recipes?search=old&foo=bar" },
      body: { search: "new" },
    };

    handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.redirect).toHaveBeenCalledWith(
      "/recipes?search=new&foo=bar"
    );
  });
});
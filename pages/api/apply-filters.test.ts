import handler from "./apply-filters";
import type { NextApiRequest, NextApiResponse } from "next";

describe("handler", () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;

  beforeEach(() => {
    req = {
      body: {},
      headers: {},
    };
    res = {
      redirect: jest.fn(),
    };
  });

  it("redirects with filters and search params from referer", () => {
    req.body = { vegan: "on", glutenFree: "off", keto: "on" };
    req.headers = {
      referer: "http://localhost:3000/?search=pasta",
    };

    handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.redirect).toHaveBeenCalledWith(
      "/?filters=vegan,keto&search=pasta".replace(/,/g,"%2C")
    );
  });

  it("redirects with only filters if no search param in referer", () => {
    req.body = { vegan: "on", keto: "on" };
    req.headers = {
      referer: "http://localhost:3000/",
    };

    handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.redirect).toHaveBeenCalledWith(
      "/?filters=vegan,keto".replace(/,/g,"%2C")
    );
  });

  it("redirects with only search if no filters selected", () => {
    req.body = { vegan: "off", keto: "off" };
    req.headers = {
      referer: "http://localhost:3000/?search=salad",
    };

    handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.redirect).toHaveBeenCalledWith(
      "/?search=salad"
    );
  });


  it("redirects to root with no params if no filters and no search", () => {
    req.body = { vegan: "off" };
    req.headers = {
      referer: "http://localhost:3000/",
    };

    handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.redirect).toHaveBeenCalledWith(
      "/?"
    );
  });


});
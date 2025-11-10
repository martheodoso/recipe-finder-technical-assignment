import handler from "./pagination";
import type { NextApiRequest, NextApiResponse } from "next";

describe("pages/api/pagination handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function makeReq(referer: string | undefined, query: Record<string, unknown>) {
    return {
      headers: { referer },
      query,
    } as unknown as NextApiRequest;
  }

  function makeRes() {
    return {
      redirect: jest.fn(),
    } as unknown as NextApiResponse;
  }

  it("handles action=previous when current page is 1 (decrements to 0)", () => {
    const req = makeReq("http://localhost/recipes?query=chicken&page=1", {
      action: "previous",
    });
    const res = makeRes();

    handler(req, res);

    expect(res.redirect).toHaveBeenCalledWith("/recipes?query=chicken&page=0");
  });

  it("handles action=previous when current page > 1 (falls back to clickedPage default 1)", () => {
    const req = makeReq("http://localhost/recipes?query=chicken&page=5", {
      action: "previous",
    });
    const res = makeRes();

    handler(req, res);

    expect(res.redirect).toHaveBeenCalledWith("/recipes?query=chicken&page=1");
  });

  it("handles action=next (increments page)", () => {
    const req = makeReq("http://localhost/recipes?query=beef&page=3", {
      action: "next",
    });
    const res = makeRes();

    handler(req, res);

    expect(res.redirect).toHaveBeenCalledWith("/recipes?query=beef&page=4");
  });

  it("handles no action but nextPage provided (sets page to nextPage)", () => {
    const req = makeReq("http://localhost/recipes?query=beef", {
      nextPage: "7",
    });
    const res = makeRes();

    handler(req, res);

    expect(res.redirect).toHaveBeenCalledWith("/recipes?query=beef&page=7");
  });
});
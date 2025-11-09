import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmptyResults from "./EmptyResults";

describe("EmptyResults component", () => {
  test("renders heading and message", () => {
    const { container } = render(<EmptyResults />);
    expect(container).toMatchSnapshot();
  });
});
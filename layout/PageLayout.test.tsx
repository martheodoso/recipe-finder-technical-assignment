import React from "react";
import { render, screen } from "@testing-library/react";
import PageLayout from "./PageLayout";

describe("PageLayout", () => {
  it("render correctly", () => {
    const { container } = render(
      <PageLayout>
        <div>Test Content</div>
      </PageLayout>
    );
    expect(container).toMatchSnapshot();
  });

  it("renders the header with correct title", () => {
    render(
      <PageLayout>
        <div>Test Content</div>
      </PageLayout>
    );
    expect(
      screen.getByRole("heading", { name: /Recipe Finder/i })
    ).toBeInTheDocument();
  });

  it("renders children inside the layout", () => {
    render(
      <PageLayout>
        <div data-testid="child">Child Content</div>
      </PageLayout>
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Child Content");
  });
});
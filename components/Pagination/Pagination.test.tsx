import React from "react";
import { render, screen } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders Previous and Next buttons", () => {
    const { container } = render(<Pagination pages={5} currentPage={3} />);
    expect(container).toMatchSnapshot();
  });

  it("renders correct number of page buttons", () => {
    render(<Pagination pages={4} currentPage={2} />);
    const pageButtons = screen.getAllByRole("button", { name: /Page \d+/i });
    expect(pageButtons).toHaveLength(4);
    pageButtons.forEach((btn, idx) => {
      expect(btn).toHaveTextContent((idx + 1).toString());
    });
  });

  it("disables Previous button on first page", () => {
    render(<Pagination pages={3} currentPage={1} />);
    expect(screen.getByRole("button", { name: /Previous Page/i })).toBeDisabled();
  });

  it("disables Previous button when currentPage is undefined", () => {
    render(<Pagination pages={3} />);
    expect(screen.getByRole("button", { name: /Previous Page/i })).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(<Pagination pages={3} currentPage={3} />);
    expect(screen.getByRole("button", { name: /Next page/i })).toBeDisabled();
  });

  it("highlights the current page button", () => {
    render(<Pagination pages={3} currentPage={2} />);
    const pageButtons = screen.getAllByRole("button", { name: /Page \d+/i });
    expect(pageButtons[1]).toHaveClass("bg-blue-800");
  });
});
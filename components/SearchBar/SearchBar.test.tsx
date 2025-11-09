import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));


describe("SearchBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    (useRouter as jest.Mock).mockReturnValue({ query: {} });

    const { container } = render(<SearchBar handleSearch={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it("renders input with value from router.query.search and updates on change", () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { search: "pasta" } });

    render(<SearchBar handleSearch={jest.fn()} />);

    const input = screen.getByLabelText(
      "Search and discover delicious meals from around the world"
    ) as HTMLInputElement;

    expect(input.value).toBe("pasta");

    fireEvent.change(input, { target: { value: "pasta carbonara" } });
    expect(input.value).toBe("pasta carbonara");
  });

  it("calls handleSearch with the latest search term when Search button is clicked", () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { search: "beef" } });

    const handleSearch = jest.fn();
    render(<SearchBar handleSearch={handleSearch} />);

    const input = screen.getByLabelText(
      "Search and discover delicious meals from around the world"
    ) as HTMLInputElement;
    const button = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "ramen" } });
    fireEvent.click(button);

    expect(handleSearch).toHaveBeenCalledTimes(1);
    // first arg is the click event, second arg should be the current search term
    expect(handleSearch.mock.calls[0][1]).toBe("ramen");
  });

  it("uses empty string when router.query.search is undefined", () => {
    (useRouter as jest.Mock).mockReturnValue({ query: {} });

    render(<SearchBar handleSearch={jest.fn()} />);

    const input = screen.getByLabelText(
      "Search and discover delicious meals from around the world"
    ) as HTMLInputElement;

    expect(input.value).toBe("");
  });
});
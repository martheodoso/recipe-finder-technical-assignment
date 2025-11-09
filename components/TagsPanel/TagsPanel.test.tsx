import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import TagsPanel from "./TagsPanel";

// Mock uuid to keep keys stable
jest.mock("uuid", () => ({ v4: () => "stable-uuid" }));

describe("TagsPanel", () => {
  it("renders nothing when tags is empty", () => {
    const { container } = render(<TagsPanel tags={[]} handleTagClick={jest.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders a Tag button for each tag with the correct title", () => {
    const tags = ["british", "chicken", "vegan"];
    render(<TagsPanel tags={tags} handleTagClick={jest.fn()} />);

    for (const tag of tags) {
      const btn = screen.getByTestId(`${tag}`);
      const title = screen.getByTestId(`title-${tag}`);
      expect(btn).toBeInTheDocument();
      expect(title).toHaveTextContent(tag);
    }
  });

  it("calls handleTagClick with event and tag when a tag is clicked", () => {
    const tags = ["dessert"];
    const handleTagClick = jest.fn();
    render(<TagsPanel tags={tags} handleTagClick={handleTagClick} />);

    const btn = screen.getByTestId("dessert");
    fireEvent.click(btn);

    expect(handleTagClick).toHaveBeenCalledTimes(1);
    const call = handleTagClick.mock.calls[0];
    // first arg is the event, second arg is the tag string
    expect(call[1]).toBe("dessert");
    expect(call[0]).toHaveProperty("type", "click");
  });
});
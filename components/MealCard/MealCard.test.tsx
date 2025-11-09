import React from "react";
import { render, screen } from "@testing-library/react";
import MealCard from "./MealCard";

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: Record<string, string>) => <img {...props} />,
}));

describe("MealCard", () => {
  const props = {
    image: "/test-image.jpg",
    title: "Test Meal",
    link: "/meal/test",
  };

  it("renders the title", () => {
    render(<MealCard {...props} />);
    expect(screen.getByText("Test Meal")).toBeInTheDocument();
  });

  it("renders the image with correct src and alt", () => {
    render(<MealCard {...props} />);
    const img = screen.getByAltText("Test Meal") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(props.image);
  });

  it("renders the link with correct href", () => {
    render(<MealCard {...props} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", props.link);
  });

  it("does not render image if image prop is missing", () => {
    render(<MealCard title="No Image Meal" link="/meal/no-image" image={null} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
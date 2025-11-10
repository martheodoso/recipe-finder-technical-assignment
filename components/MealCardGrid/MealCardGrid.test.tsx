import React from "react";
import { render, screen } from "@testing-library/react";
import MealCardGrid from "./MealCardGrid";
import { CardDetails } from "@/lib/types";

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: Record<string, string>) => <img {...props} />,
}));

const mockCardDetails: CardDetails[] = [
  { id: "1", imageSrc: "img1.jpg", title: "Meal 1" },
  { id: "2", imageSrc: "img2.jpg", title: "Meal 2" },
];

describe("MealCardGrid", () => {
  it("renders the correct number of MealCard components", () => {
    render(<MealCardGrid cardDetails={mockCardDetails} />);
    const mealCards = screen.getAllByTestId("meal-card");
    expect(mealCards).toHaveLength(mockCardDetails.length);
  });

  it("passes correct props to MealCard", () => {
    const mockTestID = ["Meal-1", "Meal-2"];
    render(<MealCardGrid cardDetails={mockCardDetails} />);
    mockCardDetails.forEach((detail, index) => {
      expect(screen.getByText(detail.title)).toBeInTheDocument();
      expect(screen.getByTestId(mockTestID[index])).toHaveAttribute("src", detail.imageSrc);
    });
  });

  it("renders nothing if cardDetails is empty", () => {
    render(<MealCardGrid cardDetails={[]} />);
    expect(screen.queryByTestId("meal-card")).not.toBeInTheDocument();
  });
});
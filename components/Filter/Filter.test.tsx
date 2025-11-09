import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "./Filter";

describe("Filter component", () => {
  it("renders a checkbox and label with the provided item and checked state", () => {
    const { container } = render(<Filter item="Vegan" isChecked={true} />);
    expect(container).toMatchSnapshot();
  });

  it("calls handleCheckBoxClick when the checkbox is interacted with", () => {
    const handle = jest.fn();
    render(<Filter item="Gluten Free" isChecked={false} handleCheckBoxClick={handle} />);

    const checkbox = screen.getByLabelText("Gluten Free") as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(handle).toHaveBeenCalledTimes(1);
  });

  it("does not throw if no handler is provided and the checkbox is clicked", () => {
    render(<Filter item="Vegetarian" isChecked={false} />);

    const checkbox = screen.getByLabelText("Vegetarian") as HTMLInputElement;
    expect(() => fireEvent.click(checkbox)).not.toThrow();
  });
});
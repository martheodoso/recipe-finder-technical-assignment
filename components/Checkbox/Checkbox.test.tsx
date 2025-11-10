import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "./Checkbox";

describe("Filter component", () => {
  it("renders a checkbox and label with the provided item and checked state", () => {
    const handle = jest.fn();
    const { container } = render(<Filter item="Vegan" isChecked={true} handleCheckBoxClick={handle} />);
    expect(container).toMatchSnapshot();
  });

  it("calls handleCheckBoxClick when the checkbox is interacted with", () => {
    const handle = jest.fn();
    render(<Filter item="Gluten Free" isChecked={false} handleCheckBoxClick={handle} />);

    const checkbox = screen.getByLabelText("Gluten Free") as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(handle).toHaveBeenCalledTimes(1);
  });

});
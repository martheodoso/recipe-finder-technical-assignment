import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Button from "./Button";

describe("Button component", () => {
	it("renders the provided label", () => {
		const { container } = render(<Button actionForm="/submit" label="Click me" />);
		expect(container).toMatchSnapshot();
	});

	it("calls handleClick when clicked", () => {
		const handleClick = jest.fn();
		render(<Button actionForm="/do" label="Go" handleClick={handleClick} />);
		const btn = screen.getByRole("button", { name: /go/i });
		fireEvent.click(btn);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("sets the formAction attribute on the button element", () => {
		render(<Button actionForm="/my-action" label="Submit" />);
		const btn = screen.getByRole("button", { name: /submit/i });
		expect(btn.getAttribute("formAction")).toBe("/my-action");
	});

	it("does not throw when no handleClick is provided and can be clicked", () => {
		render(<Button actionForm="/none" label="NoHandler" />);
		const btn = screen.getByRole("button", { name: /nohandler/i });
		expect(() => fireEvent.click(btn)).not.toThrow();
	});
});
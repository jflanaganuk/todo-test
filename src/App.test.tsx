import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("TODO APP tests", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0);
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
    localStorage.clear();
  });
  it("should render a list of items to do", () => {
    localStorage.setItem(
      "items",
      JSON.stringify([{ id: 0, title: "test", completed: false }])
    );
    render(<App />);
    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
  it("should add an item to the list of items when submitted", () => {
    render(<App />);

    userEvent.click(screen.getByRole("textbox"));
    userEvent.keyboard("test item by react testing library");
    userEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(
      screen.getByText(/test item by react testing library/i)
    ).toBeInTheDocument();
    expect(localStorage.getItem("items")).toBe(
      JSON.stringify([
        {
          id: 0,
          title: "test item by react testing library",
          completed: false,
        },
      ])
    );
  });
  it("should not submit an item if blank", () => {
    render(<App />);

    userEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(
      screen.queryByText(/test item by react testing library/i)
    ).not.toBeInTheDocument();
    expect(localStorage.getItem("items")).toBe(null);
  });
  it("should complete an item in the list when clicked", () => {
    localStorage.setItem(
      "items",
      JSON.stringify([
        { id: 0, title: "test", completed: false },
        { id: 1, title: "notthis", completed: false },
      ])
    );
    render(<App />);
    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
    expect(screen.getByText(/test/i)).not.toHaveClass("Complete");
    userEvent.click(screen.getByText(/test/i));
    expect(screen.getByText(/test/i)).toHaveClass("Complete");
    expect(screen.getByText(/notthis/i)).not.toHaveClass("Complete");
  });
  it('should clear the list of completed items only when "clear completed" is clicked', () => {
    localStorage.setItem(
      "items",
      JSON.stringify([
        { id: 0, title: "test", completed: false },
        { id: 1, title: "notthis", completed: false },
      ])
    );
    render(<App />);
    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
    expect(screen.getByText(/test/i)).not.toHaveClass("Complete");
    userEvent.click(screen.getByText(/test/i));
    expect(screen.getByText(/test/i)).toHaveClass("Complete");
    expect(screen.getByText(/notthis/i)).not.toHaveClass("Complete");
    userEvent.click(screen.getByRole("button", { name: "Clear Completed" }));
    expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    expect(screen.getByText(/notthis/i)).toBeInTheDocument();
  });
  it('should clear the list completely when "clear all" is clicked', () => {
    localStorage.setItem(
      "items",
      JSON.stringify([
        { id: 0, title: "test", completed: false },
        { id: 1, title: "notthis", completed: false },
      ])
    );
    render(<App />);
    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
    expect(screen.getByText(/test/i)).not.toHaveClass("Complete");
    userEvent.click(screen.getByText(/test/i));
    expect(screen.getByText(/test/i)).toHaveClass("Complete");
    expect(screen.getByText(/notthis/i)).not.toHaveClass("Complete");
    userEvent.click(screen.getByRole("button", { name: "Clear All" }));
    expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/notthis/i)).not.toBeInTheDocument();
  });
});

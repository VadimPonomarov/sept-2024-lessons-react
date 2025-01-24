import { render, fireEvent, waitFor } from "@testing-library/react";

import ThemeToggle from "./ThemeToggle.tsx";

describe("ThemeToggle", () => {
  it('initial theme is set to "light"', () => {
    const { getByTestId } = render(<ThemeToggle />);
    expect(getByTestId("moon-icon")).toBeInTheDocument();
  });

  it("theme toggles correctly when button is clicked", () => {
    const { getByRole, getByTestId } = render(<ThemeToggle />);
    const button = getByRole("button");
    fireEvent.click(button);
    expect(getByTestId("sun-icon")).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByTestId("moon-icon")).toBeInTheDocument();
  });

  it("document element class is updated correctly when theme changes", () => {
    const { getByRole } = render(<ThemeToggle />);
    const button = getByRole("button");
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("button icon changes correctly when theme changes", async () => {
    const { getByRole, getByTestId } = render(<ThemeToggle />);
    const button = getByRole("button");
    expect(getByTestId("moon-icon")).toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(() => getByTestId("sun-icon"));
    expect(getByTestId("sun-icon")).toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(() => getByTestId("moon-icon"));
    expect(getByTestId("moon-icon")).toBeInTheDocument();
  });
});

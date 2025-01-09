import { render } from "@testing-library/react";
import { TestDrawer } from "./TestDrawer";
import { jest } from "@jest/globals";

import "../../../testSetup";

jest.mock("../../helpers/getEnvironments", () => ({
  getEnvironments: () => ({
    VITE_API_URL: "https://api.example.com",
  }),
}));

describe("TestDrawer", () => {
  it("renders a Dialog when isDesktop is true", () => {
    jest.spyOn(window, "matchMedia").mockImplementation((query) => ({
      media: query,
      matches: true,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(() => true),
    }));

    const { getByRole, queryByText } = render(<TestDrawer userId="123" />);
    expect(
      getByRole("button", {
        name: "",
      }),
    ).toBeInTheDocument();
    expect(
      getByRole("button", {
        name: "",
      }).querySelector("svg"),
    ).toHaveClass("lucide lucide-shopping-cart");
    expect(queryByText("TestDrawerCard")).not.toBeInTheDocument();
  });
});
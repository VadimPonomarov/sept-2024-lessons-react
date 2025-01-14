import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

Object.defineProperty(global, "TextEncoder", {
  value: TextEncoder,
});

Object.defineProperty(global, "TextDecoder", {
  value: TextDecoder,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

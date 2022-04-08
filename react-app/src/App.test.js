import { render, screen } from "@testing-library/react";
import App from "./App";

test("App title", () => {
  render(<App />);
  const title = screen.getByText(/To-do App/i);
  expect(title).toBeInTheDocument();
});

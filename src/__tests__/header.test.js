import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("Home Page", () => {
  it("renders a heading", () => {
    render(<Header />);
    const heading = screen.getByText("NEWS");
    expect(heading).toBeInTheDocument();
  });
});

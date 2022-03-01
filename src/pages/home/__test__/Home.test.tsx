import { render, screen } from "@testing-library/react";
import Home from "../Home";

describe("test home component", () => {
  it("can navigate to homepage", async () => {
    render(<Home />);
    expect(
      await screen.findByText(
        /Plan everything you need here in a single website/
      )
    ).toBeDefined();
  });
});

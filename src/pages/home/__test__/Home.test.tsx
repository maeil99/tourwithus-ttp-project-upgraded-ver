import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import user from "@testing-library/user-event";
import Home from "../Home";

const MockHomePage = () => {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

describe("test home component", () => {
  it("can navigate to homepage", async () => {
    render(<MockHomePage />);
    expect(
      await screen.findByText(
        /Plan everything you need here in a single website/
      )
    ).toBeDefined();

    const getStartedBtn = await screen.findByText(/Get Started/);
    user.click(getStartedBtn);
  });
});

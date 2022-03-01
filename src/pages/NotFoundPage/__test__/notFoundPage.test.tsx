import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";

const MockNotFoundPage = () => {
  return (
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>
  );
};

describe("test 404 page", () => {
  it("can navigate to not found page", async () => {
    render(<MockNotFoundPage />);
    expect(await screen.findByText(/404/)).toBeVisible();
  });
});

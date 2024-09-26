import { render } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading", () => {
  test("should render loading", async () => {
    const { getByRole } = render(<Loading />);
    expect(getByRole("progressbar")).toBeDefined();
  });
});

import { render } from "@testing-library/react";
import ResultCard, { ResultCardProps } from "./ResutCard";
import userEvent from "@testing-library/user-event";

const defaultProps: ResultCardProps = {
  keywords: "TLP HAIRPIN OF LOVE",
  category: "12",
  postMessage: "Message for post",
  title: "Result",
  type: "1",
};

describe("ResultCard", () => {
  const renderComponent = (props: ResultCardProps = defaultProps) => {
    return render(<ResultCard {...props} />);
  };
  test("should render ResultCard", () => {
    const { container } = renderComponent();
    expect(container.querySelector("#keywords")).toBeDefined();
    expect(container.querySelector("#post-message")).toBeDefined();
  });
  test("should not render keywords if empty", () => {
    const { container } = renderComponent({ ...defaultProps, keywords: "" });
    expect(container.querySelector("#keywords")).toBeNull();
    expect(container.querySelector("#post-message")).toBeDefined();
  });
  test("should not render post-message if empty", () => {
    const { container } = renderComponent({ ...defaultProps, postMessage: "" });
    expect(container.querySelector("#post-message")).toBeNull();
    expect(container.querySelector("#keywords")).toBeDefined();
  });
  test("should copy texts to clipboard", async () => {
    const { queryByRole } = renderComponent({
      ...defaultProps,
    });
    const button = queryByRole("button");
    const user = userEvent.setup();
    const writeTextMock = jest
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue();
    await user.click(button as Element);

    const processedMessage = `${defaultProps.postMessage}\n\n`;
    const processedKeywords = `${defaultProps.keywords}\n\n`;

    expect(writeTextMock).toHaveBeenCalledWith(
      `${processedMessage}${processedKeywords}`,
    );
  });
  test("should show toast when copying clipboard", async () => {
    const { queryByRole } = renderComponent({
      ...defaultProps,
    });
    const button = queryByRole("button");
    const user = userEvent.setup();
    await user.click(button as Element);
    expect(queryByRole("alert")).toBeDefined();
  });
});

import { render } from "@testing-library/react";
import ResultCard, { ResultCardProps } from "./ResutCard";

const defaultProps: ResultCardProps = {
  accounts: "srchafreen\nAngelssBecky",
  keywords: "TLP HAIRPIN OF LOVE",
  category: "12",
  hashtags: "srchafreen\nBeckysAngels",
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
    expect(container.querySelector("#hashtags")).toBeTruthy();
    expect(container.querySelector("#keywords")).toBeTruthy();
    expect(container.querySelector("#accounts")).toBeTruthy();
    expect(container.querySelector("#post-message")).toBeTruthy();
  });
});

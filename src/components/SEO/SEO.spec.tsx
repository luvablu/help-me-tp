import { render } from "@testing-library/react";
import SEO from "./SEO";
import { Helmet } from "react-helmet";

describe("SEO", () => {
  test("should render SEO component", async () => {
    render(<SEO />);
    const helmet = Helmet.peek();
    expect(helmet.title).toBe("Help me trend");
    expect(
      helmet.metaTags.find((meta) => meta.name === "description")?.content,
    ).toBe("Application to help with trending parties in social media");
    expect(
      helmet.metaTags.find((meta) => meta.name === "keywords")?.content,
    ).toBe("social media, trending party, generator");
  });
});

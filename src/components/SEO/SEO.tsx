import { FC } from "react";
import { Helmet } from "react-helmet";

const SEO: FC = () => {
  return (
    <Helmet>
      <title>Help me trend</title>
      <meta
        name="description"
        content="Application to help with trending parties in social media"
      />
      <meta name="keywords" content="social media, trending party, generator" />
    </Helmet>
  );
};

export default SEO;

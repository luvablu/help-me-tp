import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { FC, useRef } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./ResultCard.css";

export interface ResultCardProps {
  title: string;
  postMessage: string;
  keywords: string;
  category: string;
  type: string;
}

const ResultCard: FC<ResultCardProps> = ({
  title,
  postMessage,
  keywords,
  category,
  type,
}) => {
  const toast = useRef<Toast>(null);
  const { saveUserSession } = useLocalStorage();

  const copyToClipboard = () => {
    const processedMessage = postMessage ? `${postMessage}\n\n` : "";
    const processedKeywords = keywords ? `${keywords}` : "";
    navigator.clipboard.writeText(
      `${processedMessage}${processedKeywords}`,
    );
    toast.current?.show({
      severity: "success",
      summary: "Great!",
      detail: "Copied to clipboard",
      life: 3000,
    });
    saveUserSession({
      category: category,
      type: type as "multiple" | "boolean" | "",
      keywords: keywords,
    });
  };

  return (
    <>
      <Toast ref={toast} position="center" />
      <Card className="card" title={title}>
        <Button
          className="copy-button"
          onClick={copyToClipboard}
          severity="info"
        >
          Copy
        </Button>
        <div className="result">
          {postMessage && <div id="post-message">{`${postMessage}\n\n`}</div>}
          {keywords && <div id="keywords">{`${keywords}\n\n`}</div>}
        </div>
      </Card>
    </>
  );
};

export default ResultCard;

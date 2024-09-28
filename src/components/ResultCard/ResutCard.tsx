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
  accounts: string;
  hashtags: string;
  category: string;
  type: string;
}

const ResultCard: FC<ResultCardProps> = ({
  title,
  postMessage,
  keywords,
  accounts,
  hashtags,
  category,
  type,
}) => {
  const toast = useRef<Toast>(null);
  const { saveUserSession } = useLocalStorage();

  const processHashtags = () => {
    if (hashtags === "") return hashtags;
    return hashtags
      .split("\n")
      .map((hashtag) => {
        return hashtag[0] != "#" ? `#${hashtag.trim()}` : hashtag;
      })
      .join("\n");
  };

  const processAccounts = () => {
    if (accounts === "") return accounts;
    return accounts
      .split("\n")
      .map((account) => {
        return account[0] != "@" ? `@${account.trim()}` : account;
      })
      .join("\n");
  };

  const copyToClipboard = () => {
    const processedMessage = postMessage ? `${postMessage}\n\n` : "";
    const processedAccount = accounts ? `${processAccounts()}\n\n` : "";
    const processedKeywords = keywords ? `${keywords}\n\n` : "";
    const processedHashtags = hashtags ? `${processHashtags()}` : "";
    navigator.clipboard.writeText(
      `${processedMessage}${processedAccount}${processedKeywords}${processedHashtags}`,
    );
    toast.current?.show({
      severity: "success",
      summary: "Great!",
      detail: "Copied to clipboard",
      life: 3000,
    });
    saveUserSession({
      accounts: accounts,
      category: category,
      type: type as "multiple" | "boolean" | "",
      keywords: keywords,
      hastaghs: hashtags,
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
          {accounts && <div id="accounts">{`${processAccounts()}\n\n`}</div>}
          {keywords && <div id="keywords">{`${keywords}\n\n`}</div>}
          {hashtags && <div id="hashtags">{processHashtags()}</div>}
        </div>
      </Card>
    </>
  );
};

export default ResultCard;

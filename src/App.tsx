import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./components/Loading/Loading";
import ResultCard from "./components/ResultCard/ResutCard";
import SEO from "./components/SEO/SEO";
import TextInput from "./components/TextInput/TextInput";
import useApi from "./hooks/useApi";
import useLocalStorage from "./hooks/useLocalStorage";

interface Category {
  id: string;
  name: string;
}

function App() {
  const { fetchCategories, fetchNewQuestion, isLoading } = useApi();
  const { userSession, retrieveUserSession } = useLocalStorage();
  const [hashtags, setHashtags] = useState("");
  const [keywords, setKeyWords] = useState("");
  const [accounts, setAccounts] = useState("");
  const [postMessage, setPostMessage] = useState("");
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const types = [
    { name: "All types", id: "" },
    { name: "True / False", id: "boolean" },
    { name: "Multiple choice", id: "multiple" },
  ];
  const [selectedType, setSelectedType] = useState("");

  const decodeHtml = (htmlText: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = htmlText;
    return txt.value;
  };

  const getRandomTriviaQuestion = async () => {
    const newQuestion = await fetchNewQuestion({
      category: selectedCategory,
      type: selectedType as "multiple" | "boolean",
    });
    if (newQuestion && newQuestion.length > 0) {
      setPostMessage(decodeHtml(newQuestion[0].question));
    }
  };

  const importCategories = async () => {
    if (categories.length !== 0) return;
    const apiCategories = await fetchCategories();
    if (apiCategories) {
      setCategories(apiCategories);
    }
  };

  useEffect(() => {
    setSelectedType(userSession?.type || "");
    setSelectedCategory(userSession?.category || "");
    setAccounts(userSession?.accounts || "");
    setKeyWords(userSession?.keywords || "");
    setHashtags(userSession?.hastaghs || "");
  }, [userSession]);

  useEffect(() => {
    importCategories();
    retrieveUserSession();
  }, []);

  return (
    <div className={`App ${isLoading && "loading"}`}>
      <SEO />
      <header className="App-header">
        <h1>Help me trend c:</h1>
        <p>
          This utility helps you with trending parties, when you don't know what
          to tweet anymore
        </p>
      </header>
      <h2>Trivia options </h2>
      <div className="form">
        <Dropdown
          disabled={isLoading}
          placeholder="Select a type of question"
          className="category-selector"
          value={selectedType}
          options={types}
          optionLabel="name"
          optionValue="id"
          onChange={(e) => setSelectedType(e.target.value)}
        ></Dropdown>
        {categories && categories.length > 0 && (
          <Dropdown
            disabled={isLoading}
            placeholder="Select a category for the questions"
            className="category-selector"
            value={selectedCategory}
            options={categories}
            optionLabel="name"
            optionValue="id"
            onChange={(e) => setSelectedCategory(e.target.value)}
          ></Dropdown>
        )}
      </div>
      <h2>Post info</h2>
      <div className="form">
        <TextInput
          label="Post message"
          placeholder="Post message ex: Write your own post or generate a random message"
          ariaLabel="Post message"
          disabled={isLoading}
          rows={5}
          value={postMessage}
          utilityButton={
            <Button
              icon="pi pi-refresh"
              severity="info"
              className="utility-icon"
              text
              onClick={getRandomTriviaQuestion}
              disabled={isLoading}
            >
              Generate post
            </Button>
          }
          onChange={(event) => setPostMessage(event.target.value)}
        />
        <TextInput
          placeholder="Accounts ex:&#10;srchafreen&#10;AngelssBecky"
          label="Accounts"
          ariaLabel="Accounts for trend"
          disabled={isLoading}
          value={accounts}
          rows={3}
          onChange={(event) => setAccounts(event.target.value)}
        />
        <TextInput
          placeholder="Keywords ex: TLP HAIRPIN OF LOVE"
          label="Keywords"
          ariaLabel="Keywords for trend"
          disabled={isLoading}
          value={keywords}
          rows={1}
          onChange={(event) => setKeyWords(event.target.value)}
        />
        <TextInput
          label="Hashtags"
          placeholder="Hashtags ex:&#10;FreenBecky&#10;srchafreen&#10;Beckysangels"
          ariaLabel="Hashtags of the trend"
          value={hashtags}
          disabled={isLoading}
          rows={5}
          onChange={(event) => setHashtags(event.target.value)}
        />
        <h2>Result</h2>
        <ResultCard
          title=""
          postMessage={postMessage}
          hashtags={hashtags}
          accounts={accounts}
          keywords={keywords}
          category={selectedCategory}
          type={selectedType}
        />
      </div>
      {isLoading && <Loading />}
      <footer className="App-footer">
        <p>
          Trivia questions provided by{" "}
          <a
            href="https://opentdb.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            OpenTDB
          </a>
          . Data licensed under
          <a
            rel="noopener noreferrer"
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
          >
            Creative Commons Attribution-ShareAlike 4.0 International License
          </a>
          .
        </p>
        <p>
          You can find me on X{" "}
          <a
            href="https://x.com/luvablu"
            rel="noopener noreferrer"
            target="_blank"
          >
            @luvablu
          </a>
        </p>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Help me trend. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;

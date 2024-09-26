import axios from "axios";
import { useState } from "react";

export interface TriviaApiQuery {
  category?: string;
  type?: "multiple" | "boolean";
}

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = axios.create({
    baseURL: "https://opentdb.com/",
  });

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const categories = await axiosInstance.get("api_category.php");
      return categories.data.trivia_categories;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNewQuestion = async (query?: TriviaApiQuery) => {
    setIsLoading(true);
    const categoryQuery = query?.category ? `&category=${query.category}` : "";
    const typeQuery = query?.type ? `&type=${query.type}` : "";
    try {
      const questions = await axiosInstance.get(
        `api.php?amount=1${categoryQuery}${typeQuery}`,
      );
      return questions.data.results;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchCategories,
    fetchNewQuestion,
    isLoading,
  };
};

export default useApi;

import { useState, useEffect } from "react";
import { apiClient } from "../api/apiClient";
import { saveArticles, getArticles } from "../db/indexedDB";

const useNews = (category = "general") => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await apiClient.get("/top-headlines", {
          params: { country: "us", category },
        });

        const articles = response.data.articles.map((article, index) => ({
          ...article,
        }));

        await saveArticles(articles);
        setNews(articles);
      } catch (err) {
        console.error("Fetching news failed, loading from IndexedDB", err);
        setError("Failed to fetch news, showing cached data.");
        const cachedArticles = await getArticles();
        setNews(cachedArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return { news, loading, error };
};

export default useNews;

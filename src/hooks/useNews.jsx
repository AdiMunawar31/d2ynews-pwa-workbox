import { useState, useEffect } from "react";
import { apiClient } from "../api/apiClient";
import { saveArticles, getArticles, clearArticles } from "../db/indexedDB";

const useNews = (category = "general") => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      // try {
      //   const response = await apiClient.get("/top-headlines", {
      //     params: { country: "us", category },
      //   });

      //   const articles = response.data.articles.map((article, index) => ({
      //     ...article,
      //   }));

      //   await saveArticles(articles);
      //   setNews(articles);
      // } catch (err) {
      //   console.error("Fetching news failed, loading from IndexedDB", err);
      //   setError("Failed to fetch news, showing cached data.");
      //   const cachedArticles = await getArticles();
      //   setNews(cachedArticles);
      // } finally {
      //   setLoading(false);
      // }
      try {
        if (!navigator.onLine) {
          // Jika offline, ambil dari IndexedDB
          const offlineMovies = await getArticles();
          setNews(offlineMovies);
          console.log("Menampilkan data dari IndexedDB (Offline Mode)");
        } else {
          // Jika online, fetch dari API
          const response = await apiClient.get("/top-headlines", {
            params: { country: "us", category },
          });
          setNews(response.data.results);

          // Simpan ke IndexedDB untuk penggunaan offline
          await clearArticles();
          saveArticles(response.data.results);

          console.log("Data diupdate dari API");
        }
      } catch (err) {
        setError("Gagal memuat data.");
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return { news, loading, error };
};

export default useNews;

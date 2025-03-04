import Dexie from "dexie";

const db = new Dexie("newsDB");

// Versi database ditingkatkan agar bisa update skema tanpa error
db.version(2).stores({
  articles:
    "id, source, author, title, description, url, urlToImage, publishedAt, content",
  detail:
    "id, source, author, title, description, url, urlToImage, publishedAt, content",
    bookmarks: "url, title, source, publishedAt, description, urlToImage",
});

// Fungsi untuk menyimpan daftar berita
export const saveArticles = async (articles) => {
  try {
    await db.articles.clear();
    const formattedArticles = articles.map((article, index) => ({
      id: index + 1,
      source: article.source?.name || "Unknown",
      author: article.author || "Unknown",
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage || "/placeholder.jpg",
      publishedAt: article.publishedAt,
      content: article.content,
    }));
    await db.articles.bulkPut(formattedArticles);
  } catch (error) {
    console.error("Error saving articles to IndexedDB:", error);
  }
};

// Fungsi untuk mendapatkan daftar berita
export const getArticles = async () => {
  try {
    return await db.articles.toArray();
  } catch (error) {
    console.error("Error fetching articles from IndexedDB:", error);
    return [];
  }
};

// Fungsi untuk menyimpan detail berita
export const saveArticleDetail = async (article) => {
  try {
    await db.detail.put({
      id: article.url, // Menggunakan URL sebagai primary key
      source: article.source?.name || "Unknown",
      author: article.author || "Unknown",
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage || "/placeholder.jpg",
      publishedAt: article.publishedAt,
      content: article.content,
    });
  } catch (error) {
    console.error("Error saving article detail to IndexedDB:", error);
  }
};

// Fungsi untuk mendapatkan detail berita berdasarkan URL
export const getArticleDetail = async (url) => {
  try {
    return await db.detail.where("url").equals(url).first();
  } catch (error) {
    console.error("Error fetching article detail from IndexedDB:", error);
    return null;
  }
};

export const addBookmark = async (article) => {
  try {
    await db.bookmarks.put(article);
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
};

export const removeBookmark = async (url) => {
  try {
    await db.bookmarks.delete(url);
  } catch (error) {
    console.error("Error removing bookmark:", error);
  }
};

export const getBookmarks = async () => {
  return await db.bookmarks.toArray();
};

export const isBookmarked = async (url) => {
  const item = await db.bookmarks.get(url);
  return !!item;
};

export default db;
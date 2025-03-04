import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../api/apiClient";
import { getArticleDetail, saveArticleDetail } from "../db/indexedDB";

const Detail = () => {
  const { url } = useParams();
  console.log("url : ", url);

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailFromDB = async () => {
      try {
        const storedArticle = await getArticleDetail(url);
        console.log("storedArticle : ", storedArticle);

        if (storedArticle) {
          setArticle(storedArticle);
        }
      } catch (error) {
        console.error("Error fetching article detail from IndexedDB:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailFromDB();
  }, [url]);

  if (loading) {
    return (
      <Container className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Container>
    );
  }

  if (!article) {
    return (
      <Container className="text-center min-h-screen flex justify-center items-center">
        <Typography variant="h6">Article not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="mt-24 min-h-screen">
      <Card className="shadow-lg rounded-xl">
        <CardMedia
          component="img"
          image={article.urlToImage || "/placeholder.jpg"}
          alt={article.title}
          className="h-64 object-cover"
        />
        <CardContent>
          {/* Source & Author */}
          <Typography variant="subtitle2" className="text-gray-500">
            {article.source?.name || "Unknown"} | {article.author || "Unknown"}{" "}
            | {new Date(article.publishedAt).toLocaleDateString()}
          </Typography>

          {/* Title */}
          <Typography variant="h4" className="font-bold pt-2 pb-4">
            {article.title}
          </Typography>

          {/* Content */}
          <Typography variant="body2" className="mt-4 text-gray-600">
            {article.content}
          </Typography>

          {/* Link to Full Article */}
          <Box className="mt-4">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Read Full Article
            </a>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Detail;

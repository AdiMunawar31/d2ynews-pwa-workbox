import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  addBookmark,
  isBookmarked,
  removeBookmark,
  saveArticleDetail,
} from "../db/indexedDB";

const NewsCard = (article) => {
  const [openSnackbarAdded, setOpenSnackbarAdded] = useState(false);
  const [openSnackbarRemove, setOpenSnackbarRemove] = useState(false);
  // console.log("article : ", article);

  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const checkBookmark = async () => {
      const bookmarked = await isBookmarked(article.url);
      setSaved(bookmarked);
    };
    checkBookmark();
  }, [article.url]);

  const handleSave = async () => {
    if (saved) {
      await removeBookmark(article.url);
      setOpenSnackbarRemove(true);
    } else {
      await addBookmark(article);
      setOpenSnackbarAdded(true);
    }
    setSaved(!saved);
  };

  useEffect(() => {
    saveArticleDetail(article);
  }, [article]);

  return (
    <>
      <Card className="rounded-xl shadow-lg hover:shadow-2xl transition-all flex flex-col h-full">
        {/* Gambar dengan tinggi tetap */}
        <CardMedia
          component="img"
          image={article.urlToImage || "/placeholder.png"}
          alt={article.title}
          className="h-48 object-cover"
          onError={(e) => (e.target.src = "/placeholder.png")}
        />

        <CardContent className="flex flex-col flex-grow min-h-[180px]">
          <Typography variant="caption" className="text-gray-500">
            {article.source?.name || "Unknown"} -{" "}
            {new Date(article.publishedAt).toLocaleDateString()}
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            className="overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {article.title}
          </Typography>

          <Typography
            variant="body2"
            className="text-gray-600 mt-2 line-clamp-3 min-h-[60px]"
          >
            {article.description}
          </Typography>
        </CardContent>

        <Box className="flex justify-between items-center p-4">
          <Button
            onClick={() =>
              navigate(`/detail/${encodeURIComponent(article.url)}`)
            }
            variant="contained"
            color="primary"
            className="hover:bg-blue-600 transition-all flex-1"
          >
            Read More
          </Button>
          <IconButton onClick={handleSave}>
            {saved ? (
              <Bookmark className="text-blue-500" />
            ) : (
              <BookmarkBorder className="text-gray-500" />
            )}
          </IconButton>
        </Box>
      </Card>

      <Snackbar
        open={openSnackbarAdded}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbarAdded(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setOpenSnackbarAdded(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          News Added to Bookmark!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openSnackbarRemove}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbarRemove(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setOpenSnackbarRemove(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          News removed from Bookmark!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default NewsCard;

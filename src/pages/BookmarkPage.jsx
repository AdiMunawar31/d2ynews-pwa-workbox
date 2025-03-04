import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { getBookmarks, removeBookmark } from "../db/indexedDB";
import { Bookmark } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";

const BookmarkPage = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");

  useEffect(() => {
    const fetchBookmarks = async () => {
      const articles = await getBookmarks();
      setBookmarkedArticles(articles);
    };
    fetchBookmarks();
  }, []);

  const handleOpenDialog = (url) => {
    setSelectedUrl(url);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUrl("");
  };

  const handleRemoveBookmark = async () => {
    await removeBookmark(selectedUrl);
    setBookmarkedArticles((prev) =>
      prev.filter((article) => article.url !== selectedUrl)
    );
    setOpenDialog(false);
    setOpenSnackbar(true);
  };

  return (
    <Container className="py-8 mt-20 min-h-screen">
      <Typography variant="h4" className="font-bold text-center pb-6">
        Bookmarked News
      </Typography>
      {bookmarkedArticles.length === 0 ? (
        <Typography variant="h6" className="text-center text-gray-500">
          No bookmarked articles yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {bookmarkedArticles.map((article) => (
            <Grid key={article.url} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card className="rounded-xl shadow-lg hover:shadow-2xl transition-all flex flex-col h-full">
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
                  <IconButton onClick={() => handleOpenDialog(article.url)}>
                    <Bookmark className="text-blue-500" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Snackbar untuk notifikasi sukses */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Bookmark removed successfully!
        </MuiAlert>
      </Snackbar>

      {/* Dialog Konfirmasi Hapus */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Remove Bookmark</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this article from bookmarks?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRemoveBookmark} color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookmarkPage;

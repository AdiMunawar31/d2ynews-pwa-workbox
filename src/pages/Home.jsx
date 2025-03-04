import {
  Container,
  // Grid,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import NewsCard from "../components/NewsCard";
import useNews from "../hooks/useNews";
import useOnlineStatus from "../hooks/useOnlineStatus";

const Home = () => {
  const { news, loading, error } = useNews("technology");
  // console.log("news : ", news);

  const isOnline = useOnlineStatus();

  return (
    <Container maxWidth="lg" className="py-6 mt-20">
      {!isOnline && (
        <Alert severity="warning" className="mb-4 text-center">
          You are offline. Showing cached news.
        </Alert>
      )}
      <Typography variant="h4" className="font-bold py-4">
        Technology News
      </Typography>

      {loading ? (
        <div className="flex justify-center h-screen mt-60">
          <CircularProgress />
        </div>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {news.map((article) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.url}>
              <NewsCard {...article} key={article.url} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;

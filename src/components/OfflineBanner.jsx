import { Alert, Snackbar } from "@mui/material";
import useOnlineStatus from "../hooks/useOnlineStatus";

const OfflineBanner = () => {
  const isOnline = useOnlineStatus();

  return (
    <Snackbar
      open={!isOnline}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="warning" variant="filled">
        You are offline! Some features may not work properly.
      </Alert>
    </Snackbar>
  );
};

export default OfflineBanner;

import { BrowserRouter as Routers } from "react-router-dom";
import Router from "./router";
import Layout from "./pages/Layout";

function App() {
  return (
    <>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <Routers>
        <Layout>
          <Router />
        </Layout>
      </Routers>
    </>
  );
}

export default App;

import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Loading from "./components/Loading";
import Error from "./components/Error";

import { getNews } from "./services/getNews";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTechNews = async () => {
      setLoading(true);
      const res = await getNews({
        searchQuery: "microsoft",
      });

      if (!res) {
        setLoading(false);
        setError(true);

        return;
      }

      setLoading(false);
      setArticles([res.articles]);
    };
    fetchTechNews();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        {loading && <Loading />}
        {error && <Error />}
        {!loading && articles.length > 0 && <h1>Hello, articles</h1>}
      </Container>
    </>
  );
}

export default App;

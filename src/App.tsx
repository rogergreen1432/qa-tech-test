import { useEffect, useState } from "react";
import "./App.css";
import Spinner from "./components/spinner/Spinner";
import { selectUser } from "./reducers/users";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "./strings/api-consts";
import Header from "./components/header/Header";
import { Flex, Grid } from "@radix-ui/themes";
import SideBar from "./components/sidebar/SideBar";
import { useSelector } from "react-redux";
import PublishedArticlesWrapper from "./components/published-articles/PublishedArticlesWrapper";
import InProgressArticlesWrapper from "./components/in-progress-articles/InProgressArticlesWrapper";
import AddArticleModal from "./components/add-article-modal/AddArticleModal";

function App() {
  const navigate = useNavigate();
  const { currentPage } = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [inProgressArticleId, setInProgressArticleId] = useState<
    number | undefined
  >(undefined);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const type = query.get("type");
  const id = query.get("id");

  useEffect(() => {
    checkSessionAndFetch();
  }, []);

  const checkSessionAndFetch = async () => {
    await fetchUserSession();

    if (id && type === "progress") {
      setInProgressArticleId(parseInt(id));
      setShowAddArticleModal(true);
    }
  };

  const fetchUserSession = async () => {
    const user = localStorage.getItem("user") as string;

    if (user) {
      setLoading(false);
    } else {
      navigate(LOGIN_ROUTE);
    }
  };

  const switchMainScreen = () => {
    switch (currentPage) {
      case "PUBLISHED":
        return <PublishedArticlesWrapper />;
      case "IN_PROGRESS":
        return (
          <InProgressArticlesWrapper
            setShowAddArticleModal={setShowAddArticleModal}
            setInProgressArticleId={setInProgressArticleId}
          />
        );
      default:
        return <PublishedArticlesWrapper />;
    }
  };

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      )}
      {!loading && (
        <div className="light flex">
          <Header
            openAddArticleModal={setShowAddArticleModal}
            setInProgressArticleId={setInProgressArticleId}
          />
          <Grid columns="2" gap="3" className="mt-[74px]">
            <Flex direction="column">
              <SideBar />
            </Flex>

            {/* MAIN SCREEN */}
            <Flex direction="column">{currentPage && switchMainScreen()}</Flex>
          </Grid>
        </div>
      )}
      {showAddArticleModal && (
        <AddArticleModal
          setShowModal={setShowAddArticleModal}
          inProgressArticleId={inProgressArticleId}
        />
      )}
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useAppDispatch } from "../../reducers/store";
import { getArticles, selectNews } from "../../reducers/news";
import DataGrid from "../data-grid/DataGrid";
import { publishedArticlesColumns } from "./PublishedArticlesColumns";
import { useSelector } from "react-redux";
import { Article } from "../../types/NewsTypes";
import Popout from "../popout/Popout";
import checkIcon from "../../assets/check_circle.svg";

function PublishedArticlesWrapper() {
  const di = useAppDispatch();
  const [dataLoading, setDataLoading] = useState(true);
  const [showPopout, setShowPopout] = useState<boolean>(false);
  const [popoutData, setPopoutData] = useState<Article | null>(null);
  const { articles } = useSelector(selectNews);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setDataLoading(true);
    await di(getArticles());
    setDataLoading(false);
  };

  return (
    <>
      {articles && articles.length === 0 && (
        <div className="h-[calc(100%_-_74px)] flex items-center justify-center ml-auto">
          <div className="block">
            <div className="flex items-center justify-center">
              <img
                src={checkIcon}
                alt="No open alerts found"
                className="h-12 w-12"
              />
            </div>
            <p className="text-center font-bold">No Published Articles</p>
            <p className="text-center text-sm">
              You can add a new article using the button above
            </p>
          </div>
        </div>
      )}
      {articles && articles.length > 0 && (
        <div className="absolute top-18 left-52 rounded-tl-lg border-t border-l w-[calc(100%_-_208px)] h-[calc(100%_-_74px)] bg-[#F2F2F5]">
          <div className="grid grid-cols-4 h-full overflow-scroll">
            <div className="col-span-4 p-4">
              <DataGrid
                columns={publishedArticlesColumns(setShowPopout, setPopoutData)}
                data={articles}
                loading={dataLoading}
              />
            </div>
          </div>
        </div>
      )}
      {showPopout && (
        <Popout
          setShowPopout={setShowPopout}
          contentScreen="PUBLISHED_ARTICLE"
          popoutData={popoutData}
        />
      )}
    </>
  );
}

export default PublishedArticlesWrapper;

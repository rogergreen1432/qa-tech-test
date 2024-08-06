import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import checkIcon from "../../assets/check_circle.svg";
import { useAppDispatch } from "../../reducers/store";
import { getInProgressArticles, selectNews } from "../../reducers/news";
import { useSelector } from "react-redux";
import DataGrid from "../data-grid/DataGrid";
import { inProgressArticlesColumns } from "./InProgressArticlesColumns";

interface IInProgressArticlesWrapperProps {
  setShowAddArticleModal: (show: boolean) => void;
  setInProgressArticleId: (id: number | undefined) => void;
}

function InProgressArticlesWrapper(props: IInProgressArticlesWrapperProps) {
  const { setShowAddArticleModal, setInProgressArticleId } = props;
  const di = useAppDispatch();
  const navigate = useNavigate();
  const { inProgressArticles } = useSelector(selectNews);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user") as string;
    if (!user || user === "") {
      navigate("/login");
    }
    fetchInProgressArticles();
  }, []);

  const fetchInProgressArticles = async () => {
    setDataLoading(true);
    await di(getInProgressArticles());
    setDataLoading(false);
  };

  return (
    <div className="absolute top-18 left-52 rounded-tl-lg border-t border-l w-[calc(100%_-_208px)] h-[calc(100%_-_74px)] bg-[#F2F2F5]">
      {inProgressArticles && inProgressArticles.length === 0 && (
        <div className="h-[calc(100%_-_74px)] flex items-center justify-center ml-auto">
          <div className="block">
            <div className="flex items-center justify-center">
              <img
                src={checkIcon}
                alt="No open alerts found"
                className="h-12 w-12"
              />
            </div>
            <p className="text-center font-bold">No Articles In Progress</p>
            <p className="text-center text-sm">
              You can add a new article using the button above
            </p>
          </div>
        </div>
      )}
      {inProgressArticles && inProgressArticles.length > 0 && (
        <div className="grid grid-cols-4 h-full overflow-scroll">
          <div className="col-span-4 p-4">
            <DataGrid
              columns={inProgressArticlesColumns(
                setShowAddArticleModal,
                setInProgressArticleId
              )}
              data={inProgressArticles}
              loading={dataLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default InProgressArticlesWrapper;

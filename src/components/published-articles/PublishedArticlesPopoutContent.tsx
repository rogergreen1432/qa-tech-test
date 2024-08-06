import { convertTimestampToDate } from "../../utils/dates";
import { Article } from "../../types/NewsTypes";
import { Button } from "@radix-ui/themes";

interface IPublishedArticlesPopoutContentProps {
  popoutData: Article;
  setShowPopout: (show: boolean) => void;
}

export const PublishedArticlesPopoutContent = (
  props: IPublishedArticlesPopoutContentProps
) => {
  const { popoutData, setShowPopout } = props;

  return (
    <>
      {/* Name */}
      <div className="w-full">
        <div className="w-full max-h-28 border-b flex px-8">
          <div className="w-full max-h-28">
            <div className="text-black text-opacity-50 text-xs font-semibold mt-2 flex justify-between">
              <div>{popoutData.origin}</div>
              <div>
                {convertTimestampToDate(popoutData.timestamp, true)}
              </div>
            </div>
            <p className="mt-3 font-semibold text-black text-lg mb-4">
              {popoutData.title}
            </p>
          </div>
        </div>
        {/* Body */}
        <div className="w-full flex px-8 mt-4">{popoutData.body}</div>
        <div className="h-20 flex px-8 justify-between mt-4">
          <div>
            <a href={popoutData.links[0].url} target="_blank" rel="noreferrer">
              <Button className="px-4 h-10 bg-PurpleBlue-10 my-5 cursor-pointer">
                {popoutData.links[0].title}
              </Button>
            </a>
          </div>
          <Button
            className="w-[125px] h-10 border-1 border-PurpleBlue-10 bg-white text-PurpleBlue-10 my-5 cursor-pointer"
            onClick={() => setShowPopout(false)}
            variant="outline"
          >
            Close
          </Button>
        </div>
      </div>
    </>
  );
};

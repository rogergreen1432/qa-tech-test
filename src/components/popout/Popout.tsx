import { PublishedArticlesPopoutContent } from "../published-articles/PublishedArticlesPopoutContent";
import "./styles.css";

interface IPopoutProps {
  setShowPopout: (show: boolean) => void;
  popoutData: any;
  contentScreen: string;
}

const Popout = (props: IPopoutProps) => {
  const { setShowPopout, contentScreen, popoutData } = props;

  const determineContent = () => {
    if (popoutData) {
      switch (contentScreen) {
        case "PUBLISHED_ARTICLE":
          return (
            <PublishedArticlesPopoutContent
              setShowPopout={setShowPopout}
              popoutData={popoutData}
            />
          );
        default:
          return null;
      }
    } else {
      return null;
    }
  };

  return (
    <div
      className={`h-[calc(100vh_-_74px)] w-1/3 absolute right-0 bg-white top-[74px] font-['Open Sans'] z-50 border-t border-l shadow-2xl overflow-y-auto`}
    >
      {determineContent()}
    </div>
  );
};

export default Popout;

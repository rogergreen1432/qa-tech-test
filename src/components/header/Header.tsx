import { Button, Grid } from "@radix-ui/themes";
import Logo from "../../assets/Logo.png";
import { PlusIcon } from "@radix-ui/react-icons";

interface IHeaderProps {
  openAddArticleModal: (show: boolean) => void;
  setInProgressArticleId: (id: number | undefined) => void;
}

const Header = (props: IHeaderProps) => {
  const { openAddArticleModal, setInProgressArticleId } = props;
  return (
    <div className="w-full absolute top-0 h-[74px]">
      <Grid columns="2" gap="3" width="100%" align="start">
        {/* Logo */}
        <div className="h-[26px] flex items-center mt-6 ml-6">
          <img src={Logo} width="160" />
          <p className="text-[#B9BBC6] text-xl mt-2">News Room</p>
        </div>
        <div className="flex justify-end items-center mr-6">
          <div className="mt-4">
            User:
            <span className="text-[#FFA500] ml-2">
              {localStorage.getItem("user") as string}
            </span>
          </div>
          <Button
            className="w-[140px] h-[36px] bg-PurpleBlue-10 mt-[19px] ml-4 p-2.5 text-white cursor-pointer ml-auto"
            value="Add"
            onClick={() => {
              setInProgressArticleId(undefined);
              openAddArticleModal(true);
            }}
          >
            <PlusIcon />
            New Article
          </Button>
        </div>
      </Grid>
    </div>
  );
};

export default Header;

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import { useAppDispatch } from "../../reducers/store";
import {
  deleteInProgressArticle,
  getInProgressArticleByID,
  getInProgressArticles,
  postInProgressArticle,
  postPublishArticle,
} from "../../reducers/news";
import { ArticleInProgress } from "../../types/NewsTypes";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'

interface IAddArticleModalProps {
  setShowModal: (show: boolean) => void;
  inProgressArticleId: number | undefined;
}

type AddArticleInputs = {
  title: string;
  origin: string;
  body: string;
  linkTitle: string;
  linkUrl: string;
};

const platformOptions = [
  { value: "BOTH", label: "Both" },
  { value: "ANDROID", label: "Android" },
  { value: "IOS", label: "iOS" },
];

const typeOptions = [
  { value: "INFORMATIONAL", label: "Informational" },
  { value: "ACTION_OPTIONAL", label: "Action Optional" },
  { value: "ACTION_REQUIRED", label: "Action Required" },
  { value: "APP_UPDATE", label: "App Update" },
];

const linkTypeOptions = [
  { value: "External", label: "External" },
  { value: "Settings", label: "Settings" },
  { value: "Source", label: "Source" },
  { value: "Guide", label: "Guide" },
];

export const publishArticleSchema = yup.object().shape({
  title: yup.string().required('Title is required before you save'),
  origin: yup.string(),
  body: yup.string(),
  linkTitle: yup.string(),
  linkUrl: yup.string(),
})

const AddArticleModal = (props: IAddArticleModalProps) => {
  const { setShowModal, inProgressArticleId } = props;
  const di = useAppDispatch();
  const user = localStorage.getItem("user") as string;
  const [platform, setPlatform] = useState<{ value: string; label: string }>({
    value: "BOTH",
    label: "Both",
  });
  const [type, setType] = useState<{ value: string; label: string }>({
    value: "INFORMATIONAL",
    label: "Informational",
  });
  const [linkType, setLinkType] = useState<{ value: string; label: string }>({
    value: "External",
    label: "External",
  });
  const [articleApproved, setArticleApproved] = useState(false);
  const [showApproveButton, setShowApproveButton] = useState(false);
  const [fetchedArticle, setFetchedArticle] = useState<
    ArticleInProgress | undefined
  >(undefined);

  useEffect(() => {
    if (inProgressArticleId) {
      fetchInProgressArticleById();
    }
  }, []);

  const fetchInProgressArticleById = async () => {
    const article = await di(getInProgressArticleByID(inProgressArticleId!!));
    setFetchedArticle(article);
    setArticleApproved((article && article.approvedBy) !== "");
    if (article) {
      const { title, origin, body, link } = article;
      let linkTitle,
        linkUrl,
        linkType: string = "";
      if (link !== "") {
        const parsedLink = JSON.parse(link);
        linkTitle = parsedLink.title;
        linkUrl = parsedLink.url;
        linkType = parsedLink.type;
      }
      setValue("title", title);
      setValue("origin", origin);
      setValue("body", body);
      setValue("linkTitle", linkTitle);
      setValue("linkUrl", linkUrl);
      setPlatform(
        platformOptions.find((option) => option.value === article.platform) || {
          value: "",
          label: "",
        }
      );
      setType(
        typeOptions.find((option) => option.value === article.type) || {
          value: "",
          label: "",
        }
      );
      setLinkType(
        linkTypeOptions.find((option) => option.value === linkType) || {
          value: "",
          label: "",
        }
      );      
      setShowApproveButton(true);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AddArticleInputs>({
    resolver: yupResolver(publishArticleSchema) as Resolver<AddArticleInputs>,
  });

  const onSubmit: SubmitHandler<AddArticleInputs> = async (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );
    const link = JSON.stringify({
      title: data.linkTitle,
      url: data.linkUrl,
      type: linkType.value,
    });
    const body = {
      ...filteredData,
      platform: platform.value,
      type: type.value,
      link: link,
      createdBy: fetchedArticle
        ? fetchedArticle.createdBy
        : user,
      ...(inProgressArticleId !== undefined && { id: inProgressArticleId }),
    };
    const updated = await di(postInProgressArticle(body));
    if (updated) {
      toast.success("Successfully saved your in progress article", {
        duration: 6000,
      });
      await di(getInProgressArticles());
      setShowModal(false);
    }
  };

  const approveArticleAndPublish = async () => {
    const title = watch("title");
    const origin = watch("origin");
    const formBody = watch("body");
    const linkTitle = watch("linkTitle");
    const linkUrl = watch("linkUrl");
    const body = {
      article: {
        title: title,
        origin: origin,
        body: formBody,
        timestamp: new Date().toISOString(),
        links: [
          {
            title: linkTitle,
            url: linkUrl,
            type: linkType.value,
          },
        ],
        type: type.value,
      },
      platform: platform.value,
    };

    const updated = await di(postPublishArticle(body));
    if (updated && updated.error === undefined) {
      toast.success("The article has been published", {
        duration: 6000,
      });
      await di(deleteInProgressArticle(fetchedArticle?.id!!));
      await di(getInProgressArticles());
    } else {
      toast.error("Failed to publish the article", {
        duration: 6000,
      });
    }
    setShowModal(false);
  };

  return (
    <div
      className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="fixed top-1/2 left-1/2 h-[80%] w-3/4 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <div className="block">
            <h2 className="text-xl font-bold mb-2">Add a New Article</h2>
            <p className="mb-4">Use the form below to add a new article</p>
          </div>
          {articleApproved && (
            <Callout.Root color="green" className="h-[36px] p-2 mt-3">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text className="truncate">
                Your article is ready to be published as it's been approved.
              </Callout.Text>
            </Callout.Root>
          )}
          {!articleApproved && (
            <Callout.Root color="red" className="h-[36px] p-2 mt-3">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text className="truncate">
                You can not publish this article until it has been approved.
              </Callout.Text>
            </Callout.Root>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-12">
          <div className="flex grid grid-cols-2 gap-4">
            <div>
              <label className="text-black w-full">Title</label>
              <input
                type="text"
                placeholder="title"
                {...register("title", { required: true })}
                className="w-full p-2 border border-lightGrey rounded focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
              />
              {errors.title && (
                <p className="text-[#B91C1C]">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label className="text-black w-full">Origin</label>
              <input
                type="text"
                placeholder="origin"
                {...register("origin")}
                className="w-full p-2 border border-lightGrey rounded focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
              />
              {errors.origin && (
                <p className="text-[#B91C1C]">{errors.origin.message}</p>
              )}
            </div>
          </div>
          <div className="mt-2">
            <label className="text-black w-full">Body</label>
            <textarea
              rows={6}
              placeholder="body"
              {...register("body")}
              className="w-full p-2 border border-lightGrey rounded focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
            />
            {errors.body && (
              <p className="text-[#B91C1C]">{errors.body.message}</p>
            )}
          </div>
          <div className="flex grid grid-cols-2 gap-4 mt-1">
            <div>
              <label className="text-black w-full">Platform</label>
              <Select
                defaultValue={platformOptions.find(
                  (platformOptions) => platformOptions.value === "BOTH"
                )}
                value={platform}
                options={platformOptions}
                className={"w-full h-[38px] mr-4 z-50"}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                onChange={(e) => setPlatform(e!!)}
              />
            </div>
            <div>
              <label className="text-black w-full">News Type</label>
              <Select
                defaultValue={typeOptions.find(
                  (typeOptions) => typeOptions.value === "INFORMATIONAL"
                )}
                value={type}
                options={typeOptions}
                className={"w-full h-[38px] mr-4 z-50"}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                onChange={(e) => setType(e!!)}
              />
            </div>
          </div>
          <p className="font-semibold mt-6 text-lg">Add Link</p>
          <div className="flex grid grid-cols-3 gap-4">
            <div>
              <label className="text-black w-full">Link Title</label>
              <input
                type="text"
                placeholder="link title"
                {...register("linkTitle")}
                className="w-full p-2 border border-lightGrey rounded focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
              />
              {errors.linkTitle && (
                <p className="text-[#B91C1C]">{errors.linkTitle.message}</p>
              )}
            </div>
            <div>
              <label className="text-black w-full">URL</label>
              <input
                type="text"
                placeholder="link url"
                {...register("linkUrl")}
                className="w-full p-2 border border-lightGrey rounded focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
              />
              {errors.linkUrl && (
                <p className="text-[#B91C1C]">{errors.linkUrl.message}</p>
              )}
            </div>
            <div>
              <label className="text-black w-full">Link Type</label>
              <Select
                defaultValue={linkTypeOptions.find(
                  (linkTypeOptions) => linkTypeOptions.value === "External"
                )}
                value={linkType}
                options={linkTypeOptions}
                className={"w-full h-[38px] mr-4 z-50"}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                onChange={(e) => setLinkType(e!!)}
              />
            </div>
          </div>
          {showApproveButton && (
            <Button
              color="green"
              className="mt-6 mr-3 cursor-pointer"
              variant="outline"
              onClick={(event) => {
                event.preventDefault();
                approveArticleAndPublish();
              }}
            >
              Approve and Publish
            </Button>
          )}
          <Button
            type="submit"
            className="text-PurpleBlue-10 mt-6 mr-3 cursor-pointer float-right"
            variant="outline"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddArticleModal;

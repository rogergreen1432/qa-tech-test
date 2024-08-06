import toast from "react-hot-toast";
import { Article, ArticleInProgress } from "../../types/NewsTypes";
import { setArticles, setInProgressArticles } from "./news.slice";

export const getArticles = () => async (dispatch: any) => {
  return fetch(`https://66b0ac306a693a95b539b638.mockapi.io/articles`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .then((articles: Article[]) => {
      articles.forEach((article, index) => {
        if (index === 1 || index === 4) {
          article.links = [];
        }
      });
      dispatch(setArticles(articles));
      return articles;
    })
    .catch(() => {
      dispatch(setArticles(undefined));
      return undefined;
    });
};

export const getInProgressArticleByID = (id: number) => async () => {
  return fetch(`https://66b0ac306a693a95b539b638.mockapi.io/in-progress/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .then((article: ArticleInProgress) => {
      console.log(article);
      return article;
    })
    .catch(() => {
      return undefined;
    });
};

export const getInProgressArticles = () => async (dispatch: any) => {
  return fetch(`https://66b0ac306a693a95b539b638.mockapi.io/in-progress`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .then((articles: ArticleInProgress[]) => {
      console.log(articles);
      dispatch(setInProgressArticles(articles));
      return articles;
    })
    .catch(() => {
      dispatch(setInProgressArticles(undefined));
      return undefined;
    });
};

export const postInProgressArticle = (inProgressArticle: any) => async () => {
  return fetch(`https://66b0ac306a693a95b539b638.mockapi.io/in-progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(inProgressArticle),
  })
    .then((res) => res.json())
    .then((article: any) => {
      return article;
    })
    .catch(() => {
      toast.error("Failed to save your in progress article", {
        duration: 6000,
      });
      return undefined;
    });
};

export const postPublishArticle = (inProgressArticle: any) => async () => {
  return fetch(`https://66b0ac306a693a95b539b638.mockapi.io/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(inProgressArticle),
  })
    .then((res) => res.json())
    .then((article: any) => {
      return article;
    })
    .catch(() => {
      toast.error("Failed to save your in progress article", {
        duration: 6000,
      });
      return undefined;
    });
};

export const deleteInProgressArticle = (id: number) => async () => {
  return fetch(`https://66b0ac306a693a95b539b638.mockapi.io/in-progress/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .then((deleted: any) => {
      console.log(deleted);
      return deleted;
    })
    .catch(() => {
      toast.error("Failed to save your in progress article", {
        duration: 6000,
      });
      return undefined;
    });
};

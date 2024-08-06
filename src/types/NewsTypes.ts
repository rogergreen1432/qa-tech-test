export interface Article {
  id: number;
  title: string;
  origin: string;
  body: string;
  timestamp: string;
  links: Link[];
  type: string;
  displayFilter: any;
  appType: string;
}

export interface Link {
  id: number;
  title: string;
  url: string;
  type: string;
  articleId: number;
}

export interface ArticleInProgress {
    id: number;
    title: string;
    origin: string;
    body: string;
    link: string;
    type: string;
    platform: string;
    timestamp: string;
    createdBy: string;
    approvedBy: string;
}
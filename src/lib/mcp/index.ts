import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listNewsArticles from "./tools/list-news-articles";
import getNewsArticle from "./tools/get-news-article";
import createNewsArticle from "./tools/create-news-article";
import listContactSubmissions from "./tools/list-contact-submissions";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "crisis-preparedness-hub",
  title: "crisis-preparedness-hub",
  version: "0.1.0",
  instructions:
    "Tools for Crisistance, a crisis-management service for small businesses. Read and create news articles, and review contact form submissions. Access is scoped to the signed-in user's permissions.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listNewsArticles, getNewsArticle, createNewsArticle, listContactSubmissions],
});

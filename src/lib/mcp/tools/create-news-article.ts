import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "create_news_article",
  title: "Create news article",
  description:
    "Create a Crisistance news article. Requires an admin account; articles are created as drafts unless published is true.",
  inputSchema: {
    headline: z.string().trim().min(1).describe("Article headline."),
    content: z.string().trim().min(1).describe("Article body text."),
    category: z.string().trim().min(1).describe("Article category, e.g. 'Cybersecurity'."),
    link: z.string().url().optional().describe("Optional source URL."),
    published: z.boolean().default(false).describe("Publish immediately instead of saving as a draft."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ headline, content, category, link, published }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("news_articles")
      .insert({ headline, content, category, link: link ?? null, published: published ?? false })
      .select()
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { article: data },
    };
  },
});

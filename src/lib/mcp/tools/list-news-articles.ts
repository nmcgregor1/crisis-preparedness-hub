import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_news_articles",
  title: "List news articles",
  description:
    "List crisis-management news articles from Crisistance, newest first. Optionally filter by category or published state.",
  inputSchema: {
    category: z.string().trim().min(1).optional().describe("Filter by article category."),
    published: z.boolean().optional().describe("Filter by published state. Drafts are visible to admins only."),
    limit: z.number().int().min(1).max(50).default(10).describe("Maximum number of articles to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category, published, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("news_articles")
      .select("id, headline, category, date, published, link, content")
      .order("date", { ascending: false })
      .limit(limit ?? 10);
    if (category) query = query.eq("category", category);
    if (typeof published === "boolean") query = query.eq("published", published);

    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { articles: data ?? [] },
    };
  },
});

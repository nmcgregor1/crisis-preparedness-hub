import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DiscoveredArticle {
  headline: string;
  summary: string;
  source: string;
  suggestedCategory: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, timeframe = '7', customKeywords } = await req.json();
    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

    if (!perplexityApiKey) {
      throw new Error('PERPLEXITY_API_KEY is not configured');
    }

    // Build search query based on category and custom keywords
    let searchQuery = '';
    
    if (customKeywords && customKeywords.trim()) {
      // User has custom keywords
      if (category && category !== 'All') {
        // Combine category-specific query with custom keywords
        if (category === 'Cyber Security') {
          searchQuery = `recent cybersecurity threats incidents ${customKeywords} 2025`;
        } else if (category === 'Natural Disaster') {
          searchQuery = `recent natural disasters ${customKeywords} crisis 2025`;
        } else if (category === 'Business Continuity') {
          searchQuery = `business continuity ${customKeywords} crisis management 2025`;
        }
      } else {
        // Use custom keywords with general crisis management context
        searchQuery = `crisis management ${customKeywords} news 2025`;
      }
    } else {
      // Use existing category-based logic (no custom keywords)
      if (category && category !== 'All') {
        if (category === 'Cyber Security') {
          searchQuery = 'recent cybersecurity threats incidents small business 2025';
        } else if (category === 'Natural Disaster') {
          searchQuery = 'recent natural disasters business impact crisis 2025';
        } else if (category === 'Business Continuity') {
          searchQuery = 'business continuity crisis management news 2025';
        }
      } else {
        searchQuery = 'crisis management cybersecurity natural disaster business continuity news 2025';
      }
    }

    console.log('Searching Perplexity with query:', searchQuery);

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          {
            role: 'system',
            content: `You are a crisis management news researcher. Find 5-7 recent, relevant news articles about ${searchQuery}. 
For each article, provide:
1. A clear, compelling headline (10-15 words)
2. A brief 2-3 sentence summary
3. The original source URL
4. Suggested category: one of "Cyber Security", "Natural Disaster", or "Business Continuity"

Format your response as a JSON array with this structure:
[
  {
    "headline": "...",
    "summary": "...",
    "source": "https://...",
    "suggestedCategory": "..."
  }
]

Focus on articles from the last ${timeframe} days that would be relevant to small businesses dealing with crisis management.`
          },
          {
            role: 'user',
            content: searchQuery
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 2000,
        return_citations: true,
        search_recency_filter: timeframe === '7' ? 'week' : 'month',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', response.status, errorText);
      
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a few moments.');
      }
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    console.log('Perplexity response:', content);

    // Parse the JSON array from the response
    let articles: DiscoveredArticle[] = [];
    try {
      // Try to extract JSON from markdown code blocks or plain text
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        articles = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON array found, try to parse the entire content
        articles = JSON.parse(content);
      }
    } catch (parseError) {
      console.error('Failed to parse articles from response:', parseError);
      throw new Error('Failed to parse news articles from search results');
    }

    // Validate and clean the articles
    articles = articles.filter(article => 
      article.headline && 
      article.summary && 
      article.suggestedCategory
    ).slice(0, 7); // Limit to 7 articles

    console.log(`Found ${articles.length} articles`);

    return new Response(JSON.stringify({ articles }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in discover-news-articles function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to discover news articles',
        articles: []
      }), 
      {
        status: error.message.includes('Rate limit') ? 429 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

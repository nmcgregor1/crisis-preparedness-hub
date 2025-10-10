import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NewsArticle {
  id: string;
  date: string;
  category: string;
  category_color: string;
  headline: string;
  content: string;
  link: string | null;
  published: boolean;
}

const News = () => {
  const { toast } = useToast();
  const [newsItems, setNewsItems] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPublishedArticles();
  }, []);

  const fetchPublishedArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNewsItems(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load news articles",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Crisis Management News</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Stay informed with the latest updates on crisis management, disaster preparedness, 
            and business continuity. Updated regularly with relevant news for small businesses.
          </p>
        </div>
      </section>

      {/* News Feed */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : newsItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No news articles available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {newsItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                    <Badge className={`${item.category_color} text-white border-0`}>
                      {item.category}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-semibold">{item.headline}</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {item.content}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      Read full article
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </CardContent>
              </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;

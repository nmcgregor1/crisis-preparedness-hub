import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Edit, Eye, EyeOff, Sparkles } from "lucide-react";

interface NewsArticle {
  id: string;
  date: string;
  category: string;
  category_color: string;
  headline: string;
  content: string;
  link: string | null;
  published: boolean;
  created_at: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form state
  const [topic, setTopic] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    headline: "",
    content: "",
    category: "Cyber Security",
    link: "",
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  });

  const categoryColors: Record<string, string> = {
    "Cyber Security": "bg-blue-500",
    "Natural Disaster": "bg-red-500",
    "Business Continuity": "bg-green-500"
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateArticle = async () => {
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-news-article', {
        body: { topic, category: formData.category }
      });

      if (error) throw error;

      setFormData({
        ...formData,
        headline: data.headline,
        content: data.content,
        category: data.suggestedCategory || formData.category
      });

      toast({
        title: "Success",
        description: "Article generated! Review and publish when ready."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate article",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const saveArticle = async (publish: boolean) => {
    if (!formData.headline.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Headline and content are required",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const articleData = {
        ...formData,
        category_color: categoryColors[formData.category],
        published: publish
      };

      if (editingId) {
        const { error } = await supabase
          .from('news_articles')
          .update(articleData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('news_articles')
          .insert([articleData]);
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: publish ? "Article published!" : "Article saved as draft"
      });

      resetForm();
      fetchArticles();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Article deleted"
      });

      fetchArticles();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const togglePublish = async (article: NewsArticle) => {
    try {
      const { error } = await supabase
        .from('news_articles')
        .update({ published: !article.published })
        .eq('id', article.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: article.published ? "Article unpublished" : "Article published"
      });

      fetchArticles();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const editArticle = (article: NewsArticle) => {
    setEditingId(article.id);
    setFormData({
      headline: article.headline,
      content: article.content,
      category: article.category,
      link: article.link || "",
      date: article.date
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setTopic("");
    setFormData({
      headline: "",
      content: "",
      category: "Cyber Security",
      link: "",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    });
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8">News Admin</h1>

        {/* Generator Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Article" : "Generate New Article"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!editingId && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Topic or Keywords</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., 'new phishing attack targeting small businesses'"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      disabled={isGenerating}
                    />
                    <Button onClick={generateArticle} disabled={isGenerating}>
                      {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                  <SelectItem value="Natural Disaster">Natural Disaster</SelectItem>
                  <SelectItem value="Business Continuity">Business Continuity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Headline</label>
              <Input
                placeholder="Article headline"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Content</label>
              <Textarea
                placeholder="Article content (2-3 sentences)"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Link (optional)</label>
              <Input
                placeholder="https://..."
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={() => saveArticle(false)} disabled={isLoading} variant="outline">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save as Draft"}
              </Button>
              <Button onClick={() => saveArticle(true)} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publish"}
              </Button>
              {editingId && (
                <Button onClick={resetForm} variant="ghost">
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">All Articles</h2>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : articles.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No articles yet. Generate your first one!</p>
          ) : (
            articles.map((article) => (
              <Card key={article.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-muted-foreground">{article.date}</span>
                        <Badge className={`${article.category_color} text-white border-0`}>
                          {article.category}
                        </Badge>
                        <Badge variant={article.published ? "default" : "outline"}>
                          {article.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{article.headline}</h3>
                      <p className="text-muted-foreground mb-2">{article.content}</p>
                      {article.link && (
                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                          {article.link}
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="icon" variant="outline" onClick={() => togglePublish(article)}>
                        {article.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button size="icon" variant="outline" onClick={() => editArticle(article)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => deleteArticle(article.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
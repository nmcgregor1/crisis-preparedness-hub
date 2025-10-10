-- Create news_articles table
CREATE TABLE public.news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TEXT NOT NULL DEFAULT to_char(now(), 'Month DD, YYYY'),
  category TEXT NOT NULL CHECK (category IN ('Cyber Security', 'Natural Disaster', 'Business Continuity')),
  category_color TEXT NOT NULL DEFAULT 'bg-blue-500',
  headline TEXT NOT NULL,
  content TEXT NOT NULL,
  link TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view published articles
CREATE POLICY "Anyone can view published articles"
ON public.news_articles
FOR SELECT
USING (published = true);

-- Policy: Anyone can insert articles (for admin page - we'll add proper auth later if needed)
CREATE POLICY "Anyone can insert articles"
ON public.news_articles
FOR INSERT
WITH CHECK (true);

-- Policy: Anyone can update articles (for admin page - we'll add proper auth later if needed)
CREATE POLICY "Anyone can update articles"
ON public.news_articles
FOR UPDATE
USING (true);

-- Policy: Anyone can delete articles (for admin page - we'll add proper auth later if needed)
CREATE POLICY "Anyone can delete articles"
ON public.news_articles
FOR DELETE
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_news_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_news_articles_updated_at
BEFORE UPDATE ON public.news_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_news_articles_updated_at();
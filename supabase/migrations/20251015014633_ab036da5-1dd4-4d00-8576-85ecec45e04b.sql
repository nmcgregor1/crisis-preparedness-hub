-- Drop all existing permissive policies on news_articles
DROP POLICY IF EXISTS "Anyone can insert articles" ON news_articles;
DROP POLICY IF EXISTS "Anyone can update articles" ON news_articles;
DROP POLICY IF EXISTS "Anyone can delete articles" ON news_articles;
DROP POLICY IF EXISTS "Anyone can view all articles" ON news_articles;

-- Public read access for published content
CREATE POLICY "Public can view published articles"
ON news_articles FOR SELECT TO anon
USING (published = true);

-- Authenticated users can view all articles (including drafts)
CREATE POLICY "Authenticated can view all articles"
ON news_articles FOR SELECT TO authenticated
USING (true);

-- Authenticated users can write (insert, update, delete)
CREATE POLICY "Authenticated can insert articles"
ON news_articles FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update articles"
ON news_articles FOR UPDATE TO authenticated
USING (true);

CREATE POLICY "Authenticated can delete articles"
ON news_articles FOR DELETE TO authenticated
USING (true);
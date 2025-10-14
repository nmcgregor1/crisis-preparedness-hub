-- Drop the restrictive policy that only allows viewing published articles
DROP POLICY IF EXISTS "Anyone can view published articles" ON news_articles;

-- Create a new policy that allows viewing all articles (for admin access)
CREATE POLICY "Anyone can view all articles"
ON news_articles FOR SELECT
TO anon, authenticated
USING (true);
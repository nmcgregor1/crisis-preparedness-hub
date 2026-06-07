-- Restrict news_articles draft visibility to admins; published visible to everyone
DROP POLICY IF EXISTS "Public can view published articles" ON public.news_articles;
DROP POLICY IF EXISTS "Authenticated can view all articles" ON public.news_articles;

CREATE POLICY "Anyone can view published articles"
ON public.news_articles
FOR SELECT
TO anon, authenticated
USING (published = true);

CREATE POLICY "Admins can view all articles"
ON public.news_articles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Lock down user_roles writes to admins only (explicit, prevents privilege escalation)
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- has_role is only used internally by RLS policies; remove direct API/RPC execute access
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM authenticated;
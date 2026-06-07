CREATE OR REPLACE FUNCTION public.update_news_articles_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.update_news_articles_updated_at() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_news_articles_updated_at() FROM anon;
REVOKE EXECUTE ON FUNCTION public.update_news_articles_updated_at() FROM authenticated;
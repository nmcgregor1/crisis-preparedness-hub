-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL CHECK (char_length(first_name) <= 100),
  last_name TEXT NOT NULL CHECK (char_length(last_name) <= 100),
  email TEXT NOT NULL CHECK (char_length(email) <= 255),
  company TEXT NOT NULL CHECK (char_length(company) <= 200),
  phone TEXT CHECK (char_length(phone) <= 20),
  message TEXT NOT NULL CHECK (char_length(message) <= 2000),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  user_agent TEXT,
  ip_address TEXT
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admin only access for viewing and managing submissions
CREATE POLICY "Admins can view all submissions"
  ON public.contact_submissions
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update submissions"
  ON public.contact_submissions
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for performance
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_email ON public.contact_submissions(email);
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions(status);
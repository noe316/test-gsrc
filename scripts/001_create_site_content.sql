-- Create site_content table for storing editable section content
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  field TEXT NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read content (public website)
CREATE POLICY "Allow public read access" ON public.site_content
  FOR SELECT USING (true);

-- Allow authenticated users to update content (admin)
CREATE POLICY "Allow authenticated users to update" ON public.site_content
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert" ON public.site_content
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

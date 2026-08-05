-- ============================================
-- CyberSentinel Portfolio - Database Schema
-- Run this in Supabase SQL Editor to create all tables
-- ============================================

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  title TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  about TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  resume_url TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  linkedin_url TEXT DEFAULT '',
  twitter_url TEXT DEFAULT '',
  website_url TEXT DEFAULT '',
  location TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BLOGS
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  category TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  cover_image TEXT DEFAULT '',
  seo_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  reading_time TEXT DEFAULT '',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECTS
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT DEFAULT '',
  description TEXT DEFAULT '',
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT DEFAULT '',
  live_url TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  featured BOOLEAN DEFAULT FALSE,
  category TEXT DEFAULT '',
  display_order INT DEFAULT 0,
  challenges TEXT[] DEFAULT '{}',
  lessons TEXT[] DEFAULT '{}',
  architecture TEXT DEFAULT '',
  security_features TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  date TIMESTAMPTZ,
  organization TEXT DEFAULT '',
  category TEXT DEFAULT '',
  icon TEXT DEFAULT 'Trophy',
  image_url TEXT DEFAULT '',
  certificate_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CERTIFICATIONS
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT DEFAULT '',
  issue_date TIMESTAMPTZ,
  credential_id TEXT DEFAULT '',
  verification_url TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  status TEXT DEFAULT 'Verified' CHECK (status IN ('Verified', 'In Progress')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SKILLS
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT DEFAULT '',
  description TEXT DEFAULT '',
  icon TEXT DEFAULT '',
  level INT DEFAULT 50 CHECK (level >= 0 AND level <= 100),
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. BLOG TAGS (normalized)
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. LABS
CREATE TABLE IF NOT EXISTS labs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  objective TEXT DEFAULT '',
  environment TEXT DEFAULT '',
  tools TEXT[] DEFAULT '{}',
  steps TEXT[] DEFAULT '{}',
  findings TEXT[] DEFAULT '{}',
  mitigation TEXT[] DEFAULT '{}',
  lessons TEXT[] DEFAULT '{}',
  difficulty TEXT DEFAULT 'Beginner',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. TIMELINE
CREATE TABLE IF NOT EXISTS timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INT DEFAULT 0,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon TEXT DEFAULT 'Code2',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default profile
INSERT INTO profiles (email, name, title, bio, location)
VALUES ('admin@cybersentinel.com', 'prashanta Guragain', 'Cybersecurity Student & Developer', 'SOC Enthusiast | Secure Software Developer', 'Nepal')
ON CONFLICT (email) DO NOTHING;

-- Migrations for existing databases (idempotent: safe to run on fresh or existing DBs)
ALTER TABLE skills ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS architecture TEXT DEFAULT '';

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can read published content)
CREATE POLICY "Public profiles read" ON profiles FOR SELECT USING (TRUE);
CREATE POLICY "Public blogs read" ON blogs FOR SELECT USING (status = 'published' OR status IS NULL);
CREATE POLICY "Public projects read" ON projects FOR SELECT USING (TRUE);
CREATE POLICY "Public achievements read" ON achievements FOR SELECT USING (TRUE);
CREATE POLICY "Public certifications read" ON certifications FOR SELECT USING (TRUE);
CREATE POLICY "Public skills read" ON skills FOR SELECT USING (TRUE);
CREATE POLICY "Public labs read" ON labs FOR SELECT USING (TRUE);
CREATE POLICY "Public timeline read" ON timeline FOR SELECT USING (TRUE);

-- Public insert policy (anyone can submit a contact message via the anon key)
CREATE POLICY "Public contact messages insert" ON contact_messages FOR INSERT WITH CHECK (TRUE);

-- Authenticated admin policies (the admin panel signs in via supabase.auth, so the
-- signed-in session can read/update/delete messages while anonymous users cannot)
CREATE POLICY "Authenticated contact messages read" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated contact messages update" ON contact_messages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated contact messages delete" ON contact_messages FOR DELETE USING (auth.role() = 'authenticated');

-- Admin write policies (the admin panel signs in via supabase.auth, so the
-- signed-in session is allowed to manage content; anonymous visitors cannot write)
CREATE POLICY "Authenticated blogs write" ON blogs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated blogs update" ON blogs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated blogs delete" ON blogs FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated projects write" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated projects update" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated projects delete" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated labs write" ON labs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated labs update" ON labs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated labs delete" ON labs FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated achievements write" ON achievements FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated achievements update" ON achievements FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated achievements delete" ON achievements FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated certifications write" ON certifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated certifications update" ON certifications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated certifications delete" ON certifications FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated skills write" ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated skills update" ON skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated skills delete" ON skills FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated timeline write" ON timeline FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated timeline update" ON timeline FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated timeline delete" ON timeline FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated profiles update" ON profiles FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated profiles insert" ON profiles FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Enable realtime for contact messages
ALTER PUBLICATION supabase_realtime ADD TABLE contact_messages;

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

-- Insert default profile
INSERT INTO profiles (email, name, title, bio, location)
VALUES ('admin@cybersentinel.com', 'Prashant Guragain', 'Cybersecurity Student & Developer', 'SOC Enthusiast | Secure Software Developer', 'Nepal')
ON CONFLICT (email) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can read published content)
CREATE POLICY "Public profiles read" ON profiles FOR SELECT USING (TRUE);
CREATE POLICY "Public blogs read" ON blogs FOR SELECT USING (status = 'published' OR status IS NULL);
CREATE POLICY "Public projects read" ON projects FOR SELECT USING (TRUE);
CREATE POLICY "Public achievements read" ON achievements FOR SELECT USING (TRUE);
CREATE POLICY "Public certifications read" ON certifications FOR SELECT USING (TRUE);
CREATE POLICY "Public skills read" ON skills FOR SELECT USING (TRUE);

-- Admin write policies (service role only, not used with RLS directly)
-- We use service_role key for admin operations, which bypasses RLS

-- Enable realtime for contact messages
ALTER PUBLICATION supabase_realtime ADD TABLE contact_messages;

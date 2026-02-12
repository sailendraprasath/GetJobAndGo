/*
  # GetJobAndGo Job Portal Database Schema
  
  ## Overview
  This migration creates the complete database schema for the GetJobAndGo job portal platform.
  
  ## New Tables
  
  ### 1. profiles
  - `id` (uuid, primary key) - References auth.users
  - `role` (text) - User role: 'student', 'company', or 'admin'
  - `full_name` (text) - User's full name
  - `email` (text) - User's email
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 2. students
  - `id` (uuid, primary key) - References profiles
  - `degree` (text) - Student's degree/education
  - `skills` (text array) - Array of student skills
  - `resume_url` (text) - Link to uploaded resume
  - `phone` (text) - Contact number
  - `bio` (text) - Student bio/description
  
  ### 3. companies
  - `id` (uuid, primary key) - References profiles
  - `company_name` (text) - Official company name
  - `gst_number` (text) - GST registration number
  - `cin_number` (text) - CIN registration number
  - `verification_status` (text) - Status: 'pending', 'approved', 'rejected'
  - `website` (text) - Company website
  - `description` (text) - Company description
  - `location` (text) - Company location
  - `phone` (text) - Contact number
  
  ### 4. jobs
  - `id` (uuid, primary key) - Job ID
  - `company_id` (uuid) - References companies
  - `title` (text) - Job title
  - `description` (text) - Job description
  - `requirements` (text) - Job requirements
  - `location` (text) - Job location
  - `job_type` (text) - Type: 'full-time', 'part-time', 'internship'
  - `salary_range` (text) - Salary range
  - `status` (text) - Status: 'active', 'closed'
  - `created_at` (timestamptz) - Job posting date
  
  ### 5. applications
  - `id` (uuid, primary key) - Application ID
  - `job_id` (uuid) - References jobs
  - `student_id` (uuid) - References students
  - `status` (text) - Status: 'pending', 'shortlisted', 'rejected'
  - `cover_letter` (text) - Optional cover letter
  - `applied_at` (timestamptz) - Application timestamp
  
  ## Security
  - RLS enabled on all tables
  - Students can read their own profile and applications
  - Companies can read their own profile, jobs, and applications
  - Admin can manage all data
  - Public can view approved companies and active jobs
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('student', 'company', 'admin')),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY REFERENCES profiles ON DELETE CASCADE,
  degree text,
  skills text[] DEFAULT '{}',
  resume_url text,
  phone text,
  bio text,
  created_at timestamptz DEFAULT now()
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY REFERENCES profiles ON DELETE CASCADE,
  company_name text NOT NULL,
  gst_number text,
  cin_number text,
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  website text,
  description text,
  location text,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  requirements text,
  location text NOT NULL,
  job_type text DEFAULT 'full-time' CHECK (job_type IN ('full-time', 'part-time', 'internship')),
  salary_range text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  created_at timestamptz DEFAULT now()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs ON DELETE CASCADE NOT NULL,
  student_id uuid REFERENCES students ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'shortlisted', 'rejected')),
  cover_letter text,
  applied_at timestamptz DEFAULT now(),
  UNIQUE(job_id, student_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can create profile on signup"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Students Policies
CREATE POLICY "Students can view own profile"
  ON students FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Students can update own profile"
  ON students FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Students can create own profile"
  ON students FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Companies can view student profiles"
  ON students FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'company'
    )
  );

-- Companies Policies
CREATE POLICY "Companies can view own profile"
  ON companies FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Companies can update own profile"
  ON companies FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Companies can create own profile"
  ON companies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Everyone can view approved companies"
  ON companies FOR SELECT
  TO authenticated
  USING (verification_status = 'approved');

CREATE POLICY "Admin can view all companies"
  ON companies FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admin can update companies"
  ON companies FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Jobs Policies
CREATE POLICY "Everyone can view active jobs from approved companies"
  ON jobs FOR SELECT
  TO authenticated
  USING (
    status = 'active'
    AND EXISTS (
      SELECT 1 FROM companies
      WHERE companies.id = jobs.company_id
      AND companies.verification_status = 'approved'
    )
  );

CREATE POLICY "Companies can create own jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = company_id
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'company'
    )
  );

CREATE POLICY "Companies can update own jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (auth.uid() = company_id)
  WITH CHECK (auth.uid() = company_id);

CREATE POLICY "Companies can delete own jobs"
  ON jobs FOR DELETE
  TO authenticated
  USING (auth.uid() = company_id);

-- Applications Policies
CREATE POLICY "Students can view own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (
    auth.uid() = student_id
  );

CREATE POLICY "Students can create applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = student_id
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'student'
    )
  );

CREATE POLICY "Companies can view applications for their jobs"
  ON applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = applications.job_id
      AND jobs.company_id = auth.uid()
    )
  );

CREATE POLICY "Companies can update application status"
  ON applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = applications.job_id
      AND jobs.company_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = applications.job_id
      AND jobs.company_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_companies_verification ON companies(verification_status);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_applications_student ON applications(student_id);
CREATE INDEX IF NOT EXISTS idx_applications_job ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

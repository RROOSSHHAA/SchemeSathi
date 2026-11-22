-- =====================================================================
-- SchemeSathi AI — Complete PostgreSQL Schema Migration (Phase 2)
-- Enables UUID extension, creates all 14 relational tables, foreign keys,
-- indexes, Row Level Security (RLS) policies, and role definitions.
-- =====================================================================

-- 1. Enable required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================================
-- TABLE 1: profiles (Citizen Demographic & Welfare Profile)
-- Linked directly to Supabase Auth users via auth.uid()
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    age INTEGER CHECK (age >= 0 AND age <= 125),
    gender TEXT CHECK (gender IN ('MALE', 'FEMALE', 'OTHER', 'ALL')),
    state TEXT NOT NULL DEFAULT 'Maharashtra',
    district TEXT NOT NULL,
    pincode TEXT,
    annual_income NUMERIC(12, 2) DEFAULT 0.00,
    occupation TEXT NOT NULL DEFAULT 'Other',
    is_student BOOLEAN DEFAULT FALSE,
    is_farmer BOOLEAN DEFAULT FALSE,
    residence_type TEXT CHECK (residence_type IN ('Rural', 'Urban')) DEFAULT 'Urban',
    category TEXT DEFAULT 'General', -- General, OBC, SC, ST, EWS
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_profile UNIQUE (user_id)
);

-- =====================================================================
-- TABLE 2: scheme_categories (Welfare Focus Areas)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.scheme_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    icon_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- TABLE 3: schemes (Master Government Scheme Catalogue)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.schemes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category_id UUID REFERENCES public.scheme_categories(id) ON DELETE SET NULL,
    department TEXT NOT NULL,
    level TEXT CHECK (level IN ('CENTRAL', 'STATE')) DEFAULT 'CENTRAL',
    state TEXT DEFAULT 'All India',
    summary TEXT NOT NULL,
    benefits TEXT NOT NULL,
    official_portal_url TEXT NOT NULL,
    verification_status TEXT CHECK (verification_status IN ('VERIFIED', 'UNDER_REVIEW', 'ARCHIVED')) DEFAULT 'VERIFIED',
    last_verified_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- TABLE 4: scheme_rules (Deterministic Eligibility Criteria)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.scheme_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_id UUID NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    rule_version INTEGER DEFAULT 1,
    min_age INTEGER,
    max_age INTEGER,
    max_income NUMERIC(12, 2),
    target_gender TEXT DEFAULT 'ALL',
    target_state TEXT DEFAULT 'ALL',
    target_occupations TEXT[] DEFAULT ARRAY['ALL']::TEXT[],
    student_required BOOLEAN DEFAULT FALSE,
    farmer_required BOOLEAN DEFAULT FALSE,
    residence_required TEXT DEFAULT 'ANY', -- Rural, Urban, ANY
    mandatory_criteria JSONB DEFAULT '[]'::JSONB,
    conditional_criteria JSONB DEFAULT '[]'::JSONB,
    exclusion_criteria JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- TABLE 5: scheme_sources (Official Source Citations & References)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.scheme_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_id UUID NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    source_title TEXT NOT NULL,
    official_url TEXT NOT NULL,
    publishing_department TEXT NOT NULL,
    document_ref TEXT,
    is_official_gov_domain BOOLEAN DEFAULT TRUE,
    retrieved_at TIMESTAMPTZ DEFAULT NOW(),
    last_verified_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- TABLE 6: eligibility_evaluations (Deterministic Evaluation History)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.eligibility_evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    scheme_id UUID NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    result_status TEXT CHECK (result_status IN (
        'LIKELY_MATCH', 
        'DOES_NOT_MATCH_KNOWN_CRITERIA', 
        'NEEDS_MORE_INFORMATION', 
        'NEEDS_SOURCE_VERIFICATION'
    )) NOT NULL,
    conditions_satisfied JSONB DEFAULT '[]'::JSONB,
    conditions_failed JSONB DEFAULT '[]'::JSONB,
    missing_conditions JSONB DEFAULT '[]'::JSONB,
    evaluated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- TABLE 7: saved_schemes (Citizen Bookmarked Schemes)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.saved_schemes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    scheme_id UUID NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    notes TEXT,
    saved_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_saved_scheme UNIQUE (user_id, scheme_id)
);

-- =====================================================================
-- TABLE 8: application_checklists (Step-by-Step Guidance Tracker)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.application_checklists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    scheme_id UUID NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN (
        'Not Started',
        'Preparing Documents',
        'Ready to Apply',
        'Submitted by User',
        'Awaiting Response',
        'Completed'
    )) DEFAULT 'Not Started',
    application_ref_number TEXT,
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_scheme_checklist UNIQUE (user_id, scheme_id)
);

-- =====================================================================
-- TABLE 9: checklist_items (Individual Document Preparation Checklist)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.checklist_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    checklist_id UUID NOT NULL REFERENCES public.application_checklists(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    is_ready BOOLEAN DEFAULT FALSE,
    issuing_authority TEXT,
    notes TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- TABLE 10: ai_conversations (RAG Explanation & Assistant Threads)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    scheme_id UUID REFERENCES public.schemes(id) ON DELETE SET NULL,
    title TEXT DEFAULT 'Scheme Assistance Inquiry',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- TABLE 11: ai_messages (User Questions, AI Responses & Citations)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.ai_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('user', 'assistant', 'system')) NOT NULL,
    content TEXT NOT NULL,
    language TEXT DEFAULT 'en', -- en, mr (Marathi), hi (Hindi)
    citations JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- TABLE 12: volunteers (Verified Beneficiary Mentors & Helpers)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.volunteers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    specialization TEXT DEFAULT 'General',
    is_verified BOOLEAN DEFAULT FALSE,
    rating NUMERIC(2, 1) DEFAULT 5.0,
    active_cases_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_volunteer_user UNIQUE (user_id)
);

-- =====================================================================
-- TABLE 13: community_reports (Misinformation & Dead Link Flags)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.community_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    scheme_id UUID REFERENCES public.schemes(id) ON DELETE CASCADE,
    issue_type TEXT CHECK (issue_type IN (
        'OUTDATED_CRITERIA', 
        'BROKEN_URL', 
        'WRONG_BENEFIT', 
        'MISLEADING_INFO', 
        'OTHER'
    )) NOT NULL,
    details TEXT NOT NULL,
    status TEXT CHECK (status IN ('PENDING', 'REVIEWED', 'RESOLVED')) DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- TABLE 14: audit_logs (Admin Modification History)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    target_table TEXT NOT NULL,
    target_id UUID,
    changes JSONB NOT NULL,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- INDEXES FOR FAST DISCOVERY & ELIGIBILITY QUERIES
-- =====================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_schemes_state ON public.schemes(state);
CREATE INDEX IF NOT EXISTS idx_schemes_verification ON public.schemes(verification_status);
CREATE INDEX IF NOT EXISTS idx_scheme_rules_scheme_id ON public.scheme_rules(scheme_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_user_id ON public.eligibility_evaluations(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_schemes_user ON public.saved_schemes(user_id);
CREATE INDEX IF NOT EXISTS idx_checklists_user ON public.application_checklists(user_id);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Ensures citizens can ONLY access their own records
-- =====================================================================

-- Enable RLS on all user-facing tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eligibility_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheme_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheme_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheme_sources ENABLE ROW LEVEL SECURITY;

-- 1. Profiles: User can read and write only their own profile
CREATE POLICY "Users view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- 2. Schemes & Categories: Public read access for active verified schemes
CREATE POLICY "Public read verified schemes" ON public.schemes
    FOR SELECT USING (verification_status = 'VERIFIED');

CREATE POLICY "Public read scheme categories" ON public.scheme_categories
    FOR SELECT USING (true);

CREATE POLICY "Public read scheme rules" ON public.scheme_rules
    FOR SELECT USING (true);

CREATE POLICY "Public read scheme sources" ON public.scheme_sources
    FOR SELECT USING (true);

-- 3. Saved Schemes: Citizen only
CREATE POLICY "Users view saved schemes" ON public.saved_schemes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert saved schemes" ON public.saved_schemes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete saved schemes" ON public.saved_schemes
    FOR DELETE USING (auth.uid() = user_id);

-- 4. Checklists: Citizen only
CREATE POLICY "Users view checklists" ON public.application_checklists
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert checklists" ON public.application_checklists
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update checklists" ON public.application_checklists
    FOR UPDATE USING (auth.uid() = user_id);

-- 5. Eligibility History: Citizen only
CREATE POLICY "Users view evaluations" ON public.eligibility_evaluations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert evaluations" ON public.eligibility_evaluations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. AI Conversations & Messages: Citizen only
CREATE POLICY "Users view conversations" ON public.ai_conversations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert conversations" ON public.ai_conversations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =====================================================================
-- SEED DATA: Central & Maharashtra Initial Verified Schemes
-- =====================================================================
INSERT INTO public.scheme_categories (slug, name, description, icon_name) VALUES
    ('financial', 'Financial Inclusion & Banking', 'Direct bank account subsidies and insurance', 'CreditCard'),
    ('health', 'Healthcare & Medical Assurance', 'Universal health cards and hospital coverage', 'ShieldCheck'),
    ('education', 'Higher Education & Scholarships', 'Pre-matric and post-matric fee reimbursements', 'GraduationCap'),
    ('agriculture', 'Agriculture & Farmer Welfare', 'Direct benefit transfers, crop insurance & solar pumps', 'Sprout')
ON CONFLICT (slug) DO NOTHING;

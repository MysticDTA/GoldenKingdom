-- Rollback: Remove additional RLS policies (approved-only read access)
-- Date: 2025-09-12

-- 🔹 Drop knowledge submissions read policy
DROP POLICY IF EXISTS "Everyone can read approved knowledge submissions"
ON public.knowledge_submissions;

-- 🔹 Drop extended bypass (only the new ones, keep baseline intact)
DROP POLICY IF EXISTS "Service role can bypass RLS on knowledge_submissions (extended)"
ON public.knowledge_submissions;

DROP POLICY IF EXISTS "Service role can bypass RLS on soul_journal (extended)"
ON public.soul_journal;

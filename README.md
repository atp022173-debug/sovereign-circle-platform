# The Sovereign Circle™ — A Course Correction of Life™

**Status:** Deployable application source / integration-ready MVP foundation, **not** a live production service. Proposed owner: The Sovereign Circle LLC (Wyoming, not yet formed).

## Included
- Responsive luxury homepage and secure email magic-link sign-in.
- Private membership application stored in Supabase Postgres.
- RLS on member records; server-side admin-only writes for verification fields.
- Level 1: Stripe Identity document + matching selfie (hosted flow) and signed webhook.
- Level 2: professional credential verification via authorized staff review (manual; no automated credential vendor).
- Level 3: staff admissions approval, tracked in review events.
- Approved-only opt-in member discovery endpoint.
- Introductions and private messages database with RLS restricting messages to two approved members after **both** accept.
- API endpoint for messaging, review endpoint, and a deployment guide.

## Setup
1. Create Supabase project and run `supabase/schema.sql` in SQL Editor. Enable email OTP/magic links and set site/redirect URLs.
2. Create Stripe account, enable Identity and appropriate data processing terms; set webhook endpoint `https://YOUR_DOMAIN/api/identity/webhook` and subscribe to `identity.verification_session.verified`.
3. Copy `.env.example` to `.env.local`, set credentials. NEVER expose `SUPABASE_SERVICE_ROLE_KEY` or Stripe secret to browser.
4. `npm install && npm run dev`; open http://localhost:3000. For Vercel, import repository and set environment variables there; deploy only after security review.
5. To designate first administrator, authenticate once and run a privileged SQL insert in Supabase SQL Editor: `insert into public.staff(user_id,role) values ('ACTUAL_AUTH_USER_UUID','admin');`. Do not enable staff self-registration.
6. Admin review is currently API-driven: POST `/api/admin/approve` with Authorization Bearer token and JSON `{ "user_id":"...", "action":"professional_verified", "note":"independently checked employment" }`, then action `approved`. Add a staffed admin interface before production.
7. For introductions, authorized staff must create records using a controlled backend and obtain each member's consent, setting accepted_a / accepted_b separately after authenticating the appropriate consent. This **workflow is not yet implemented in the UI**.

## Important production blockers
- The app is **not deployed** and no domain has been registered. A public domain must be purchased and DNS configured by its owner.
- No real verification can run without Stripe and Supabase credentials and provider approval.
- Add member-managed privacy controls and profile update endpoint, intro request/accept/reject UI, secure admin review dashboard, report/block, moderation, audit logging, throttling, email notification, account deletion/export, privacy policy, terms, retention schedule, and incident response.
- No end-to-end encryption: messages are protected in transit and by database authorization, but not cryptographically end-to-end encrypted. Do not advertise E2EE.
- Use Stripe Identity only where supported; investigate geographic coverage, PEP/sanctions considerations, and special security risks for public officials. Avoid collecting employer secrets, official IDs directly, security clearances, or sensitive government information.
- Legal review needed for privacy laws (including GDPR where applicable), biometric consent, background-check law, consumer protection, accessibility, security and international transfer requirements.
- Perform penetration testing, RLS tests, webhook replay/idempotency review, abuse testing, and backup/restore exercises before onboarding real members.
- Protect against rapid repeated identity session creation via per-user rate limiting and verification-state persistence before launch.
- API-based staff approval currently has a race possibility under concurrent requests; production should move transitions into a single database transaction with audit events.

## Architecture
Next.js App Router + Supabase Auth/Postgres/RLS + Stripe Identity + Vercel or comparable Node hosting. Secrets remain on server. Profile discoverability defaults to **false**.

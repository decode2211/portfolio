You are an expert full-stack developer. I have a Next.js 14 portfolio website built with TypeScript, Tailwind CSS, Framer Motion, Three.js/React Three Fiber, and Lucide React icons. I am adding a complete CMS with admin authentication so I can edit any content on the live website without touching code files.

The project uses the App Router. Here is the current folder structure:

app/
  admin/
    layout.tsx                      ← DONE (sidebar, auth guard, mobile drawer)
    login/
      page.tsx                      ← DONE (glassmorphism login, localStorage session)
    dashboard/
      page.tsx                      ← DONE (overview, stats, section shortcut cards)
      hero/page.tsx                 ← DONE (edit form, save button, toast)
      about/page.tsx                ← DONE (bio, education, stats, highlights)
      experience/page.tsx           ← DONE (accordion jobs, bullets, tech tags)
      projects/page.tsx             ← DONE (accordion projects, metrics, highlights)
      skills/page.tsx               ← DONE (category accordion, progress toggle)
      leetcode/page.tsx             ← DONE (counts, difficulty bars, streak, rating)
      contact/page.tsx              ← DONE (email, socials, stats, achievements)
  components/
    Hero.tsx
    About.tsx
    Experience.tsx
    Projects.tsx
    Skills.tsx
    LeetCode.tsx
    Contact.tsx
    AnimatedGlobe.tsx
    CursorGlow.tsx
  globals.css
  layout.tsx
  page.tsx                          ← DONE (Ctrl+Shift+A hidden admin trigger added)
public/
  resume (1).pdf
.env.local.example                  ← DONE (ADMIN_USERNAME, ADMIN_PASSWORD, NEXTAUTH_SECRET, NEXTAUTH_URL)
next.config.js
tailwind.config.js
tsconfig.json
package.json

NOTE on current auth: The login page currently uses a simple localStorage session with NEXT_PUBLIC_ADMIN_USERNAME and NEXT_PUBLIC_ADMIN_PASSWORD. Steps 2 and 5 below will replace this with proper next-auth + server-side session checks.

---

## WHAT STILL NEEDS TO BE BUILT

### STEP 1 — Audit & Extract Content   ← TODO
Go through every existing component file one by one (Hero.tsx, About.tsx, Experience.tsx, Projects.tsx, Skills.tsx, LeetCode.tsx, Contact.tsx). Extract every hardcoded string, array, number, and URL into a single unified file called data/content.json. Design the JSON schema to cover all sections: hero, about, experience, projects, skills, leetcode, contact. After extraction, refactor every component to read its data from this JSON file via a helper lib/content.ts that exports a typed getContent() function. Do not break any existing animations, 3D elements, Framer Motion transitions, or visual styling while doing this. After completing this step, show me the complete content.json schema and wait for my approval before proceeding.

### STEP 2 — Auth Setup   ← TODO
Install and configure next-auth with the CredentialsProvider. Store credentials in environment variables ADMIN_USERNAME and ADMIN_PASSWORD. Create app/api/auth/[...nextauth]/route.ts and lib/auth.ts. Create middleware.ts at the project root that protects all routes under /admin and /api/admin — unauthenticated requests get redirected to /admin/login. Session expires after 24 hours. Replace the current localStorage-based session in app/admin/login/page.tsx and app/admin/layout.tsx with next-auth signIn and useSession. After completing this step, show me the middleware and auth config and wait for approval.

### STEP 3 — API Routes   ← TODO
Create app/api/admin/content/route.ts with:
- GET: reads and returns the full content.json, protected by next-auth session check
- POST: accepts a JSON body with { section: string, data: any }, validates the session, then writes the updated section into content.json and returns success. Use Node.js fs module to read/write the file at the correct path relative to process.cwd().

Wire up all 7 existing dashboard edit pages (hero, about, experience, projects, skills, leetcode, contact) to use this API — each page should fetch current data from GET /api/admin/content on load, and call POST /api/admin/content on save. Replace the current fake setTimeout saves with real API calls.

### STEP 4 — Inline Edit Mode   ← TODO
When the user is logged in as admin and visits the main portfolio at "/", show a floating pill button fixed to the bottom-right corner labeled "Edit Mode" with a toggle switch. When Edit Mode is turned ON, each portfolio section gets a small semi-transparent pencil icon button overlaid in its top-right corner. Clicking a section's pencil icon opens a slide-over drawer panel from the right side of the screen containing that section's edit form (same form as the dashboard pages but rendered inline). Saving from the drawer calls the same POST /api/admin/content API and updates the page content in real time without a full reload (update React state after successful save). When Edit Mode is OFF, none of this UI is visible to regular visitors. Use React context (AdminContext) to manage the edit mode state and the currently logged-in admin session across the portfolio.

Create these files:
app/components/AdminBar.tsx        ← floating Edit Mode toggle
app/components/EditDrawer.tsx      ← slide-over panel
app/context/AdminContext.tsx       ← global admin state

### STEP 5 — Profile Photo Upload   ← TODO
In the dashboard, add an "Upload Profile Photo" section (can be on the overview page or a dedicated route). Use a standard HTML file input that accepts image files. On selection, use a FormData POST to a new API route app/api/admin/upload/route.ts that saves the image to public/images/profile.jpg using fs.writeFile, then updates the photo path in content.json. Show a preview of the uploaded image. The Hero and About components should read the profile photo path from content.json.

---

## FILES STILL TO CREATE
data/content.json
types/content.ts
lib/content.ts
lib/auth.ts
middleware.ts
app/api/auth/[...nextauth]/route.ts
app/api/admin/content/route.ts
app/api/admin/upload/route.ts
app/components/AdminBar.tsx
app/components/EditDrawer.tsx
app/context/AdminContext.tsx

---

## CONSTRAINTS
- Do NOT remove, break, or simplify any existing Framer Motion animations, Three.js globe, particle effects, cursor glow, or glassmorphism styling.
- Do NOT expose any admin UI, edit buttons, or CMS-related elements to non-authenticated visitors.
- Never hardcode credentials anywhere in source files. Always use process.env.ADMIN_USERNAME and process.env.ADMIN_PASSWORD.
- Keep all existing component prop interfaces and add to them — do not replace them.
- Every new UI element must follow the same dark glassmorphism aesthetic: dark background (#0a0a0a), frosted glass cards (backdrop-blur, bg-white/5), blue-to-purple gradient accents, smooth Framer Motion transitions.
- Use TypeScript throughout. Define proper types for all content.json sections in a types/content.ts file.
- After each major step, run a mental check: does the main portfolio still render correctly for a non-logged-in visitor?

---

## EXECUTION ORDER
Steps: 1 → 2 → 3 → 4 → 5. Complete each step fully before moving to the next. Pause for approval after Steps 1 and 2. For all remaining steps, proceed automatically and only stop if you hit an ambiguous decision that could break existing functionality.

Begin now with Step 1: audit all component files and generate the complete data/content.json schema.

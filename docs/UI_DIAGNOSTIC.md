# UI Issues Diagnostic & Fixes

## Common Vercel Deployment UI Problems

### 1. Check if Tailwind CSS is Loading

**Symptom:** Site looks completely unstyled, like basic HTML
**Cause:** Tailwind not building properly

**Fix:**
```bash
# Rebuild with fresh dependencies
npm run build

# Check build output for CSS

```

### 2. Check for Missing Environment Variables

**Symptom:** App loads but features broken, console errors
**Cause:** Missing env vars in Vercel

**Required Vercel Environment Variables:**
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (should be your Vercel URL)
- `OPENAI_API_KEY` (for AI features)

### 3. Check Image Optimization

**Symptom:** Images not displaying
**Cause:** Next.js image domains not configured

**Check:** `next.config.js` for image configuration

### 4. Check Font Loading

**Symptom:** Fonts look generic/system fonts
**Cause:** Google Fonts not loading properly

**Current:** Using Inter font from Google Fonts in layout.tsx - should work automatically

### 5. Check CSS/JS Build Output

**Symptom:** Styles partially working
**Cause:** PostCSS or build configuration issue

---

## Specific Pages to Test

Visit each page and note issues:

1. **Homepage (/)** 
   - Hero section with gradient
   - Feature cards
   - CTAs

2. **Dashboard (/dashboard)**
   - Nutrient cards
   - Charts
   - Summary stats

3. **Log Food (/log-food)**
   - Search interface
   - AI photo upload
   - Food list

4. **Recommendations (/recommendations)**
   - Recommendation cards
   - Gap analysis

5. **Settings (/settings)**
   - Form inputs
   - Toggle switches

6. **Auth Pages (/login, /signup)**
   - Form styling
   - Buttons

---

## Quick Fixes to Try

### Fix 1: Force Tailwind Rebuild
```bash
rm -rf .next
rm -rf node_modules/.cache
npm run build
```

### Fix 2: Verify Tailwind Config Paths
Check `tailwind.config.js` includes all paths:
```javascript
content: [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
],
```

### Fix 3: Check Next.js Config
Ensure no conflicting settings in `next.config.js`

### Fix 4: Purge Vercel Cache
In Vercel dashboard:
1. Go to Deployments
2. Click on latest deployment
3. Click "..." menu
4. Select "Redeploy"
5. Check "Clear Build Cache"

---

## What to Report

Please check the deployed site and report:

1. **Homepage Status:**
   - [ ] Gradient background visible?
   - [ ] Buttons styled correctly?
   - [ ] Cards have rounded corners and shadows?
   - [ ] Text readable with proper fonts?

2. **Dashboard Status:**
   - [ ] Nutrient badges display?
   - [ ] Charts render?
   - [ ] Layout responsive?

3. **Log Food Status:**
   - [ ] Search box styled?
   - [ ] AI photo upload card visible?
   - [ ] Buttons interactive?

4. **General:**
   - [ ] Header navigation works?
   - [ ] Footer displays?
   - [ ] Mobile responsive?
   - [ ] Colors match design (greens, whites, gradients)?

5. **Console Errors:**
   - Open browser DevTools (F12)
   - Check Console tab
   - Report any red errors

---

## Next Steps

Once you tell me what specifically looks broken, I can:
1. Fix CSS/styling issues
2. Update components
3. Adjust responsive design
4. Fix build configuration
5. Update Vercel settings

**Please describe what you see that's broken!**

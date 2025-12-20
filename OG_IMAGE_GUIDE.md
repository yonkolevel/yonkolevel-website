# How to Create Your Open Graph Image

## Quick Specs

**File:** `/public/images/og-image.jpg`  
**Dimensions:** 1200 x 630 pixels  
**Format:** JPG (recommended) or PNG  
**File Size:** Under 1MB (preferably under 500KB)  
**Color Mode:** RGB

---

## Design Layout Suggestion

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Safe Zone: Keep important content 40px from edges]       │
│                                                             │
│          ┌────────────────────────────────────┐            │
│          │                                    │            │
│          │      [YONKO LEVEL LOGO]           │            │
│          │                                    │            │
│          │   Apps that make you smile 😁     │            │
│          │                                    │            │
│          │   [Optional: App Icons Below]     │            │
│          │      🎨  📸  🎵                    │            │
│          │                                    │            │
│          └────────────────────────────────────┘            │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
    1200px wide x 630px tall
```

---

## Option 1: Simple & Bold (Recommended)

### Background

- Solid color or gradient
- Use brand colors: `#FF5C24` (orange) or `#FBBF2A` (yellow)
- Or use black `#121212` with colored accents

### Text

- **Title:** "YONKO LEVEL" in your pixel font (Press Start 2P or Doto)
  - Size: 72-96px
  - Color: White or contrasting color
- **Tagline:** "Apps that make you smile 😁"
  - Size: 36-48px
  - Font: Noto Sans or your body font
  - Color: White or slightly transparent

### Layout

- Center-aligned
- Keep text in the middle 50% of the image
- Add subtle texture or pixel pattern in background

---

## Option 2: Showcasing Apps

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│                     YONKO LEVEL                             │
│              Apps that make you smile 😁                    │
│                                                             │
│   [App Icon 1]        [App Icon 2]        [App Icon 3]     │
│  Invisible Camera     MidiCircuit        Coming Soon       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- Show your app icons (use actual app icons from `/public/products/`)
- Add app names below icons
- Use brand colors as accents

---

## Option 3: Pixelated/Retro Style

Match your website's pixel aesthetic:

- Use pixel art elements
- Add displaced pixels effect (like your sections)
- Incorporate your orange/yellow brand colors
- Keep it playful but professional

---

## Tools You Can Use

### Design Software

1. **Figma** (Free, web-based) - Recommended

   - Set canvas to 1200x630
   - Use frames for organization
   - Export as JPG

2. **Canva** (Free tier available)

   - Search for "Twitter Post" or "Facebook Cover"
   - Customize dimensions to 1200x630
   - Use their templates

3. **Adobe Photoshop/Illustrator**

   - Professional option
   - Full control

4. **Sketch** (Mac only)
   - Great for UI work

### Quick Online Tools

- [OGImage.xyz](https://ogimage.xyz) - Generate OG images with templates
- [Placid.app](https://placid.app) - OG image generator
- [Social Sizes](https://socialsizes.io) - Templates for social images

---

## Design Tips

### Typography

- **Minimum text size:** 40px for readability on mobile
- **Maximum text:** 2-3 lines of text max
- **Hierarchy:** Make the brand name largest
- **Contrast:** Ensure text is easily readable

### Colors

Your brand colors are perfect:

- Orange `#FF5C24` - Energetic, creative
- Yellow `#FBBF2A` - Happy, optimistic
- Black `#121212` - Professional base
- White `#FFFFFF` - Clean, clear

### Composition

- **Rule of thirds:** Place important elements along the grid lines
- **Breathing room:** Don't crowd the image
- **Safe zone:** Keep important content 40px from all edges
- **Focus point:** Have one clear focal point (your logo/brand name)

---

## Testing Checklist

After creating your image:

1. **File check:**

   - [ ] Exactly 1200 x 630 pixels?
   - [ ] Under 1MB file size?
   - [ ] RGB color mode?
   - [ ] Saved as JPG or PNG?

2. **Visual check:**

   - [ ] Text is readable at small sizes?
   - [ ] Important content away from edges?
   - [ ] Looks good cropped to square (for some platforms)?
   - [ ] Brand colors match website?

3. **Platform tests:**
   - [ ] Test on Twitter Card Validator
   - [ ] Test on Facebook Debugger
   - [ ] Test on LinkedIn Post Inspector
   - [ ] Test on WhatsApp (share link)

---

## Example Prompts for AI Image Generators

If using Midjourney, DALL-E, or similar:

```
"A social media banner for Yonko Level, a tech studio.
Dimensions 1200x630. Modern pixel art style. Orange (#FF5C24)
and yellow (#FBBF2A) brand colors. Include text 'YONKO LEVEL'
in pixel font and tagline 'Apps that make you smile'.
Minimalist, professional, playful."
```

---

## Quick Template Structure (Figma/Sketch)

```
Canvas: 1200 x 630
├── Background Layer (fill color or gradient)
├── Pattern/Texture Layer (optional, 20% opacity)
├── Text Group
│   ├── Title: "YONKO LEVEL" (72-96px, bold)
│   └── Tagline: "Apps that make you smile 😁" (36-48px)
└── Logo/Icons (if including)
```

---

## Common Mistakes to Avoid

❌ **Text too small** - Won't be readable on mobile  
❌ **Too much text** - Cluttered and overwhelming  
❌ **Low contrast** - Text hard to read  
❌ **Wrong dimensions** - Will be cropped oddly  
❌ **File too large** - Slow to load, may be rejected  
❌ **Important content near edges** - Gets cropped on some platforms  
❌ **Inconsistent branding** - Doesn't match website aesthetic

---

## After Creating the Image

1. Save the file as `og-image.jpg`
2. Place it in `/public/images/og-image.jpg`
3. Test with the validators listed in SOCIAL_MEDIA_SEO_IMPROVEMENTS.md
4. If Facebook shows old image, use Facebook Debug Tool to force a refresh

---

## Need Help?

If you need assistance:

1. Share a rough draft and we can review it
2. Use one of the online tools mentioned above
3. Hire a designer on Fiverr (search "Open Graph image" - usually $10-30)

---

Good luck! The image will significantly improve how your site looks when shared on social media. 🎨




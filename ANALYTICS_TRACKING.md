# Analytics Tracking Documentation

## Overview

Your website now has comprehensive PostHog analytics tracking that bypasses ad blockers using a reverse proxy. All requests go through your domain (`/ingest/`) instead of `posthog.com`.

## Setup

### Files Modified/Created

1. **next.config.js** - Reverse proxy configuration
2. **src/providers/posthog.tsx** - PostHog provider component
3. **src/components/PostHogPageView.tsx** - Automatic pageview tracking
4. **src/app/layout.tsx** - Integration of PostHog into app
5. **.env.local** - Environment variables (not committed to git)
6. **.env.example** - Example environment variables

### Environment Variables

```
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
```

## Tracked Events

### Automatic Events

#### Pageviews
- **Event:** `$pageview`
- **Triggered:** On every page navigation
- **Properties:**
  - `$current_url` - Full URL including query parameters

#### Page Leaves
- **Event:** `$pageleave`
- **Triggered:** Automatically when user leaves a page
- **Properties:** Standard PostHog properties

### User Interaction Events

#### Navigation

##### Logo Click
- **Event:** `logo_clicked`
- **Triggered:** When user clicks the Yonko Level logo
- **Properties:**
  - `from_page` - Current page path

##### Navigation Links
- **Event:** `navigation_link_clicked`
- **Triggered:** When user clicks any navigation link (desktop or mobile)
- **Properties:**
  - `label` - Link label (e.g., "INVISIBLE CAMERA", "MIDICIRCUIT", "BLOG")
  - `href` - Destination URL
  - `device` - "desktop" or "mobile"

##### Mobile Menu
- **Event:** `mobile_menu_toggled`
- **Triggered:** When user opens/closes mobile menu
- **Properties:**
  - `action` - "opened" or "closed"

#### Product Pages

##### App Store Badge Clicks
- **Event:** `app_store_badge_clicked`
- **Triggered:** When user clicks the App Store pre-order badge
- **Properties:**
  - `product` - "invisible-camera" or "midicircuit"
  - `location` - "product_page"

##### Video Interactions (MidiCircuit)
- **Event:** `video_played`
- **Triggered:** When user plays the promotional video
- **Properties:**
  - `video_source` - Video file path
  - `app_name` - App name (if provided)

- **Event:** `video_paused`
- **Triggered:** When user pauses the promotional video
- **Properties:**
  - `video_source` - Video file path
  - `app_name` - App name (if provided)

- **Event:** `video_learn_more_clicked`
- **Triggered:** When user clicks "Learn more" button on video
- **Properties:**
  - `app_name` - App name
  - `destination` - Link destination

#### Contact Form

- **Event:** `contact_form_loaded`
- **Triggered:** When Typeform widget is ready
- **Properties:** None

- **Event:** `contact_form_submitted`
- **Triggered:** When user submits the contact form
- **Properties:** None

## Viewing Analytics

1. Log in to your PostHog dashboard at https://us.i.posthog.com
2. Navigate to "Events" to see all tracked events
3. Create dashboards and insights to analyze user behavior

## Common Analytics Questions You Can Answer

### Traffic & Engagement
- Which pages get the most views?
- How long do users stay on product pages?
- What's the bounce rate for different pages?

### User Behavior
- Which product gets more interest (Invisible Camera vs MidiCircuit)?
- Do users prefer desktop or mobile navigation?
- How often do users watch the promotional video?

### Conversion Funnel
- How many users view a product page?
- How many users click the App Store badge?
- What's the conversion rate from page view to App Store click?

### Navigation Patterns
- Which navigation links are most popular?
- Do users use the mobile menu?
- Where do users go after landing on the homepage?

## Privacy & GDPR Compliance

PostHog is configured with:
- `person_profiles: 'identified_only'` - Only creates profiles for identified users
- No automatic user identification
- All data stored in PostHog's US servers

For full GDPR compliance, you may want to:
1. Add a cookie consent banner
2. Allow users to opt-out of analytics
3. Update your privacy policy

## Troubleshooting

### Events Not Showing Up

1. Check browser console for errors
2. Verify `.env.local` has the correct PostHog key
3. Check PostHog dashboard for recent events (may take a few minutes)
4. Ensure ad blocker is disabled if testing

### Build Errors

If you get errors about `useSearchParams`, ensure the PostHogPageView component is wrapped in Suspense (already done).

## Next Steps

Consider adding:
- User identification (when users log in)
- Custom properties (user preferences, A/B test variants)
- Session recording
- Feature flags for A/B testing
- Error tracking

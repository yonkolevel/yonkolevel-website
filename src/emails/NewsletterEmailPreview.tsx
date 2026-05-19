import * as React from 'react';
import NewsletterEmail from './NewsletterEmail';

export default function Preview() {
  return (
    <NewsletterEmail
      theme="light"
      issueNumber="Issue #001"
      issueDate="May 15, 2026"
      editorialNote="Welcome to the first edition of the Yonko Level newsletter."
      biggestNews={{
        variant: 'feature',
        appTag: 'Yonko Level',
        headline: 'The biggest anime gaming moment of the week just dropped',
        imageUrl: 'https://placehold.co/600x340/FF5C24/FFFFFF?text=Feature+Image',
        imageAlt: 'Feature image',
        copy: "This week we saw something unprecedented in the world of anime gaming. The community came together, records were broken, and the meta shifted forever.",
        ctaText: 'Read the full story',
        ctaUrl: 'https://yonkolevel.com',
      }}
      adjacentNews={{
        label: 'Also in the news',
        iconUrl: 'https://placehold.co/52x52/232321/FF5C24?text=YL',
        headline: 'New world record set in Dragon Ball FighterZ tournament',
        location: 'Tokyo, Japan',
        date: 'May 14, 2026',
        copy: "In a stunning display of skill, the reigning champion broke the previous combo record by 12 hits during the grand finals.",
        ctaText: 'Watch the clip',
        ctaUrl: 'https://yonkolevel.com',
      }}
      posts={[
        {
          type: 'Blog',
          headline: 'Why One Piece games keep missing the mark',
          excerpt: "Despite having one of the richest universes in anime, One Piece games rarely live up to the source material.",
          author: 'Delcio Baptista',
          date: 'May 13, 2026',
          thumbnailUrl: 'https://placehold.co/88x66/232321/FF5C24?text=Blog',
          ctaUrl: 'https://yonkolevel.com/blog',
        },
        {
          type: 'Vlog',
          headline: 'We played every Naruto game so you do not have to',
          excerpt: "From the PS2 era all the way to Storm 4, we ranked every mainline Naruto game. Some hold up. Most do not.",
          author: 'Delcio Baptista',
          date: 'May 10, 2026',
          thumbnailUrl: 'https://placehold.co/88x66/232321/FF5C24?text=Vlog',
          ctaUrl: 'https://yonkolevel.com/blog',
        },
      ]}
      education={{
        label: 'Level Up',
        headline: 'What is frame data and why should you care?',
        body: "Frame data is the backbone of every fighting game. It tells you how long every move takes on hit, on block, on whiff. Understanding it turns guesswork into reads.",
        exampleContent: "Example: if a move is +2 on block, you recover 2 frames before your opponent after they block it. That is an advantage.",
        ctaText: 'Learn more',
        ctaUrl: 'https://yonkolevel.com',
      }}
      culturalPicks={[
        {
          thumbnailUrl: 'https://placehold.co/38x38/232321/FF5C24?text=1',
          title: 'Vinland Saga Season 2',
          url: 'https://yonkolevel.com',
          note: "If you thought Season 1 was good, Season 2 is on another level entirely.",
        },
        {
          thumbnailUrl: 'https://placehold.co/38x38/232321/FF5C24?text=2',
          title: 'Street Fighter 6 World Tour mode',
          url: 'https://yonkolevel.com',
          note: "The single-player RPG mode that no one expected and everyone needed.",
        },
        {
          thumbnailUrl: 'https://placehold.co/38x38/232321/FF5C24?text=3',
          title: 'Jujutsu Kaisen Vol. 0',
          url: 'https://yonkolevel.com',
          note: "The prequel manga that makes everything hit harder.",
        },
      ]}
      socialLinks={{
        twitter: 'https://twitter.com/yonkolevel',
        instagram: 'https://instagram.com/yonkolevel',
        youtube: 'https://youtube.com/@yonkolevel',
      }}
      unsubscribeUrl="https://yonkolevel.com/unsubscribe"
      preferencesUrl="https://yonkolevel.com/preferences"
    />
  );
}

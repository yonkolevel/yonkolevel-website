import NewsletterEmail from '@/emails/NewsletterEmail';
import { lightChangelogProps } from '@/emails/NewsletterEmail.preview';
export default function NewsletterChangelog() {
  return <NewsletterEmail {...lightChangelogProps} />;
}
import NewsletterEmail from '@/emails/NewsletterEmail';
import { minimalProps } from '@/emails/NewsletterEmail.preview';
export default function NewsletterMinimal() {
  return <NewsletterEmail {...minimalProps} />;
}
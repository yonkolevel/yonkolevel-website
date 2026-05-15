import NewsletterEmail from '@/emails/NewsletterEmail';
import { darkFeatureProps } from '@/emails/NewsletterEmail.preview';
export default function NewsletterDark() {
  return <NewsletterEmail {...darkFeatureProps} />;
}
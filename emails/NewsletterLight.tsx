import NewsletterEmail from '@/emails/NewsletterEmail';
import { lightFeatureProps } from '@/emails/NewsletterEmail.preview';
export default function NewsletterLight() {
  return <NewsletterEmail {...lightFeatureProps} />;
}
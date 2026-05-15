import NewsletterEmail from '@/emails/NewsletterEmail';
import { lightMultiAppProps } from '@/emails/NewsletterEmail.preview';
export default function NewsletterMultiApp() {
  return <NewsletterEmail {...lightMultiAppProps} />;
}
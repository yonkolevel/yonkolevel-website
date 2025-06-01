/* eslint-disable @next/next/no-img-element */
import Container from '@/components/Container';
import * as React from 'react';

interface PageProps { }

const Page: React.FunctionComponent<PageProps> = (props) => {
  return (
    <div>
      <section className='bg-white'>
        <div className='py-16'>
          <Container>
            <div className='pb-16 text-center flex flex-col justify-center items-center'>
              <div>
                <img
                  width={120}
                  src='/images/products/invisible-camera/app-icon.png'
                  alt='Invisible Camera app icon'
                />
              </div>
            </div>
            <div className='pb-10'>
              <h1 className='font-body font-bold text-3xl text-black text-center'>
                Privacy Policy
              </h1>
            </div>
            <div className='max-w-4xl mx-auto'>
              <div className='prose prose-lg text-gray-700 space-y-6'>
                <p className='text-sm text-gray-500 text-center mb-8'>
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>Overview</h2>
                  <p>
                    This Privacy Policy describes how Yonko Level ("we," "our," or "us") collects, uses, and protects your information when you use our mobile application.
                  </p>
                </section>

                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>Information We Collect</h2>

                  <h3 className='font-semibold text-lg text-black mb-2'>Camera and Photos</h3>
                  <p>
                    Our app requires access to your device's camera to function. All photos and videos you take remain stored locally on your device. We do not access, collect, or transmit your photos or videos to our servers.
                  </p>

                  <h3 className='font-semibold text-lg text-black mb-2'>Analytics Information</h3>
                  <p>
                    We use PostHog to collect anonymous usage analytics to help us improve the app. This may include:
                  </p>
                  <ul className='list-disc pl-6 space-y-1'>
                    <li>App usage patterns and feature interactions</li>
                    <li>Device type and operating system version</li>
                    <li>App performance metrics and crash reports</li>
                    <li>General location information (country/region level only)</li>
                  </ul>
                  <p className='mt-2'>
                    This data is anonymized and cannot be used to identify you personally.
                  </p>
                </section>

                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>What We Don't Collect</h2>
                  <p>We do not collect:</p>
                  <ul className='list-disc pl-6 space-y-1'>
                    <li>Personal identification information (name, email, phone number)</li>
                    <li>Your photos, videos, or camera content</li>
                    <li>Precise location data</li>
                    <li>Contact information or address book data</li>
                    <li>Account credentials (the app has no sign-in features)</li>
                  </ul>
                </section>

                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>How We Use Information</h2>
                  <p>The limited analytics data we collect is used solely to:</p>
                  <ul className='list-disc pl-6 space-y-1'>
                    <li>Improve app performance and user experience</li>
                    <li>Identify and fix bugs or technical issues</li>
                    <li>Understand which features are most useful to users</li>
                    <li>Make informed decisions about future app updates</li>
                  </ul>
                </section>

                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>Data Sharing</h2>
                  <p>
                    We do not sell, trade, or share your information with third parties, except:
                  </p>
                  <ul className='list-disc pl-6 space-y-1'>
                    <li>Anonymous analytics data processed by PostHog for app improvement purposes</li>
                    <li>When required by law or to protect our rights</li>
                  </ul>
                </section>

                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>Data Security</h2>
                  <p>
                    Your photos and videos remain entirely on your device and are protected by your device's built-in security measures. The limited analytics data we collect is transmitted securely and stored by PostHog in accordance with their security standards.
                  </p>
                </section>

                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>Third-Party Services</h2>
                  <p>
                    We use PostHog for analytics. PostHog's privacy practices are governed by their own Privacy Policy, which you can review at <a href="https://posthog.com/privacy" className='text-blue-600 underline' target='_blank' rel='noopener noreferrer'>https://posthog.com/privacy</a>.
                  </p>
                </section>

                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>Children's Privacy</h2>
                  <p>
                    Our app does not knowingly collect personal information from children under 13. Since we don't collect personal information and have no account system, the app can be safely used by users of all ages under parental supervision.
                  </p>
                </section>

                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>Your Rights</h2>
                  <p>Since we don't collect personal information, there's no personal data to access, modify, or delete. If you wish to stop analytics collection, you can delete the app from your device.</p>
                </section>

                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </section>

                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className='bg-gray-50 p-4 rounded-lg mt-4'>
                    <p className='font-mono text-sm'>
                      team@yonkolevel.com<br />
                      Yonko Level<br />
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
};

export default Page;

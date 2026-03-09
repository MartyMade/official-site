import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm from './ContactForm';
import { siteConfig } from '@/data/siteConfig';
import { Mail, Phone, Clock, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Contact | MartyMade',
  description: 'Get in touch with MartyMade for questions, custom builds, or support.',
};

const socialLabels: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
};

export default function ContactPage() {
  return (
    <main className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Contact Us"
          subtitle="Questions, custom build requests, or just want to talk reptiles? We're here for it."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Form - left / wider */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Contact info - right */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-surface-800 bg-surface-900 p-8">
              <h3 className="mb-6 text-xl font-bold text-surface-50">Contact Info</h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-900">
                    <Mail className="h-5 w-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-300">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-surface-50 hover:text-primary-400 transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-900">
                    <Phone className="h-5 w-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-300">Phone</p>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-surface-50 hover:text-primary-400 transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-900">
                    <Clock className="h-5 w-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-300">Business Hours</p>
                    <p className="text-surface-50">Mon &ndash; Fri: 9am &ndash; 5pm EST</p>
                    <p className="text-surface-400 text-sm">Sat &ndash; Sun: Closed</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-8 h-px bg-surface-800" />

              {/* Social links */}
              <h4 className="mb-4 text-sm font-semibold text-surface-300">Follow Us</h4>
              <div className="space-y-3">
                {Object.entries(siteConfig.socials).map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-surface-400 hover:text-primary-400 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm">{socialLabels[key] ?? key}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

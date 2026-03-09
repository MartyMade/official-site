'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [success, setSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log('Contact form submission:', formData);
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="rounded-xl bg-surface-800 p-12 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-primary-400" />
        <h3 className="mt-6 text-2xl font-bold text-surface-50">Message Sent!</h3>
        <p className="mt-3 text-surface-400">
          Thanks for reaching out. We typically respond within 24 hours.
        </p>
      </div>
    );
  }

  const inputClasses =
    'w-full rounded-lg border border-surface-700 bg-surface-900 px-4 py-3 text-surface-50 placeholder:text-surface-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:shadow-[0_0_0_4px_rgba(74,133,37,0.1)] transition-all';
  const labelClasses = 'mb-1.5 block text-sm font-medium text-surface-300';

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-surface-800 p-8">
      <h3 className="mb-8 text-2xl font-bold text-surface-50">Send a Message</h3>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            Name <span className="text-copper-400">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={inputClasses}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            Email <span className="text-copper-400">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="contact-subject" className={labelClasses}>
            Subject <span className="text-copper-400">*</span>
          </label>
          <select
            id="contact-subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select a topic</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Product Question">Product Question</option>
            <option value="Custom Build">Custom Build</option>
            <option value="Warranty">Warranty</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className={labelClasses}>
            Message <span className="text-copper-400">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help?"
            className={inputClasses}
          />
        </div>

        <Button type="submit" size="lg" className="w-full">
          Send Message
        </Button>
      </div>
    </form>
  );
}

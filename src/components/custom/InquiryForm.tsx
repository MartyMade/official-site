'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  material: string;
  size: string;
  species: string;
  requirements: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  material: '',
  size: '',
  species: '',
  requirements: '',
};

export default function InquiryForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [success, setSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log('Custom build inquiry:', formData);
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl bg-surface-800 p-12 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-primary-400" />
        <h3 className="mt-6 text-2xl font-bold text-surface-50">Inquiry Submitted!</h3>
        <p className="mt-3 text-surface-400">
          Thanks for reaching out. We&apos;ll review your requirements and get back to you within
          1&ndash;2 business days with a design proposal and quote.
        </p>
      </div>
    );
  }

  const inputClasses =
    'w-full rounded-lg border border-surface-700 bg-surface-900 px-4 py-3 text-surface-50 placeholder:text-surface-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors';
  const labelClasses = 'mb-1.5 block text-sm font-medium text-surface-300';

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-xl bg-surface-800 p-8 sm:p-10"
    >
      <h3 className="mb-8 text-2xl font-bold text-surface-50">Start Your Custom Build</h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name <span className="text-copper-400">*</span>
          </label>
          <input
            id="name"
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
          <label htmlFor="email" className={labelClasses}>
            Email <span className="text-copper-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone <span className="text-surface-500">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            className={inputClasses}
          />
        </div>

        {/* Material Preference */}
        <div>
          <label htmlFor="material" className={labelClasses}>
            Material Preference <span className="text-copper-400">*</span>
          </label>
          <select
            id="material"
            name="material"
            required
            value={formData.material}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select material</option>
            <option value="ABS">ABS</option>
            <option value="PVC">PVC</option>
            <option value="Glass">Glass</option>
            <option value="Not Sure">Not Sure</option>
          </select>
        </div>

        {/* Desired Size */}
        <div>
          <label htmlFor="size" className={labelClasses}>
            Desired Size <span className="text-copper-400">*</span>
          </label>
          <input
            id="size"
            name="size"
            type="text"
            required
            value={formData.size}
            onChange={handleChange}
            placeholder='e.g. 48" x 24" x 24"'
            className={inputClasses}
          />
        </div>

        {/* Species */}
        <div>
          <label htmlFor="species" className={labelClasses}>
            Species <span className="text-copper-400">*</span>
          </label>
          <input
            id="species"
            name="species"
            type="text"
            required
            value={formData.species}
            onChange={handleChange}
            placeholder="e.g. Ball Python, Crested Gecko"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Special Requirements */}
      <div className="mt-6">
        <label htmlFor="requirements" className={labelClasses}>
          Special Requirements
        </label>
        <textarea
          id="requirements"
          name="requirements"
          rows={4}
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Lighting cutouts, drainage, bioactive setup, specific colors, stacking needs..."
          className={inputClasses}
        />
      </div>

      <div className="mt-8">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Submit Inquiry
        </Button>
      </div>
    </form>
  );
}

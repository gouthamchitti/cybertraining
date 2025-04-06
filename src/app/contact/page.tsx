'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    reason: 'training'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Format the message for WhatsApp
      const whatsappNumber = '7207089154'; // Hidden from UI
      const whatsappMessage = `New Contact Form Submission:\n\nReason: ${formData.reason}\nName: ${formData.name}\nEmail: ${formData.email}\nOrganization: ${formData.organization || 'Not provided'}\n\nMessage:\n${formData.message}`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      // Customize success message based on reason
      let message = 'Thank you for your message. We will get back to you shortly.';

      if (formData.reason === 'training') {
        message = 'Thank you for your interest in our training. We will contact you with more information soon.';
      } else if (formData.reason === 'enrollment') {
        message = 'Thank you for your enrollment inquiry. We will contact you with enrollment details shortly.';
      }

      setSubmitStatus({
        success: true,
        message
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        organization: '',
        message: '',
        reason: 'training'
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'There was an error submitting your request. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />

      <main className="py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Fill out this form to get in touch with us about our cybersecurity training services.
            </p>
            <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-md border-l-4 border-indigo-500">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">
                    We'll get back to you as soon as possible. Your message will be sent directly to our team via WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 bg-white dark:bg-gray-800 shadow-lg overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="px-5 py-6 sm:p-8">
                {submitStatus && (
                  <div className={`mb-6 p-4 rounded-md ${submitStatus.success ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {submitStatus.success ? (
                          <svg className="h-5 w-5 text-green-400 dark:text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-red-400 dark:text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className={`text-sm font-medium ${submitStatus.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                          {submitStatus.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Reason for Contact
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className="mt-1 block w-full pl-3 pr-10 py-3 sm:py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg dark:bg-gray-700 dark:text-white shadow-sm"
                      required
                    >
                      <option value="training">Training Information</option>
                      <option value="enrollment">Course Enrollment</option>
                      <option value="business">Business Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-y-4 sm:gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white py-3 sm:py-2 px-3"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white py-3 sm:py-2 px-3"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Organization (Optional)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="organization"
                        id="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white py-3 sm:py-2 px-3"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white py-3 sm:py-2 px-3 min-h-[120px]"
                        required
                        placeholder={formData.reason === 'training' ? 'Please describe what kind of cybersecurity training you are interested in.' : formData.reason === 'enrollment' ? 'Please provide details about which course you want to enroll in.' : 'How can we help you?'}
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="privacy-policy"
                      name="privacy-policy"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700"
                      required
                    />
                    <label htmlFor="privacy-policy" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      I agree to the{' '}
                      <Link href="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                        privacy policy
                      </Link>
                    </label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center py-4 sm:py-3 px-6 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      {isSubmitting ? 'Submitting...' : 'Send Message via WhatsApp'}
                    </button>
                  </div>
                </form>
              </div>
            </div>


          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

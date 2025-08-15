import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Save, MapPin, Phone, Mail, Clock, Globe, Settings } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

const ContactManager = () => {
  const { contactInfo, updateContactInfo } = useAdminData();
  const [activeTab, setActiveTab] = useState('basic');

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: contactInfo
  });

  React.useEffect(() => {
    if (contactInfo) {
      reset(contactInfo);
    }
  }, [contactInfo, reset]);

  const onSubmit = async (data) => {
    await updateContactInfo(data);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: MapPin },
    { id: 'social', label: 'Social Media', icon: Globe },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Contact Information</h1>
        <p className="mt-2 text-gray-400">Manage contact details and social media links</p>
      </div>

      <div className="bg-gray-800 shadow rounded-lg">
        {/* Tabs */}
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <tab.icon className="inline h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Address
                  </label>
                  <textarea
                    {...register('address')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter complete address"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email Address
                  </label>
                  <input
                    {...register('email', {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="contact@rossum.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                {/* Office Hours */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Office Hours
                  </label>
                  <input
                    {...register('officeHours')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Monday - Friday: 9:00 AM - 5:00 PM"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Instagram */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Instagram URL
                  </label>
                  <input
                    {...register('socialMedia.instagram', {
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: 'Please enter a valid URL'
                      }
                    })}
                    type="url"
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="https://instagram.com/rossum_jua"
                  />
                  {errors.socialMedia?.instagram && (
                    <p className="mt-1 text-sm text-red-400">{errors.socialMedia.instagram.message}</p>
                  )}
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    {...register('socialMedia.linkedin', {
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: 'Please enter a valid URL'
                      }
                    })}
                    type="url"
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="https://linkedin.com/in/rossum-jua"
                  />
                  {errors.socialMedia?.linkedin && (
                    <p className="mt-1 text-sm text-red-400">{errors.socialMedia.linkedin.message}</p>
                  )}
                </div>

                {/* Facebook */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Facebook URL
                  </label>
                  <input
                    {...register('socialMedia.facebook', {
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: 'Please enter a valid URL'
                      }
                    })}
                    type="url"
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="https://facebook.com/rossum"
                  />
                  {errors.socialMedia?.facebook && (
                    <p className="mt-1 text-sm text-red-400">{errors.socialMedia.facebook.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Contact Form Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contact Form Email Recipient
                  </label>
                  <input
                    {...register('contactFormEmail', {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="admin@rossum.com"
                  />
                  {errors.contactFormEmail && (
                    <p className="mt-1 text-sm text-red-400">{errors.contactFormEmail.message}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-400">
                    This email will receive messages from the contact form
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-gray-700">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-white mb-4">
            Contact Information Preview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-300">Address</p>
                  <p className="text-sm text-gray-400">{contactInfo?.address || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-300">Phone</p>
                  <p className="text-sm text-gray-400">{contactInfo?.phone || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-300">Email</p>
                  <p className="text-sm text-gray-400">{contactInfo?.email || 'Not set'}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-300">Office Hours</p>
                  <p className="text-sm text-gray-400">{contactInfo?.officeHours || 'Not set'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Social Media</p>
                <div className="space-y-1">
                  {contactInfo?.socialMedia?.instagram && (
                    <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="block text-sm text-red-400 hover:text-red-300">
                      Instagram
                    </a>
                  )}
                  {contactInfo?.socialMedia?.linkedin && (
                    <a href={contactInfo.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="block text-sm text-red-400 hover:text-red-300">
                      LinkedIn
                    </a>
                  )}
                  {contactInfo?.socialMedia?.facebook && (
                    <a href={contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="block text-sm text-red-400 hover:text-red-300">
                      Facebook
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactManager;
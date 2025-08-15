import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, User, Mail, Phone, FileText, Image, Briefcase } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

const TeamMemberForm = ({ member, onClose }) => {
  const { addTeamMember, updateTeamMember } = useAdminData();
  const isEditing = !!member;

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: {
      name: '',
      role: '',
      department: '',
      bio: '',
      email: '',
      phone: '',
      url: '',
      ...member
    }
  });

  useEffect(() => {
    if (member) {
      reset(member);
    }
  }, [member, reset]);

  const onSubmit = async (data) => {
    const result = isEditing 
      ? await updateTeamMember(member.id, data)
      : await addTeamMember(data);
    
    if (result.success) {
      onClose();
    }
  };

  const watchedValues = watch();

  const roles = [
    'Faculty',
    'Secretary', 
    'Joint-Secretary',
    'Member-Coordinator',
    'Member'
  ];

  const departments = [
    'Faculty',
    'Administration',
    'Technical Team',
    'Event Management',
    'Public Relations',
    'Design Team'
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">
            {isEditing ? 'Edit Team Member' : 'Add New Team Member'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                <User className="inline h-4 w-4 mr-1" />
                Full Name *
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                <Briefcase className="inline h-4 w-4 mr-1" />
                Role *
              </label>
              <select
                {...register('role', { required: 'Role is required' })}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select role</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-400">{errors.role.message}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Department
              </label>
              <select
                {...register('department')}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                <Mail className="inline h-4 w-4 mr-1" />
                Email
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
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                <Phone className="inline h-4 w-4 mr-1" />
                Phone
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="+91 XXXXXXXXXX"
              />
            </div>

            {/* Profile Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                <Image className="inline h-4 w-4 mr-1" />
                Profile Image URL
              </label>
              <input
                {...register('url', {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: 'Please enter a valid URL'
                  }
                })}
                type="url"
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="https://..."
              />
              {errors.url && (
                <p className="mt-1 text-sm text-red-400">{errors.url.message}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              <FileText className="inline h-4 w-4 mr-1" />
              Bio
            </label>
            <textarea
              {...register('bio')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Brief bio or description"
            />
          </div>

          {/* Preview */}
          {watchedValues.name && (
            <div className="border-t border-gray-600 pt-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Preview</h4>
              <div className="bg-gray-700 rounded-lg p-4 max-w-xs">
                <div className="text-center">
                  <img
                    src={watchedValues.url || '/api/placeholder/80/80'}
                    alt={watchedValues.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/80/80';
                    }}
                  />
                  <h3 className="mt-3 text-lg font-medium text-white">{watchedValues.name}</h3>
                  <p className="text-sm text-gray-400">{watchedValues.role}</p>
                  {watchedValues.department && watchedValues.department !== watchedValues.role && (
                    <p className="text-xs text-gray-500">{watchedValues.department}</p>
                  )}
                  {watchedValues.bio && (
                    <p className="mt-2 text-xs text-gray-400">{watchedValues.bio}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {isEditing ? 'Update Member' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamMemberForm;
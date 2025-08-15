import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Calendar, Clock, MapPin, Link as LinkIcon, FileText, Star, Archive } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

const EventForm = ({ event, onClose }) => {
  const { addEvent, updateEvent } = useAdminData();
  const isEditing = !!event;

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: {
      title: '',
      text: '',
      date: '',
      time: '',
      location: '',
      registrationLink: '',
      featured: false,
      archived: false,
      ...event
    }
  });

  useEffect(() => {
    if (event) {
      reset(event);
    }
  }, [event, reset]);

  const onSubmit = async (data) => {
    const result = isEditing 
      ? await updateEvent(event.id, data)
      : await addEvent(data);
    
    if (result.success) {
      onClose();
    }
  };

  const watchedValues = watch();

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">
            {isEditing ? 'Edit Event' : 'Add New Event'}
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
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Event Title *
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                type="text"
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                <Calendar className="inline h-4 w-4 mr-1" />
                Date *
              </label>
              <input
                {...register('date', { required: 'Date is required' })}
                type="date"
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-400">{errors.date.message}</p>
              )}
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                <Clock className="inline h-4 w-4 mr-1" />
                Time
              </label>
              <input
                {...register('time')}
                type="time"
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                <MapPin className="inline h-4 w-4 mr-1" />
                Location
              </label>
              <input
                {...register('location')}
                type="text"
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Event location"
              />
            </div>

            {/* Registration Link */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                <LinkIcon className="inline h-4 w-4 mr-1" />
                Registration Link
              </label>
              <input
                {...register('registrationLink', {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: 'Please enter a valid URL'
                  }
                })}
                type="url"
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="https://..."
              />
              {errors.registrationLink && (
                <p className="mt-1 text-sm text-red-400">{errors.registrationLink.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              <FileText className="inline h-4 w-4 mr-1" />
              Description *
            </label>
            <textarea
              {...register('text', { required: 'Description is required' })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter event description"
            />
            {errors.text && (
              <p className="mt-1 text-sm text-red-400">{errors.text.message}</p>
            )}
          </div>

          {/* Options */}
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                {...register('featured')}
                type="checkbox"
                className="rounded border-gray-600 bg-gray-700 text-red-600 focus:ring-red-500"
              />
              <Star className="ml-2 h-4 w-4 text-yellow-400" />
              <span className="ml-1 text-sm text-gray-300">Featured Event</span>
            </label>
            <label className="flex items-center">
              <input
                {...register('archived')}
                type="checkbox"
                className="rounded border-gray-600 bg-gray-700 text-red-600 focus:ring-red-500"
              />
              <Archive className="ml-2 h-4 w-4 text-gray-400" />
              <span className="ml-1 text-sm text-gray-300">Archived</span>
            </label>
          </div>

          {/* Preview */}
          {watchedValues.title && (
            <div className="border-t border-gray-600 pt-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Preview</h4>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-medium text-white">{watchedValues.title}</h3>
                  {watchedValues.featured && (
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  )}
                  {watchedValues.archived && (
                    <Archive className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                {watchedValues.text && (
                  <p className="text-gray-300 text-sm mb-3">{watchedValues.text}</p>
                )}
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  {watchedValues.date && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(watchedValues.date).toLocaleDateString()}
                    </div>
                  )}
                  {watchedValues.time && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {watchedValues.time}
                    </div>
                  )}
                  {watchedValues.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {watchedValues.location}
                    </div>
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
              {isEditing ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
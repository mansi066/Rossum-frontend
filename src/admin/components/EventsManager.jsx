import React, { useState } from 'react';
import { Plus, Edit, Trash2, Star, Archive, Calendar, MapPin, Clock, Link as LinkIcon } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAdminData } from '../context/AdminDataContext';
import EventForm from './forms/EventForm';
import ConfirmDialog from './common/ConfirmDialog';
import { format } from 'date-fns';

const EventsManager = () => {
  const { events, deleteEvent, reorderEvents } = useAdminData();
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filter, setFilter] = useState('all'); // all, upcoming, archived, featured

  const filteredEvents = events.filter(event => {
    const now = new Date();
    const eventDate = new Date(event.date);
    
    switch (filter) {
      case 'upcoming':
        return eventDate > now && !event.archived;
      case 'archived':
        return event.archived;
      case 'featured':
        return event.featured;
      default:
        return true;
    }
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(filteredEvents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    reorderEvents(items);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (deleteConfirm) {
      await deleteEvent(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Events Management</h1>
          <p className="mt-2 text-gray-400">Manage events, webinars, and activities</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        {[
          { key: 'all', label: 'All Events' },
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'featured', label: 'Featured' },
          { key: 'archived', label: 'Archived' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              filter === key
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-300">No events</h3>
              <p className="mt-1 text-sm text-gray-400">
                Get started by creating a new event.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </button>
              </div>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="events">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                    {filteredEvents.map((event, index) => (
                      <Draggable key={event.id} draggableId={event.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-gray-700 rounded-lg p-4 transition-all duration-200 ${
                              snapshot.isDragging ? 'shadow-lg ring-2 ring-red-500' : 'hover:bg-gray-650'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h3 className="text-lg font-medium text-white">{event.title}</h3>
                                  {event.featured && (
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  )}
                                  {event.archived && (
                                    <Archive className="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{event.text}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {format(new Date(event.date), 'MMM dd, yyyy')}
                                  </div>
                                  {event.time && (
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1" />
                                      {event.time}
                                    </div>
                                  )}
                                  {event.location && (
                                    <div className="flex items-center">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      {event.location}
                                    </div>
                                  )}
                                  {event.registrationLink && (
                                    <div className="flex items-center">
                                      <LinkIcon className="h-4 w-4 mr-1" />
                                      <a 
                                        href={event.registrationLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-red-400 hover:text-red-300"
                                      >
                                        Registration
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 ml-4">
                                <button
                                  onClick={() => handleEdit(event)}
                                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-md transition-colors duration-200"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(event)}
                                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-600 rounded-md transition-colors duration-200"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>

      {/* Event Form Modal */}
      {showForm && (
        <EventForm
          event={editingEvent}
          onClose={handleCloseForm}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <ConfirmDialog
          title="Delete Event"
          message={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
          confirmText="Delete"
          onConfirm={handleDelete}
          onCancel={() => setDeleteConfirm(null)}
          type="danger"
        />
      )}
    </div>
  );
};

export default EventsManager;
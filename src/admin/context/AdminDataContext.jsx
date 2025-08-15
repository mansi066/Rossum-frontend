import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminDataService } from '../services/adminDataService';
import toast from 'react-hot-toast';

const AdminDataContext = createContext();

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within AdminDataProvider');
  }
  return context;
};

export const AdminDataProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [team, setTeam] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activityLog, setActivityLog] = useState([]);

  const logActivity = (action, type, details) => {
    const logEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      action,
      type,
      details,
      user: 'Admin' // In real app, get from auth context
    };
    setActivityLog(prev => [logEntry, ...prev.slice(0, 99)]); // Keep last 100 entries
  };

  // Events Management
  const addEvent = async (eventData) => {
    try {
      setLoading(true);
      const newEvent = await adminDataService.addEvent(eventData);
      setEvents(prev => [...prev, newEvent]);
      logActivity('CREATE', 'EVENT', `Created event: ${eventData.title}`);
      toast.success('Event added successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to add event');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id, eventData) => {
    try {
      setLoading(true);
      const updatedEvent = await adminDataService.updateEvent(id, eventData);
      setEvents(prev => prev.map(event => event.id === id ? updatedEvent : event));
      logActivity('UPDATE', 'EVENT', `Updated event: ${eventData.title}`);
      toast.success('Event updated successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to update event');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    try {
      setLoading(true);
      await adminDataService.deleteEvent(id);
      const deletedEvent = events.find(e => e.id === id);
      setEvents(prev => prev.filter(event => event.id !== id));
      logActivity('DELETE', 'EVENT', `Deleted event: ${deletedEvent?.title}`);
      toast.success('Event deleted successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to delete event');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const reorderEvents = async (newOrder) => {
    try {
      setEvents(newOrder);
      await adminDataService.reorderEvents(newOrder);
      logActivity('REORDER', 'EVENTS', 'Reordered events');
      toast.success('Events reordered successfully');
    } catch (error) {
      toast.error('Failed to reorder events');
    }
  };

  // Team Management
  const addTeamMember = async (memberData) => {
    try {
      setLoading(true);
      const newMember = await adminDataService.addTeamMember(memberData);
      setTeam(prev => [...prev, newMember]);
      logActivity('CREATE', 'TEAM_MEMBER', `Added team member: ${memberData.name}`);
      toast.success('Team member added successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to add team member');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateTeamMember = async (id, memberData) => {
    try {
      setLoading(true);
      const updatedMember = await adminDataService.updateTeamMember(id, memberData);
      setTeam(prev => prev.map(member => member.id === id ? updatedMember : member));
      logActivity('UPDATE', 'TEAM_MEMBER', `Updated team member: ${memberData.name}`);
      toast.success('Team member updated successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to update team member');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteTeamMember = async (id) => {
    try {
      setLoading(true);
      await adminDataService.deleteTeamMember(id);
      const deletedMember = team.find(m => m.id === id);
      setTeam(prev => prev.filter(member => member.id !== id));
      logActivity('DELETE', 'TEAM_MEMBER', `Deleted team member: ${deletedMember?.name}`);
      toast.success('Team member deleted successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to delete team member');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Contact Management
  const updateContactInfo = async (contactData) => {
    try {
      setLoading(true);
      const updatedContact = await adminDataService.updateContactInfo(contactData);
      setContactInfo(updatedContact);
      logActivity('UPDATE', 'CONTACT_INFO', 'Updated contact information');
      toast.success('Contact information updated successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to update contact information');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [eventsData, teamData, contactData] = await Promise.all([
          adminDataService.getEvents(),
          adminDataService.getTeam(),
          adminDataService.getContactInfo()
        ]);
        setEvents(eventsData);
        setTeam(teamData);
        setContactInfo(contactData);
      } catch (error) {
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const value = {
    // Data
    events,
    team,
    contactInfo,
    loading,
    activityLog,
    
    // Events
    addEvent,
    updateEvent,
    deleteEvent,
    reorderEvents,
    
    // Team
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    
    // Contact
    updateContactInfo
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
};
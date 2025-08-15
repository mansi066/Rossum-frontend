import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Phone, Activity, TrendingUp, Clock } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const { events, team, activityLog } = useAdminData();

  const stats = [
    {
      name: 'Total Events',
      value: events.length,
      icon: Calendar,
      color: 'bg-blue-500',
      link: '/admin/events'
    },
    {
      name: 'Team Members',
      value: team.length,
      icon: Users,
      color: 'bg-green-500',
      link: '/admin/team'
    },
    {
      name: 'Upcoming Events',
      value: events.filter(e => new Date(e.date) > new Date() && !e.archived).length,
      icon: TrendingUp,
      color: 'bg-yellow-500',
      link: '/admin/events'
    },
    {
      name: 'Recent Activities',
      value: activityLog.length,
      icon: Activity,
      color: 'bg-purple-500',
      link: '#'
    }
  ];

  const recentEvents = events
    .filter(e => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const recentActivities = activityLog.slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-gray-400">Welcome to Rossum Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.link}
            className="relative bg-gray-800 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:bg-gray-750 transition-colors duration-200"
          >
            <dt>
              <div className={`absolute ${stat.color} rounded-md p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-400 truncate">{stat.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
            </dd>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-white mb-4">
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {recentEvents.length > 0 ? (
                recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">{event.title}</p>
                      <p className="text-xs text-gray-400">
                        {format(new Date(event.date), 'MMM dd, yyyy')} at {event.time}
                      </p>
                    </div>
                    {event.featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No upcoming events</p>
              )}
            </div>
            <div className="mt-4">
              <Link
                to="/admin/events"
                className="text-sm text-red-400 hover:text-red-300 font-medium"
              >
                View all events →
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-red-400 rounded-full mt-2"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white">
                        <span className="font-medium">{activity.action}</span> {activity.type.toLowerCase()}
                      </p>
                      <p className="text-xs text-gray-400">{activity.details}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {format(new Date(activity.timestamp), 'MMM dd, HH:mm')}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/admin/events"
              className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 transition-colors duration-200"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Add New Event
            </Link>
            <Link
              to="/admin/team"
              className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 transition-colors duration-200"
            >
              <Users className="h-4 w-4 mr-2" />
              Add Team Member
            </Link>
            <Link
              to="/admin/contact"
              className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 transition-colors duration-200"
            >
              <Phone className="h-4 w-4 mr-2" />
              Update Contact Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
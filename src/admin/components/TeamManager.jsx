import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Mail, Phone } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import TeamMemberForm from './forms/TeamMemberForm';
import ConfirmDialog from './common/ConfirmDialog';

const TeamManager = () => {
  const { team, deleteTeamMember } = useAdminData();
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filter, setFilter] = useState('all');

  const departments = ['All', 'Faculty', 'Secretary', 'Joint-Secretary', 'Member-Coordinator', 'Member'];
  
  const filteredTeam = team.filter(member => 
    filter === 'all' || member.department === filter || member.role === filter
  );

  const handleEdit = (member) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (deleteConfirm) {
      await deleteTeamMember(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingMember(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Team Management</h1>
          <p className="mt-2 text-gray-400">Manage team members and their information</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setFilter(dept === 'All' ? 'all' : dept)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              filter === (dept === 'All' ? 'all' : dept)
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Team Grid */}
      <div className="bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {filteredTeam.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-300">No team members</h3>
              <p className="mt-1 text-sm text-gray-400">
                Get started by adding a new team member.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team Member
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTeam.map((member) => (
                <div key={member.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-650 transition-colors duration-200">
                  <div className="text-center">
                    <div className="relative">
                      <img
                        src={member.url || '/api/placeholder/100/100'}
                        alt={member.name}
                        className="w-20 h-20 rounded-full mx-auto object-cover"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/100/100';
                        }}
                      />
                      <div className="absolute top-0 right-0 flex space-x-1">
                        <button
                          onClick={() => handleEdit(member)}
                          className="p-1 bg-gray-600 rounded-full text-gray-300 hover:text-white hover:bg-gray-500 transition-colors duration-200"
                        >
                          <Edit className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(member)}
                          className="p-1 bg-gray-600 rounded-full text-gray-300 hover:text-red-400 hover:bg-gray-500 transition-colors duration-200"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <h3 className="mt-3 text-lg font-medium text-white">{member.name}</h3>
                    <p className="text-sm text-gray-400">{member.role}</p>
                    {member.department && member.department !== member.role && (
                      <p className="text-xs text-gray-500">{member.department}</p>
                    )}
                    
                    {member.bio && (
                      <p className="mt-2 text-xs text-gray-400 line-clamp-2">{member.bio}</p>
                    )}
                    
                    <div className="mt-3 space-y-1">
                      {member.email && (
                        <div className="flex items-center justify-center text-xs text-gray-400">
                          <Mail className="h-3 w-3 mr-1" />
                          <a href={`mailto:${member.email}`} className="hover:text-red-400 truncate">
                            {member.email}
                          </a>
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center justify-center text-xs text-gray-400">
                          <Phone className="h-3 w-3 mr-1" />
                          <a href={`tel:${member.phone}`} className="hover:text-red-400">
                            {member.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Team Member Form Modal */}
      {showForm && (
        <TeamMemberForm
          member={editingMember}
          onClose={handleCloseForm}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <ConfirmDialog
          title="Delete Team Member"
          message={`Are you sure you want to delete "${deleteConfirm.name}"? This action cannot be undone.`}
          confirmText="Delete"
          onConfirm={handleDelete}
          onCancel={() => setDeleteConfirm(null)}
          type="danger"
        />
      )}
    </div>
  );
};

export default TeamManager;
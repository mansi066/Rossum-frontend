import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AdminDataProvider } from './context/AdminDataContext';
import AdminLayout from './components/AdminLayout';

function AdminApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDataProvider>
        <AdminLayout />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </AdminDataProvider>
    </div>
  );
}

export default AdminApp;
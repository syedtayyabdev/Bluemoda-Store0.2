import React, { useState } from 'react';
import { ChevronLeft, Bell, Lock, User, Mail, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="p-6 sticky top-0 bg-background/80 backdrop-blur-md z-10 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="px-6 space-y-6">
        {/* Profile Info Form */}
        <section>
          <h3 className="font-bold text-text-main mb-3">Profile Information</h3>
          <div className="bg-white p-5 rounded-3xl shadow-sm space-y-4">
            <div>
              <label className="block text-xs text-text-muted mb-1 ml-1">Full Name</label>
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <User size={18} className="text-text-muted" />
                <input 
                  type="text" 
                  defaultValue={user?.name || "Guest"} 
                  className="bg-transparent w-full outline-none text-sm font-medium"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1 ml-1">Email Address</label>
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <Mail size={18} className="text-text-muted" />
                <input 
                  type="email" 
                  defaultValue={user?.email || "guest@example.com"} 
                  className="bg-transparent w-full outline-none text-sm font-medium"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h3 className="font-bold text-text-main mb-3">Preferences</h3>
          <div className="bg-white p-5 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                  <Bell size={20} />
                </div>
                <span className="font-medium text-sm">Push Notifications</span>
              </div>
              <div 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${notifications ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notifications ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
            </div>
            
            <div className="h-px bg-gray-50"></div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                  <Lock size={20} />
                </div>
                <span className="font-medium text-sm">Change Password</span>
              </div>
              <ChevronLeft size={18} className="rotate-180 text-gray-300" />
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-40 max-w-md mx-auto md:max-w-lg lg:max-w-xl">
        <button 
            onClick={() => navigate('/profile')}
            className="w-full bg-primary text-white font-bold py-4 rounded-full shadow-lg shadow-blue-500/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
            <Save size={18} />
            Save Changes
        </button>
      </div>
    </div>
  );
};
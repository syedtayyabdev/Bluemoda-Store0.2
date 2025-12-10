import React from 'react';
import { ChevronLeft, Package, Tag, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'order',
    title: 'Order Shipped',
    message: 'Your order #12345 has been shipped and is on its way!',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'promo',
    title: 'Summer Sale',
    message: 'Get 30% off on all swimwear this weekend only.',
    time: '1 day ago',
    read: true,
  },
  {
    id: 3,
    type: 'info',
    title: 'Account Update',
    message: 'Your password was successfully changed.',
    time: '2 days ago',
    read: true,
  },
];

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <Package size={20} className="text-blue-500" />;
      case 'promo': return <Tag size={20} className="text-yellow-500" />;
      case 'info': return <Info size={20} className="text-gray-500" />;
      default: return <Info size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="p-6 sticky top-0 bg-background/80 backdrop-blur-md z-10 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Notifications</h1>
      </div>

      <div className="px-6 space-y-4">
        {MOCK_NOTIFICATIONS.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted">No new notifications.</p>
          </div>
        ) : (
          MOCK_NOTIFICATIONS.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-3xl flex gap-4 shadow-sm transition-shadow hover:shadow-md ${notif.read ? 'bg-white' : 'bg-blue-50 border border-blue-100'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notif.read ? 'bg-gray-50' : 'bg-white'}`}>
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-sm ${notif.read ? 'text-text-main' : 'text-primary'}`}>{notif.title}</h3>
                  <span className="text-[10px] text-text-muted">{notif.time}</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">{notif.message}</p>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
import React from 'react';
import { useStore } from '../store/useStore';
import { ChevronLeft, Package, Clock, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OrdersPage: React.FC = () => {
  const orders = useStore(state => state.orders);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-12">
       {/* Desktop Header */}
       <div className="hidden md:block border-b border-gray-200 bg-white mb-8">
        <div className="max-w-screen-xl mx-auto px-8 py-6">
           <div className="flex items-center gap-2 mb-4 text-sm text-text-muted">
             <span onClick={() => navigate('/profile')} className="cursor-pointer hover:underline">Your Account</span>
             <span>›</span>
             <span className="text-primary font-bold">Your Orders</span>
           </div>
           <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Your Orders</h1>
              <div className="relative">
                 <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                 <input type="text" placeholder="Search all orders" className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none w-64" />
                 <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold ml-2">Search Orders</button>
              </div>
           </div>
        </div>
      </div>

      <div className="p-6 sticky top-0 bg-background/80 backdrop-blur-md z-10 flex items-center gap-4 md:hidden">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">My Orders</h1>
      </div>

      <div className="px-6 md:px-8 max-w-screen-xl mx-auto space-y-4 md:space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-bold text-text-main">No orders yet</h2>
            <p className="text-text-muted mb-6">Looks like you haven't placed any orders yet.</p>
            <button onClick={() => navigate('/')} className="bg-primary text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-blue-500/20">Start Shopping</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
             {orders.map((order) => (
                <div key={order.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-3">
                    <div>
                      <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Order Placed</p>
                      <p className="text-sm font-medium">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Total</p>
                       <p className="text-sm font-bold">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6 flex-1">
                    <div className="flex items-center justify-between">
                       <span className={`text-xs font-bold px-2 py-1 rounded-full ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-primary'}`}>
                         {order.status}
                       </span>
                       <span className="text-xs text-text-muted font-mono">#{order.id}</span>
                    </div>

                    <div className="space-y-3">
                        {order.items.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex gap-3">
                            <div className="relative">
                                <img src={item.image} className="w-12 h-12 rounded-lg object-cover bg-gray-50 border border-gray-100" />
                                <span className="absolute -bottom-1 -right-1 bg-gray-800 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{item.quantity}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-text-main line-clamp-1">{item.title}</p>
                                <p className="text-xs text-text-muted truncate">Size: {item.selectedSize}</p>
                            </div>
                        </div>
                        ))}
                        {order.items.length > 3 && (
                            <p className="text-xs text-text-muted italic">+ {order.items.length - 3} more items</p>
                        )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                     <button className="py-2 rounded-xl border border-gray-200 text-sm font-bold text-text-main hover:bg-gray-50 transition-colors">
                       View Details
                     </button>
                     <button className="py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors shadow-sm">
                       Track Package
                     </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Eye,
  Download,
  Star,
  RotateCcw
} from 'lucide-react';

const Orders = () => {
  const [selectedTab, setSelectedTab] = useState('all');

  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 45.97,
      items: [
        {
          id: 1,
          name: 'Organic Avocados',
          image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          quantity: 2,
          price: 4.99
        },
        {
          id: 2,
          name: 'Fresh Organic Spinach',
          image: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          quantity: 1,
          price: 3.49
        }
      ],
      tracking: 'TRK123456789',
      deliveryDate: '2024-01-18'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-20',
      status: 'shipped',
      total: 32.48,
      items: [
        {
          id: 3,
          name: 'Premium Honey',
          image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          quantity: 1,
          price: 12.99
        }
      ],
      tracking: 'TRK987654321',
      estimatedDelivery: '2024-01-23'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-22',
      status: 'processing',
      total: 28.97,
      items: [
        {
          id: 4,
          name: 'Artisan Sourdough Bread',
          image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          quantity: 2,
          price: 5.99
        }
      ]
    }
  ];

  const tabs = [
    { id: 'all', name: 'All Orders', count: orders.length },
    { id: 'processing', name: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { id: 'shipped', name: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'delivered', name: 'Delivered', count: orders.filter(o => o.status === 'delivered').length }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = selectedTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedTab);

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Orders
          </h1>
          <p className="text-gray-600">
            Track and manage your orders
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-1 font-medium text-sm transition-colors relative ${
                    selectedTab === tab.id
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.name} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold text-gray-900">
                        ${order.total.toFixed(2)}
                      </span>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-600 hover:text-green-600 border border-gray-300 rounded-lg hover:border-green-300 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        {order.status === 'delivered' && (
                          <button className="p-2 text-gray-600 hover:text-green-600 border border-gray-300 rounded-lg hover:border-green-300 transition-colors">
                            <Download className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="text-sm text-gray-600">
                        {order.tracking && (
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            <span>Tracking: {order.tracking}</span>
                          </div>
                        )}
                        {order.estimatedDelivery && (
                          <div className="flex items-center gap-2 mt-1">
                            <Truck className="h-4 w-4" />
                            <span>Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                          </div>
                        )}
                        {order.deliveryDate && (
                          <div className="flex items-center gap-2 mt-1">
                            <CheckCircle className="h-4 w-4" />
                            <span>Delivered on: {new Date(order.deliveryDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {order.status === 'delivered' && (
                          <>
                            <button className="flex items-center gap-2 px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
                              <Star className="h-4 w-4" />
                              Review
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                              <RotateCcw className="h-4 w-4" />
                              Return
                            </button>
                          </>
                        )}
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                          Reorder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <Package className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders in this category yet.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Start Shopping
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
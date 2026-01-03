"use client";

import React, { useEffect, useState } from 'react';
import { Eye, Loader2 } from "lucide-react";
import { getUserOrders } from "@/src/service/userApi";
import { OrderData } from "@/src/types/user.types";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserOrders();
      setOrders(response.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (orderId: number) => {
    router.push(`/account/orders/${orderId}`);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-green-700" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchOrders}
          className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-2 border-gray-300 rounded-full">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 first:rounded-l-full last:rounded-r-full">SL</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Total</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Payment</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Invoice</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 first:rounded-l-full last:rounded-r-full">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={order.id} className="border-b border-gray-200 last:border-0">
                  <td className="px-6 py-4 text-sm text-gray-700">#{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatDate(order.order_date)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.currency} {order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.payment_method}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.invoice_no}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                      }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <button
                      onClick={() => handleViewOrder(order.id)}
                      className="hover:text-green-600 transition-colors"
                      title="View Order Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
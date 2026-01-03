"use client";

import React, { useState } from 'react';
import { Eye, Loader2, Package } from "lucide-react";
import { trackOrder } from "@/src/service/userApi";
import { OrderData } from "@/src/types/user.types";
import { useRouter } from "next/navigation";

export default function TrackOrdersPage() {
    const [invoiceCode, setInvoiceCode] = useState('');
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searched, setSearched] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!invoiceCode.trim()) return;

        try {
            setLoading(true);
            setError(null);
            setSearched(true);
            const response = await trackOrder(invoiceCode.trim());

            const responseData = response.data;
            if (Array.isArray(responseData)) {
                setOrders(responseData);
            } else if (responseData) {
                setOrders([responseData]);
            } else {
                setOrders([]);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to track order");
            setOrders([]);
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

    const getOrderStatusSteps = (order: OrderData) => {
        const steps = [
            { label: "Order pending", date: order.order_date, completed: true },
            { label: "Order confirm", date: order.confirmed_date, completed: !!order.confirmed_date },
            { label: "Order processing", date: order.processing_date, completed: !!order.processing_date },
            { label: "Ready for pickup", date: order.picked_date, completed: !!order.picked_date },
        ];
        return steps;
    };

    return (
        <div className="space-y-8">
            {/* Search Form */}
            <div className="max-w-2xl mx-auto py-12 px-4">
                <div className="text-center space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Track your Orders</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="text-left">
                            <label htmlFor="invoiceCode" className="block text-sm font-medium text-gray-700 mb-2">
                                Invoice code*
                            </label>
                            <input
                                type="text"
                                id="invoiceCode"
                                name="invoiceCode"
                                value={invoiceCode}
                                onChange={(e) => setInvoiceCode(e.target.value)}
                                placeholder="Track your order by invoice number"
                                className="w-full px-4 py-3 border-2 text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-700 text-white font-medium px-8 py-3 rounded-full hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Searching...
                                </>
                            ) : (
                                'Find Order'
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Results Section */}
            {searched && (
                <div className="space-y-6">
                    {error ? (
                        <div className="text-center py-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                                <Package className="w-8 h-8 text-red-600" />
                            </div>
                            <p className="text-red-600 text-lg">{error}</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                <Package className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-lg">No orders found</p>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-xl font-semibold text-gray-900">
                                Found {orders.length} order{orders.length > 1 ? 's' : ''}
                            </h3>

                            {/* Orders Table */}
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
                                        {orders.map((order, index) => (
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
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Order Status Timeline for each order */}
                            <div className="space-y-6 mt-8">
                                {orders.map((order) => {
                                    const statusSteps = getOrderStatusSteps(order);
                                    return (
                                        <div key={order.id} className="bg-white rounded-lg border text-gray-900 border-gray-200 p-6">
                                            <h3 className="text-lg font-semibold mb-6">
                                                Order ID: {order.invoice_no}
                                            </h3>
                                            <div className="relative">
                                                {/* Progress Line */}
                                                <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200">
                                                    <div
                                                        className="h-full bg-green-600 transition-all duration-500"
                                                        style={{
                                                            width: `${(statusSteps.filter(s => s.completed).length / statusSteps.length) * 100}%`
                                                        }}
                                                    />
                                                </div>

                                                {/* Status Steps */}
                                                <div className="relative flex justify-between">
                                                    {statusSteps.map((step, index) => (
                                                        <div key={index} className="flex flex-col items-center" style={{ width: `${100 / statusSteps.length}%` }}>
                                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 z-10 ${step.completed
                                                                ? 'bg-green-600 text-white'
                                                                : 'bg-gray-200 text-gray-400'
                                                                }`}>
                                                                {step.completed ? (
                                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                ) : (
                                                                    <Package className="w-6 h-6" />
                                                                )}
                                                            </div>
                                                            <p className="text-sm font-medium text-center">{step.label}</p>
                                                            {step.date && (
                                                                <p className="text-xs text-gray-500 text-center mt-1">
                                                                    {formatDate(step.date)}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
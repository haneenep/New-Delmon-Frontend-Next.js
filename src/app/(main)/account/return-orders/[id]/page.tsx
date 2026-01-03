"use client";

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Loader2, Package } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { OrderDetailsData } from '@/src/types/user.types';
import { getOrderDetails } from '@/src/service/userApi';

export default function ReturnOrderDetailsPage() {
    const [orderDetails, setOrderDetails] = useState<OrderDetailsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const params = useParams();
    const orderId = params.id as string;

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getOrderDetails(Number(orderId));
            setOrderDetails(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch return order details");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-green-700" />
            </div>
        );
    }

    if (error || !orderDetails) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error || "Return order not found"}</p>
                <button
                    onClick={() => router.push('/account/return-orders')}
                    className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors"
                >
                    Back to Return Orders
                </button>
            </div>
        );
    }

    const { order, items } = orderDetails;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => router.push('/account/return-orders')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Return Order Details</h1>
            </div>

            {/* Order ID and Basic Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Order ID:</p>
                        <p className="font-semibold text-gray-900">{order.invoice_no}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Return Date:</p>
                        <p className="font-semibold text-gray-900">{formatDate(order.return_date)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Payment Method:</p>
                        <p className="font-semibold text-gray-900">{order.payment_method}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Total Amount:</p>
                        <p className="font-semibold text-gray-900">{order.currency} {order.amount.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            {/* Return Reason */}
            {order.return_reason && (
                <div className="bg-red-50 rounded-lg border border-red-200 p-6">
                    <h2 className="text-lg font-semibold mb-2 text-red-900">Return Reason</h2>
                    <p className="text-red-800">{order.return_reason}</p>
                </div>
            )}

            {/* Shipping Address */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                <div className="text-gray-700 space-y-1">
                    <p className="font-medium">{order.name}</p>
                    <p>{order.address}</p>
                    <p>{order.state?.state_name}, {order.district?.district_name}</p>
                    <p>Post Code: {order.post_code}</p>
                    <p>Phone: {order.phone}</p>
                    <p>Email: {order.email}</p>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4">Returned Items</h2>
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                            <div className="relative w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                {item.product?.product_thambnail ? (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}/${item.product.product_thambnail}`}
                                        alt={item.product?.product_name || "Product"}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Package className="w-8 h-8 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900">{item.product?.product_name || 'Product'}</h3>
                                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                                    {item.color && <p>Color: <span className="font-medium">{item.color}</span></p>}
                                    {item.size && <p>Size: <span className="font-medium">{item.size}</span></p>}
                                    <p>Qty: <span className="font-medium">{item.qty}</span></p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">{order.currency} {item.subtotal.toFixed(2)}</p>
                                <p className="text-sm text-gray-500 mt-1">{order.currency} {item.price.toFixed(2)} each</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-2 max-w-xs ml-auto">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium">{order.currency} {(order.amount - order.tax - order.shipping + order.coupon_amount).toFixed(2)}</span>
                        </div>
                        {order.tax > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tax:</span>
                                <span className="font-medium">{order.currency} {order.tax.toFixed(2)}</span>
                            </div>
                        )}
                        {order.shipping > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping:</span>
                                <span className="font-medium">{order.currency} {order.shipping.toFixed(2)}</span>
                            </div>
                        )}
                        {order.coupon_amount > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                                <span>Discount:</span>
                                <span className="font-medium">-{order.currency} {order.coupon_amount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                            <span>Total Refund:</span>
                            <span>{order.currency} {order.amount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-center pt-4">
                <button
                    onClick={() => router.push('/account/return-orders')}
                    className="bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 transition-colors flex items-center gap-2"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to return orders
                </button>
            </div>
        </div>
    );
}

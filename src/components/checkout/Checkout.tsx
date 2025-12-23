"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Loader2 } from "lucide-react";

// Mock data - replace with your actual Redux selectors
const mockCartItems = [
  {
    id: 1,
    name: "Adidas School bags",
    img: "product1.jpg",
    size: "Medium",
    color: "Yellow",
    price: 57,
    qty: 1,
    total: 57
  },
  {
    id: 2,
    name: "Adidas School bags",
    img: "product2.jpg",
    size: "Medium",
    color: "Yellow",
    price: 57,
    qty: 1,
    total: 57
  },
  {
    id: 3,
    name: "Adidas School bags",
    img: "product3.jpg",
    size: "Medium",
    color: "Yellow",
    price: 57,
    qty: 1,
    total: 57
  }
];

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    division: "",
    state: "",
    district: "",
    zipCode: "",
    additionalAddress: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("TAP");
  const [loading, setLoading] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const taxRate = 0.05; // 5%
  const tax = subtotal * taxRate;
  const shipping = 67;
  const grandTotal = subtotal + tax + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return {
          ...item,
          qty: newQty,
          total: item.price * newQty
        };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handlePlaceOrder = async () => {
    // Add your order placement logic here
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Order placed successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <span>Delmon</span>
          <span className="mx-2">›</span>
          <span>Home</span>
          <span className="mx-2">›</span>
          <span>Cart</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Check Out</span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Check Out</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Cart Items & Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded"></div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div>
                          <span className="font-medium">Size</span>
                          <p className="text-gray-900">{item.size}</p>
                        </div>
                        <div>
                          <span className="font-medium">Color</span>
                          <p className="text-gray-900">{item.color}</p>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-md h-8">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-full hover:bg-gray-50 flex items-center justify-center text-gray-600 disabled:opacity-50"
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-full hover:bg-gray-50 flex items-center justify-center text-gray-600"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="w-20 text-right font-semibold text-gray-900">
                      AED {item.total}
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors text-gray-400"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Form */}
            <div className="bg-white rounded-lg border-2 border-blue-500 p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address *"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    required
                  />
                </div>
                
                <div>
                  <select
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white"
                  >
                    <option value="">Division</option>
                    <option value="dubai">Dubai</option>
                    <option value="abudhabi">Abu Dhabi</option>
                    <option value="sharjah">Sharjah</option>
                  </select>
                </div>
                
                <div>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white"
                  >
                    <option value="">State</option>
                    <option value="state1">State 1</option>
                    <option value="state2">State 2</option>
                  </select>
                </div>
                
                <div>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white"
                  >
                    <option value="">District</option>
                    <option value="district1">District 1</option>
                    <option value="district2">District 2</option>
                  </select>
                </div>
                
                <div>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <textarea
                    name="additionalAddress"
                    placeholder="Additional Address *"
                    value={formData.additionalAddress}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Payment</h2>
              
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="TAP"
                    checked={paymentMethod === "TAP"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-900 font-medium">TAP</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash On Delivery"
                    checked={paymentMethod === "Cash On Delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-900 font-medium">Cash On Delivery</span>
                </label>
              </div>

              {/* Payment Icons */}
              <div className="flex items-center gap-4">
                <div className="text-blue-600 font-bold text-xl">PayPal</div>
                <div className="text-teal-500 font-bold text-xl">zapper</div>
                <div className="text-blue-900 font-bold text-xl">VISA</div>
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded-full bg-red-500"></div>
                  <div className="w-6 h-6 rounded-full bg-orange-500 -ml-2"></div>
                </div>
              </div>

              {/* Place Order Button - Mobile */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="lg:hidden w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 rounded-lg p-6 sticky top-8">
              <div className="space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>Sub Total</span>
                  <span className="font-semibold">AED {subtotal}</span>
                </div>
                
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span className="font-semibold">{(taxRate * 100).toFixed(0)}%</span>
                </div>
                
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">AED {shipping}</span>
                </div>
                
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Grand Total</span>
                    <span>AED {grandTotal}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button - Desktop */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="hidden lg:flex w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
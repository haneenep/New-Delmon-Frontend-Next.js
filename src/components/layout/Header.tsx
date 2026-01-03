"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Scale,
  Heart,
  User,
  ShoppingCart,
  ChevronDown,
  Phone,
  Menu,
  X,
  LogIn,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { homeApi } from "@/src/service/homeApi";
import { useAppSelector, useAppDispatch } from "@/src/hooks/useRedux";
import { RootState } from "@/src/redux/store";
import { logout } from "@/src/redux/auth/authSlice";

interface Category {
  id: number;
  main_category_name: string;
  main_category_slug: string;
  main_category_image?: string;
  created_at: string;
  updated_at?: string;
  main_category_title: string;
  main_category_desc: string;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((state: RootState) => state.wishlist);
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { token } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const res = await homeApi.getCategories("main-category", 8);
        if (res.success && res.data) {
          setCategories(res.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchMainCategories();
  }, []);

  console.log("main categoryies:", categories);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };


  return (
    <header className="w-full">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between py-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>

            <div onClick={() => router.push('/')} className="flex-shrink-0">
              <div className="w-32 h-10 bg-white rounded-md flex items-center justify-center">
                <Image
                  src="/delmon-logo-only.png"
                  alt="Delmon"
                  width={170}
                  height={60}
                  priority
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>
              <Link href="/cart" className="relative p-2">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <span className="absolute top-0 right-0 bg-green-700 text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                  {cart?.cart_count || 0}
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className="lg:hidden pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search For Products"
                  className="w-full h-10 px-4 pr-10 bg-white border border-gray-300 rounded-md text-sm placeholder-gray-400"
                />
                <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center">
                  <Search className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          )}

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between py-4 gap-4">
            {/* Logo with Border */}
            <div className="flex-shrink-0">
              <div onClick={() => router.push('/')} className="rounded-lg p-2 cursor-pointer">
                <Image
                  src="/delmon-logo-only.png"
                  alt="Delmon"
                  width={120}
                  height={40}
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Phone Info */}
            <div className="hidden xl:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-semibold text-sm leading-tight">
                  +971 42 88 1400
                </span>
                <span className="text-gray-500 text-xs leading-tight">
                  24/7 Support Center
                </span>
              </div>
            </div>

            {/* Search Bar - Centered */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search For Products"
                  className="w-full h-11 px-5 pr-12 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                />
                <button className="absolute right-0 top-0 h-11 w-11 flex items-center justify-center">
                  <Search className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3 xl:gap-5">

              <Link href="/contract/request" className="hidden xl:flex flex-col items-center gap-1 text-gray-700 hover:text-green-700 min-w-[50px]">
                <Scale className="w-5 h-5" />
                <span className="text-[11px] font-medium">Contract</span>
              </Link>
              <Link href="/login?role=vendor" className="hidden xl:flex flex-col items-center gap-1 text-gray-700 hover:text-green-700 min-w-[50px]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-[11px] font-medium">Vendor</span>
              </Link>
              <Link href="/wishlist" className="flex flex-col items-center gap-1 text-gray-700 hover:text-green-700 min-w-[50px] relative">
                <div className="relative">
                  <Heart className="w-5 h-5" />
                  {wishlist && wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-700 text-white text-[9px] font-medium rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium">Wishlist</span>
              </Link>
              <Link href="/account" className="flex flex-col items-center gap-1 text-gray-700 hover:text-green-700 min-w-[50px]">
                <User className="w-5 h-5" />
                <span className="text-[11px] font-medium">Account</span>
              </Link>
              <Link href="/cart" className="flex flex-col items-center gap-1 text-gray-700 hover:text-green-700 relative min-w-[50px]">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-green-700 text-white text-[9px] font-medium rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {cart?.cart_count || 0}
                  </span>
                </div>
                <span className="text-[11px] font-medium">Cart</span>
              </Link>
              {token ? (
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center gap-1 text-gray-700 hover:text-green-700 min-w-[50px]"
                >
                  <LogIn className="w-5 h-5 rotate-180" />
                  <span className="text-[11px] font-medium">Logout</span>
                </button>
              ) : (
                <Link href="/login" className="flex flex-col items-center gap-1 text-gray-700 hover:text-green-700 min-w-[50px]">
                  <LogIn className="w-5 h-5" />
                  <span className="text-[11px] font-medium">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-[#0d6838]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-center flex-wrap">
            {/* View All Categories Button */}
            <button
              onClick={() => router.push('/all-categories')}
              className="flex items-center gap-1.5 text-white px-3 xl:px-4 py-3.5 text-[13px] font-semibold tracking-wide hover:bg-green-800 whitespace-nowrap border-r border-green-700"
            >
              <span>All Categories</span>
            </button>

            {/* All Brands */}
            <button
              onClick={() => router.push('/all-brands')}
              className="flex items-center gap-1.5 text-white px-3 xl:px-4 py-3.5 text-[13px] font-semibold tracking-wide hover:bg-green-800 whitespace-nowrap border-r border-green-700"
            >
              <span>All Brands</span>
            </button>

            {/* Category Links */}
            {categories.length > 0 ? (
              categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => router.push(`/main-category/${category.main_category_slug}`)}
                  className="flex items-center gap-1.5 text-white px-3 xl:px-4 py-3.5 text-[13px] font-medium tracking-wide hover:bg-green-800 whitespace-nowrap"
                >
                  <span>{category.main_category_name}</span>
                </button>
              ))
            ) : (
              <div className="text-white py-3.5 text-[13px]">Loading categories...</div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-2">
            {/* View All Categories - Mobile */}
            <button
              onClick={() => {
                router.push('/all-categories');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between py-3 text-gray-900 text-sm font-semibold border-b-2 border-green-700"
            >
              <span>All Categories</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* All Brands - mobile */}
            <button
              onClick={() => {
                router.push('/all-brands');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between py-3 text-gray-900 text-sm font-semibold border-b-2 border-green-700"
            >
              <span>All Brands</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {categories.length > 0 ? (
              categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    router.push(`/main-category/${category.main_category_slug}`);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between py-3 text-gray-900 text-sm font-medium border-b border-gray-100 last:border-0"
                >
                  <span>{category.main_category_name}</span>
                </button>
              ))
            ) : (
              <div className="py-3 text-gray-500 text-sm">Loading categories...</div>
            )}

            <div className="flex items-center gap-4 py-4 border-t border-gray-200 mt-2">
              <button className="flex items-center gap-2 text-gray-700">
                <Phone className="w-5 h-5" />
                <span className="text-sm">+971 42 88 1400</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
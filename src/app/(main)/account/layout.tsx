"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  RotateCcw,
  MapPin,
  User,
  Lock,
  LogOut
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/hooks/useRedux";
import { logout } from "@/src/redux/auth/authSlice";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";

const menu = [
  { label: "Dashboard", href: "/account", icon: LayoutDashboard },
  { label: "Orders", href: "/account/orders", icon: ShoppingBag },
  { label: "Return Orders", href: "/account/return-orders", icon: RotateCcw },
  { label: "Track Orders", href: "/account/track-orders", icon: MapPin },
  { label: "Account Details", href: "/account/details", icon: User },
  { label: "Change Password", href: "/account/change-password", icon: Lock },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname()

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <section className="bg-white">

      <div className="max-w-[1400px] mx-auto bg-white px-4 sm:px-6 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <span>Delmon</span>
          <span className="mx-2">{'>'}</span>
          <span>Home</span>
          <span className="mx-2">{'>'}</span>
          <span>User Dashboard</span>
        </div>

        <div className="grid md:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar */}
          <aside>
            <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <nav>
                {menu.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-4 px-6 py-4 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-green-700 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-4 text-base font-medium text-gray-700 hover:bg-green-100 transition-colors text-left bg-green-50"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <section className="min-h-[500px]">
            {children}
          </section>
        </div>
      </div>
                  </section>
    </ProtectedRoute>
  );
}
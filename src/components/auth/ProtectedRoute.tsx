"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { getAuthToken } from "@/src/utils/authCookies";
import Loading from "@/src/components/common/Loading";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

/**
 * ProtectedRoute Component
 * 
 * Wraps pages that require authentication.
 * If user is not logged in (no token), redirects to login page.
 * 
 * Usage:
 * ```tsx
 * <ProtectedRoute>
 *   <YourPageContent />
 * </ProtectedRoute>
 * ```
 */
export default function ProtectedRoute({
    children,
    redirectTo = "/login",
}: ProtectedRouteProps) {
    const router = useRouter();
    const { token } = useSelector((state: RootState) => state.auth);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const cookieToken = getAuthToken();
        const hasToken = Boolean(token || cookieToken);

        if (!hasToken) {
            const currentPath = window.location.pathname;
            sessionStorage.setItem("redirectAfterLogin", currentPath);

            router.replace(`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`);
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
        }

        setIsLoading(false);
    }, [token, router, redirectTo]);

    if (isLoading || isAuthenticated === null) {
        return <Loading fullScreen />;
    }

    if (!isAuthenticated) {
        return <Loading fullScreen />;
    }

    return <>{children}</>;
}

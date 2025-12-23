"use client";

import React from "react";

interface LoadingProps {
    fullScreen?: boolean;
    className?: string;
}

const Loading = ({
    fullScreen = false,
    className = ""
}: LoadingProps) => {
    const containerClasses = fullScreen
        ? "fixed inset-0 z-50"
        : className.match(/(^|\s)(h-|py-)/) ? "" : "min-h-screen";

    return (
        <div className={`flex items-center justify-center bg-white ${containerClasses} ${className}`}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
    );
};

export default Loading;

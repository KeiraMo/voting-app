/**
 * Header for the Home Page
 * app/components/HomeHeader.tsx
 */

import React from "react";

export default function HomeHeader() {
    return (
        <div className="border-4 border-purple-950 rounded-xl px-4 py-4 shadow-md flex items-center justify-center mb-8">
            <h1 className="text-4xl font-bold text-white">
                You Better Vote!
            </h1>
        </div>
        
    );
}
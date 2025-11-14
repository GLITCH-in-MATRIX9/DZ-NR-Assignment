"use client";

import React from "react";
import Link from "next/link";

export default function GlobalErrorPage({ error, reset }: { error?: Error; reset?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-4">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      {error && (
        <p className="mb-4 text-red-600">
          {error.message}
        </p>
      )}
      <button
        onClick={() => reset && reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Try Again
      </button>
      <Link href="/" className="mt-4 text-blue-600 hover:underline">
        Go to Home
      </Link>
    </div>
  );
}

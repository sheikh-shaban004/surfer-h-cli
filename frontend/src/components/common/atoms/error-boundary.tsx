"use client";

import * as React from "react";
import { Button } from "./button";
import { cn } from "@/utils";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  className?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className={cn(
            "max-w-md w-full p-6 space-y-4 text-center flex flex-col items-center justify-center",
            "border border-gray-3 rounded-md",
            this.props.className
          )}>
            <div className="mb-4 flex items-center justify-center bg-gray-2 rounded-full p-2 h-12 w-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-8"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h1 className="text-14-medium-heading text-gray-8">Oops! Something went wrong</h1>
            <p className="text-14-regular-body text-gray-6">
              We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
            </p>
            <div className="flex gap-2 mt-4">
              <Button
              variant="secondary"
                onClick={() => window.location.reload()}
              >
                Refresh page
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.location.href = '/'}
              >
                Navigate home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

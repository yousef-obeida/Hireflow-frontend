import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Optional fallback UI. If not provided, uses the default error card. */
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Global error boundary that catches unhandled render errors.
 * Displays a styled error card with a retry button.
 *
 * Usage in main.tsx or around route sections:
 * ```tsx
 * <ErrorBoundary>
 *   <RouterProvider router={router} />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f9f9ff] p-6">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-[#dde3ea] p-8 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#ffdad6] flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-[#ba1a1a]" />
            </div>
            <h2 className="text-xl font-bold text-[#111c2d] mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-[#414755] mb-4 leading-relaxed">
              An unexpected error occurred. Please try refreshing the page or contact support if
              the issue persists.
            </p>
            {this.state.error && (
              <details className="mb-4 text-left">
                <summary className="text-xs text-[#70778b] cursor-pointer hover:text-[#414755] transition-colors">
                  Error details
                </summary>
                <pre className="mt-2 p-3 bg-[#f1f3f6] rounded-lg text-xs text-[#414755] overflow-auto max-h-32 font-mono">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0058bc] text-white text-sm font-semibold rounded-xl hover:bg-[#004a9e] transition-colors shadow-sm cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

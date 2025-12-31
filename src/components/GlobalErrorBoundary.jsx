import React from "react";
import { AlertTriangle, RotateCw, Home } from "lucide-react";

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service like PostHog or Sentry here
    // console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans text-gray-800">
          <div className="glass-panel-light max-w-lg w-full p-8 rounded-3xl border border-white/40 shadow-2xl text-center relative overflow-hidden">

            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-red-100">
                <AlertTriangle size={40} className="text-red-500" />
              </div>

              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                Something went wrong
              </h1>

              <p className="text-muted-foreground mb-8 text-lg">
                We're sorry, but an unexpected error occurred. Our team has been notified.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={this.handleReload}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-transform active:scale-95 shadow-lg shadow-gray-900/20"
                >
                  <RotateCw size={18} />
                  Reload Page
                </button>

                <button
                  onClick={this.handleHome}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <Home size={18} />
                  Return Home
                </button>
              </div>

              {/* Developer Details (Optional: Can be hidden in prod) */}
               {/* <div className="mt-8 text-left bg-gray-100 p-4 rounded-lg text-xs font-mono overflow-auto max-h-32 text-red-800 border border-red-200/50">
                  {this.state.error && this.state.error.toString()}
               </div> */}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;

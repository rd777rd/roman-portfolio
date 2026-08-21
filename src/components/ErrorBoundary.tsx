import React from 'react';
import { AlertTriangle, RotateCcw, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Whole-app safety net. Without this, ANY uncaught error during render —
 * anywhere in the tree, on any device — unmounts the entire React app and
 * leaves the visitor staring at a blank dark screen with no explanation and
 * no way forward. That's the worst possible failure mode for a portfolio: a
 * hiring manager who hits it just leaves, with zero signal about what
 * happened or that it's even a bug rather than a broken link.
 *
 * This can't prevent whatever the underlying error is, but it guarantees a
 * crash is always visible and recoverable instead of silent — a reload
 * button, a direct email fallback, and (for whoever's debugging it) the
 * actual error message on screen instead of only in a console nobody's
 * looking at on a phone.
 */
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Nothing fancy to report to (no backend), but this at least keeps the
    // full stack in the console for anyone who does have devtools attached.
    console.error('[ErrorBoundary] caught render error:', error, info.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center space-y-5">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <AlertTriangle size={22} className="text-red-400" />
            </div>
            <div className="space-y-2">
              <h1 className="font-display font-bold text-lg text-zinc-100">
                Something broke loading this page
              </h1>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Sorry about that — this is a bug, not you. Reloading usually fixes it.
                If it keeps happening, email me directly and let me know what device
                and browser you're on.
              </p>
              <p className="font-mono text-[10px] text-zinc-500 break-words pt-1">
                {this.state.error.message}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-zinc-100 font-semibold text-sm rounded-xl transition-all"
              >
                <RotateCcw size={15} /> Reload
              </button>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-sm rounded-xl transition-all"
              >
                <Mail size={15} /> Email Roman
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

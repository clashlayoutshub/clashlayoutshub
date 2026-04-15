import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-black text-primary/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-brand-text mb-3">Page Not Found</h1>
        <p className="text-brand-muted mb-8">
          The base layout or page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/th14"
            className="inline-flex items-center justify-center gap-2 border border-brand-border text-brand-text font-semibold px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-colors"
          >
            <Search className="w-4 h-4" />
            Browse TH14 Bases
          </Link>
        </div>
      </div>
    </div>
  );
}

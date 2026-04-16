import Link from 'next/link';
import { Swords, Twitter } from 'lucide-react';

const TH_LEVELS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const BH_LEVELS = [5, 6, 7, 8, 9, 10];

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-text text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Swords className="w-5 h-5 text-primary-light" />
              ClashLayoutsHub
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              The #1 source for Clash of Clans base layouts. War, farming, and trophy bases with direct copy links.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://x.com/ClashLayoutsHub"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-neutral-900 hover:bg-gray-700 transition-all hover:scale-110"
                aria-label="Twitter / X"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://discord.gg/Z9jpQyKEdw"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-[#5865F2] hover:bg-gray-700 transition-all hover:scale-110"
                aria-label="Discord"
              >
                <DiscordIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* TH Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Town Hall Bases</h3>
            <div className="grid grid-cols-2 gap-1">
              {TH_LEVELS.map((level) => (
                <Link key={level} href={`/th${level}`} className="text-sm text-gray-400 hover:text-white transition-colors py-0.5">
                  TH{level} Base
                </Link>
              ))}
            </div>
          </div>

          {/* BH + Blog */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Builder Base</h3>
            <div className="space-y-1 mb-6">
              {BH_LEVELS.map((level) => (
                <Link key={level} href={`/bh${level}`} className="block text-sm text-gray-400 hover:text-white transition-colors">
                  BH{level} Base
                </Link>
              ))}
            </div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Content</h3>
            <div className="space-y-1">
              <Link href="/blog" className="block text-sm text-gray-400 hover:text-white transition-colors">Blog</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Legal & Info</h3>
            <div className="space-y-1">
              <Link href="/about" className="block text-sm text-gray-400 hover:text-white transition-colors">About Us</Link>
              <Link href="/privacy-policy" className="block text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="block text-sm text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
              <Link href="/cookie-policy" className="block text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
              <Link href="/dmca" className="block text-sm text-gray-400 hover:text-white transition-colors">DMCA</Link>
              <Link href="/contact" className="block text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ClashLayoutsHub. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            ClashLayoutsHub is not affiliated with Supercell. Clash of Clans is a trademark of Supercell.
          </p>
        </div>
      </div>
    </footer>
  );
}

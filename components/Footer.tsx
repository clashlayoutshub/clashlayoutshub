import Link from 'next/link';
import { Swords } from 'lucide-react';

const TH_LEVELS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const BH_LEVELS = [5, 6, 7, 8, 9, 10];

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
            <p className="text-sm text-gray-400 leading-relaxed">
              The #1 source for Clash of Clans base layouts. War, farming, and trophy bases with direct copy links.
            </p>
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

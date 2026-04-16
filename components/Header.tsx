'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Menu, X, Swords, Home, Shield, Hammer, BookOpen,
  Search, ChevronDown, Twitter, Info, FileText, Lock,
  Zap, Globe, Youtube,
} from 'lucide-react';

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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [thDropdown, setThDropdown] = useState(false);
  const [bhDropdown, setBhDropdown] = useState(false);
  const [moreDropdown, setMoreDropdown] = useState(false);
  const [thMobileOpen, setThMobileOpen] = useState(true);
  const [bhMobileOpen, setBhMobileOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const closeMenu = () => {
    setMobileOpen(false);
    setSearchOpen(false);
  };

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-primary hover:opacity-80 transition-opacity" aria-label="ClashLayoutsHub Home">
            <div className="p-1.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg">
              <Swords className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:block">ClashLayoutsHub</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            <Link href="/" className="px-4 py-2.5 rounded-xl text-brand-text hover:bg-blue-50 hover:text-primary text-sm font-semibold transition-all">
              Home
            </Link>

            {/* TH Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2.5 rounded-xl text-brand-text hover:bg-blue-50 hover:text-primary text-sm font-semibold transition-all flex items-center gap-1.5" aria-expanded={thDropdown} aria-haspopup="true">
                <Shield className="w-4 h-4" />
                Town Hall
                <ChevronDown className="w-3.5 h-3.5 text-brand-muted group-hover:text-primary transition-colors" />
              </button>
              <div className="absolute top-full left-0 mt-1 bg-white border border-brand-border rounded-xl shadow-xl p-3 grid grid-cols-4 gap-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" role="menu">
                {TH_LEVELS.map((level) => (
                  <Link
                    key={level}
                    href={`/th${level}`}
                    className="text-center py-2 px-2 rounded-lg text-sm font-medium text-brand-text hover:bg-blue-50 hover:text-primary transition-all"
                    role="menuitem"
                  >
                    TH{level}
                  </Link>
                ))}
              </div>
            </div>

            {/* BH Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2.5 rounded-xl text-brand-text hover:bg-blue-50 hover:text-primary text-sm font-semibold transition-all flex items-center gap-1.5" aria-expanded={bhDropdown} aria-haspopup="true">
                <Hammer className="w-4 h-4" />
                Builder Base
                <ChevronDown className="w-3.5 h-3.5 text-brand-muted group-hover:text-primary transition-colors" />
              </button>
              <div className="absolute top-full left-0 mt-1 bg-white border border-brand-border rounded-xl shadow-xl p-3 grid grid-cols-3 gap-1 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" role="menu">
                {BH_LEVELS.map((level) => (
                  <Link
                    key={level}
                    href={`/bh${level}`}
                    className="text-center py-2 px-2 rounded-lg text-sm font-medium text-brand-text hover:bg-blue-50 hover:text-primary transition-all"
                    role="menuitem"
                  >
                    BH{level}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/blog" className="px-4 py-2.5 rounded-xl text-brand-text hover:bg-blue-50 hover:text-primary text-sm font-semibold transition-all flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              Blog
            </Link>

            <Link href="/about" className="px-4 py-2.5 rounded-xl text-brand-text hover:bg-blue-50 hover:text-primary text-sm font-semibold transition-all flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              About
            </Link>

            {/* More Dropdown with Legal Links */}
            <div className="relative group">
              <button className="px-4 py-2.5 rounded-xl text-brand-text hover:bg-blue-50 hover:text-primary text-sm font-semibold transition-all flex items-center gap-1.5" aria-expanded={moreDropdown} aria-haspopup="true">
                <Globe className="w-4 h-4" />
                More
                <ChevronDown className="w-3.5 h-3.5 text-brand-muted group-hover:text-primary transition-colors" />
              </button>
              <div className="absolute top-full right-0 mt-1 bg-white border border-brand-border rounded-xl shadow-xl p-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" role="menu">
                <div className="space-y-0.5">
                  <Link
                    href="/privacy-policy"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-brand-text hover:bg-blue-50 hover:text-primary transition-all"
                    role="menuitem"
                  >
                    <Lock className="w-4 h-4 text-green-600" />
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms-and-conditions"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-brand-text hover:bg-blue-50 hover:text-primary transition-all"
                    role="menuitem"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    Terms & Conditions
                  </Link>
                  <Link
                    href="/cookie-policy"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-brand-text hover:bg-blue-50 hover:text-primary transition-all"
                    role="menuitem"
                  >
                    <Zap className="w-4 h-4 text-orange-600" />
                    Cookie Policy
                  </Link>
                  <Link
                    href="/dmca"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-brand-text hover:bg-blue-50 hover:text-primary transition-all"
                    role="menuitem"
                  >
                    <Shield className="w-4 h-4 text-red-600" />
                    DMCA
                  </Link>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={toggleSearch}
              className="p-2.5 rounded-xl text-brand-muted hover:bg-blue-50 hover:text-primary transition-all"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Desktop Search Bar ── */}
      {searchOpen && (
        <div className="hidden lg:block border-t border-brand-border bg-white px-4 py-3 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
              <input
                type="search"
                placeholder="Search bases, TH levels, blog posts…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                autoFocus
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-border bg-gray-50 text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-brand-border bg-white flex flex-col max-h-[calc(100svh-4rem)] overflow-y-auto animate-fade-in">

          {/* Search */}
          <div className="px-4 pt-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
              <input
                type="search"
                placeholder="Search bases, TH levels…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-border bg-gray-50 text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Primary nav links */}
          <nav className="px-3 pb-2 space-y-0.5">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-brand-text hover:bg-blue-50 hover:text-primary font-semibold transition-all"
            >
              <div className="p-1.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg">
                <Home className="w-4 h-4 text-white" />
              </div>
              Home
            </Link>

            {/* Town Hall accordion */}
            <button
              onClick={() => setThMobileOpen(!thMobileOpen)}
              className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-brand-text hover:bg-blue-50 hover:text-primary font-semibold transition-all"
            >
              <span className="flex items-center gap-3">
                <div className="p-1.5 bg-gradient-to-br from-red-500 to-red-600 rounded-lg">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                Town Hall
              </span>
              <ChevronDown className={`w-4 h-4 text-brand-muted transition-transform duration-200 ${thMobileOpen ? 'rotate-180' : ''}`} />
            </button>
            {thMobileOpen && (
              <div className="mx-2 mb-2 p-3 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200">
                <div className="grid grid-cols-5 gap-2">
                  {TH_LEVELS.map((level) => (
                    <Link
                      key={level}
                      href={`/th${level}`}
                      onClick={closeMenu}
                      className="text-center py-2 rounded-lg text-xs font-bold text-primary border-2 border-blue-100 bg-white hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                    >
                      TH{level}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Builder Base accordion */}
            <button
              onClick={() => setBhMobileOpen(!bhMobileOpen)}
              className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-brand-text hover:bg-blue-50 hover:text-primary font-semibold transition-all"
            >
              <span className="flex items-center gap-3">
                <div className="p-1.5 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                  <Hammer className="w-4 h-4 text-white" />
                </div>
                Builder Base
              </span>
              <ChevronDown className={`w-4 h-4 text-brand-muted transition-transform duration-200 ${bhMobileOpen ? 'rotate-180' : ''}`} />
            </button>
            {bhMobileOpen && (
              <div className="mx-2 mb-2 p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="grid grid-cols-6 gap-2">
                  {BH_LEVELS.map((level) => (
                    <Link
                      key={level}
                      href={`/bh${level}`}
                      onClick={closeMenu}
                      className="text-center py-2 rounded-lg text-xs font-bold text-primary border-2 border-green-100 bg-white hover:bg-green-600 hover:text-white hover:border-green-600 transition-all shadow-sm"
                    >
                      BH{level}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/blog"
              onClick={closeMenu}
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-brand-text hover:bg-blue-50 hover:text-primary font-semibold transition-all"
            >
              <div className="p-1.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              Blog
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-brand-text hover:bg-blue-50 hover:text-primary font-semibold transition-all"
            >
              <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <Info className="w-4 h-4 text-white" />
              </div>
              About
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-brand-text hover:bg-blue-50 hover:text-primary font-semibold transition-all"
            >
              <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
                <Search className="w-4 h-4 text-white" />
              </div>
              Contact
            </Link>
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Legal Links Section */}
          <div className="px-4 pt-4 pb-3 border-t border-brand-border bg-gradient-to-br from-gray-50 to-blue-50">
            <h3 className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-3 px-2">Legal</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/privacy-policy"
                onClick={closeMenu}
                className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm text-brand-text hover:bg-white hover:shadow-sm transition-all"
              >
                <Lock className="w-4 h-4 text-green-600" />
                Privacy
              </Link>
              <Link
                href="/terms-and-conditions"
                onClick={closeMenu}
                className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm text-brand-text hover:bg-white hover:shadow-sm transition-all"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                Terms
              </Link>
              <Link
                href="/cookie-policy"
                onClick={closeMenu}
                className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm text-brand-text hover:bg-white hover:shadow-sm transition-all"
              >
                <Zap className="w-4 h-4 text-orange-600" />
                Cookies
              </Link>
              <Link
                href="/dmca"
                onClick={closeMenu}
                className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm text-brand-text hover:bg-white hover:shadow-sm transition-all"
              >
                <Shield className="w-4 h-4 text-red-600" />
                DMCA
              </Link>
            </div>
          </div>

          {/* Social icons */}
          <div className="px-4 pb-6 pt-3">
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://x.com/ClashLayoutsHub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="p-3 rounded-xl border-2 border-brand-border text-brand-muted hover:border-neutral-800 hover:text-neutral-900 hover:bg-gray-100 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://discord.gg/Z9jpQyKEdw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="p-3 rounded-xl border-2 border-brand-border text-brand-muted hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
              >
                <DiscordIcon className="w-5 h-5" />
              </a>
            </div>
            <p className="text-center text-xs text-brand-muted mt-3">Follow us for updates</p>
          </div>
        </div>
      )}
    </header>
  );
}

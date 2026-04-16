'use client';

import { useState } from 'react';
import { Share2, Facebook, MessageCircle, Copy, Check } from 'lucide-react';

interface ShareButtonProps {
  url: string;
  title: string;
  description: string;
}

export default function ShareButton({ url, title, description }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showFallbacks, setShowFallbacks] = useState(false);

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        // User cancelled or error, show fallbacks
        setShowFallbacks(true);
      }
    } else {
      setShowFallbacks(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${description} ${url}`)}`,
    discord: `https://discord.com/channels/@me?message=${encodeURIComponent(`${title} - ${description} ${url}`)}`,
  };

  return (
    <div className="relative">
      {!showFallbacks ? (
        <button
          onClick={handleWebShare}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
        >
          <Share2 className="w-5 h-5" />
          Share Base
        </button>
      ) : (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleWebShare}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <a
            href={shareUrls.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1877F2] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#0a5dc2] transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm"
          >
            <Facebook className="w-4 h-4" />
            Facebook
          </a>
          <a
            href={shareUrls.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#128C7E] transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      )}
    </div>
  );
}

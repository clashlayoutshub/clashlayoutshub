'use client';

import { useState } from 'react';
import { Shield, Hammer } from 'lucide-react';

interface CategoryToggleProps {
  onTypeChange: (type: 'all' | 'th' | 'bh') => void;
  currentType: 'all' | 'th' | 'bh';
}

export default function CategoryToggle({ onTypeChange, currentType }: CategoryToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-brand-card rounded-xl p-1 border border-brand-border">
      <button
        onClick={() => onTypeChange('all')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
          currentType === 'all'
            ? 'bg-primary text-white shadow-md'
            : 'text-brand-muted hover:text-brand-text hover:bg-gray-100'
        }`}
      >
        All Bases
      </button>
      <button
        onClick={() => onTypeChange('th')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
          currentType === 'th'
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-brand-muted hover:text-brand-text hover:bg-gray-100'
        }`}
      >
        <Shield className="w-4 h-4" />
        Town Hall
      </button>
      <button
        onClick={() => onTypeChange('bh')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
          currentType === 'bh'
            ? 'bg-green-600 text-white shadow-md'
            : 'text-brand-muted hover:text-brand-text hover:bg-gray-100'
        }`}
      >
        <Hammer className="w-4 h-4" />
        Builder Base
      </button>
    </div>
  );
}

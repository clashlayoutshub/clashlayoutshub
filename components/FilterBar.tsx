'use client';

import type { ElementType } from 'react';
import { Shield, Wheat, Trophy, LayoutGrid } from 'lucide-react';
import type { BaseCategory } from '@/lib/types';

interface FilterBarProps {
  active: BaseCategory | 'all';
  onChange: (cat: BaseCategory | 'all') => void;
}

const filters: { value: BaseCategory | 'all'; label: string; icon: ElementType }[] = [
  { value: 'all', label: 'All Bases', icon: LayoutGrid },
  { value: 'war', label: 'War Base', icon: Shield },
  { value: 'farming', label: 'Farming', icon: Wheat },
  { value: 'trophy', label: 'Trophy', icon: Trophy },
];

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            active === value
              ? 'bg-primary text-white shadow-sm'
              : 'bg-brand-card border border-brand-border text-brand-text hover:border-primary hover:text-primary'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}

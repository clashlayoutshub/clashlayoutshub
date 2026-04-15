'use client';

import { useState } from 'react';
import LayoutCard from '@/components/LayoutCard';
import FilterBar from '@/components/FilterBar';
import type { Layout, BaseCategory } from '@/lib/types';

interface LayoutsGridProps {
  layouts: Layout[];
}

export default function LayoutsGrid({ layouts }: LayoutsGridProps) {
  const [activeFilter, setActiveFilter] = useState<BaseCategory | 'all'>('all');

  const filtered =
    activeFilter === 'all'
      ? layouts
      : layouts.filter((l) => l.category === activeFilter);

  return (
    <>
      <div className="mb-8">
        <FilterBar active={activeFilter} onChange={setActiveFilter} />
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-brand-muted">
          <p className="text-xl font-semibold mb-2">No bases found</p>
          <p className="text-sm">Try selecting a different category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((layout) => (
            <LayoutCard key={layout.id} layout={layout} />
          ))}
        </div>
      )}
    </>
  );
}

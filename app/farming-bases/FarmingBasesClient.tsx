'use client';

import { useState } from 'react';
import LayoutsGrid from '@/components/LayoutsGrid';
import CategoryToggle from '@/components/CategoryToggle';

interface FarmingBasesClientProps {
  layouts: any[];
}

export default function FarmingBasesClient({ layouts }: FarmingBasesClientProps) {
  const [currentType, setCurrentType] = useState<'all' | 'th' | 'bh'>('all');

  const filteredLayouts = layouts.filter((layout) => {
    if (currentType === 'all') return true;
    return layout.type === currentType;
  });

  return (
    <>
      <CategoryToggle onTypeChange={setCurrentType} currentType={currentType} />
      <div className="mt-6">
        <LayoutsGrid layouts={filteredLayouts} />
      </div>
    </>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Shield, Wheat, Trophy } from 'lucide-react';
import type { Layout } from '@/lib/types';
import { getOptimizedImageUrl } from '@/lib/images';

const categoryConfig = {
  war: { label: 'War Base', icon: Shield, color: 'bg-red-100 text-red-700' },
  farming: { label: 'Farming Base', icon: Wheat, color: 'bg-green-100 text-green-700' },
  trophy: { label: 'Trophy Base', icon: Trophy, color: 'bg-yellow-100 text-yellow-700' },
};

interface LayoutCardProps {
  layout: Layout;
  priority?: boolean;
}

export default function LayoutCard({ layout, priority = false }: LayoutCardProps) {
  const cat = categoryConfig[layout.category];
  const Icon = cat.icon;

  return (
    <article className="bg-brand-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden group">
      <Link href={`/layout/${layout.id}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <Image
            src={getOptimizedImageUrl(layout.image)}
            alt={layout.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />
          <div className="absolute top-2 left-2">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${cat.color}`}>
              <Icon className="w-3 h-3" />
              {cat.label}
            </span>
          </div>
          <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
            {layout.type === 'th' ? 'TH' : 'BH'}{layout.level}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-brand-text text-sm leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {layout.title}
          </h3>
          <p className="text-brand-muted text-xs leading-relaxed line-clamp-2">
            {layout.description}
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Link
          href={`/layout/${layout.id}`}
          className="block w-full text-center py-2.5 px-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          View Base
        </Link>
      </div>
    </article>
  );
}

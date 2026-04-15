'use client';

interface AdUnitProps {
  slot?: string;
  format?: 'auto' | 'leaderboard' | 'rectangle' | 'horizontal' | 'vertical' | 'square';
  className?: string;
  label?: string;
  showLabel?: boolean;
}

// AdSense-friendly ad sizes
const AD_SIZES = {
  leaderboard: { width: '728px', height: '90px', mobile: '320x50' },
  rectangle: { width: '300px', height: '250px', mobile: '300x250' },
  horizontal: { width: '970px', height: '90px', mobile: '320x50' },
  vertical: { width: '160px', height: '600px', mobile: '160x600' },
  square: { width: '250px', height: '250px', mobile: '250x250' },
  auto: { width: '100%', height: 'auto', mobile: 'auto' },
};

export default function AdUnit({
  slot = '',
  format = 'auto',
  className = '',
  label = 'Advertisement',
  showLabel = true,
}: AdUnitProps) {
  const adSize = AD_SIZES[format];
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const showAds = process.env.NEXT_PUBLIC_SHOW_ADS === 'true';

  // Don't render anything if ads are disabled
  if (!showAds) {
    return null;
  }

  return (
    <div className={`ad-unit-container my-8 ${className}`} data-ad-slot={slot}>
      {showLabel && (
        <p className="text-center text-xs text-gray-400 mb-2 uppercase tracking-wider font-medium">
          {label}
        </p>
      )}
      <div
        className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center overflow-hidden relative group hover:border-gray-300 transition-colors"
        style={{
          minHeight: format === 'horizontal' || format === 'leaderboard' ? '90px' : 
                   format === 'rectangle' || format === 'square' ? '250px' : 
                   format === 'vertical' ? '600px' : '250px',
          maxWidth: format !== 'auto' ? adSize.width : '100%',
          margin: format === 'auto' ? '0 auto' : undefined,
        }}
        aria-label="Advertisement"
      >
        {/* Placeholder for actual AdSense code */}
        <div className="text-center p-4">
          <span className="text-xs text-gray-400 font-medium">
            {format === 'auto' ? 'Responsive Ad' : `${adSize.mobile}`}
          </span>
          {slot && (
            <span className="block text-[10px] text-gray-300 mt-1">
              Slot: {slot}
            </span>
          )}
        </div>
        
        {/* AdSense compliance indicator */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-blue-100 text-blue-600 text-[10px] px-2 py-1 rounded-full font-medium">
            AdSense Ready
          </div>
        </div>
      </div>
      
      {/* AdSense policy compliance note */}
      <p className="text-center text-[10px] text-gray-400 mt-2">
        We use Google AdSense to display ads. Google may use cookies to serve ads based on your prior visits to this website.
      </p>
    </div>
  );
}

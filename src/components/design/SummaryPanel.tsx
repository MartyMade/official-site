import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import DimensionDisplay from '@/components/ui/DimensionDisplay';
import { ShoppingCart } from 'lucide-react';
import type { TerrariumConfig } from '@/types';
import { presetSizes } from '@/data/configurator';

interface SummaryPanelProps {
  config: TerrariumConfig;
  totalPrice: number | null;
  currentStep: number;
  onSubmit?: () => void;
}

export default function SummaryPanel({ config, totalPrice, currentStep, onSubmit }: SummaryPanelProps) {
  const selectedSize = presetSizes.find(
    (s) => s.key === config.size.preset
  );

  const ventilationLabels: Record<string, string> = {
    'screen-top': 'Screen Top',
    'solid-top': 'Solid Top',
  };

  const doorLabels: Record<string, string> = {
    hinged: 'Hinged',
    sliding: 'Sliding',
  };

  return (
    <aside
      className={cn(
        'rounded-2xl border border-surface-700 bg-surface-800 p-6',
        'lg:sticky lg:top-24 lg:self-start'
      )}
    >
      <h3 className="text-lg font-semibold text-surface-50 mb-4">
        Your Build
      </h3>

      <dl className="space-y-4 text-sm">
        <div>
          <dt className="font-medium text-surface-400">Material</dt>
          <dd className="mt-1 text-surface-50">
            {config.material ?? (
              <span className="italic text-surface-500">Not selected</span>
            )}
          </dd>
        </div>

        <div>
          <dt className="font-medium text-surface-400">Size</dt>
          <dd className="mt-1 text-surface-50">
            {selectedSize ? (
              <>
                {selectedSize.label}
                <span className="block text-xs text-surface-400">
                  <DimensionDisplay dimensions={selectedSize.dimensions} />
                </span>
              </>
            ) : config.size.custom ? (
              <>
                Custom
                <span className="block text-xs text-surface-400">
                  <DimensionDisplay w={config.size.custom.w} d={config.size.custom.d} h={config.size.custom.h} />
                </span>
              </>
            ) : (
              <span className="italic text-surface-500">Not selected</span>
            )}
          </dd>
        </div>

        <div>
          <dt className="font-medium text-surface-400">Ventilation</dt>
          <dd className="mt-1 text-surface-50">
            {ventilationLabels[config.features.ventilation] ??
              config.features.ventilation}
          </dd>
        </div>

        <div>
          <dt className="font-medium text-surface-400">Door Style</dt>
          <dd className="mt-1 text-surface-50">
            {doorLabels[config.features.doorStyle] ??
              config.features.doorStyle}
          </dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-surface-700 pt-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium text-surface-400">
            Estimated Price
          </span>
          <span className="text-2xl font-bold text-copper-400">
            {totalPrice !== null ? formatPrice(totalPrice) : 'Quote Required'}
          </span>
        </div>
        <p className="mt-1 text-xs text-surface-500">
          Final price confirmed after inquiry review
        </p>
      </div>

      {currentStep === 4 && (
        <div className="mt-6">
          <Button
            onClick={onSubmit}
            disabled={!config.material}
            className="w-full"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Submit Inquiry
          </Button>
        </div>
      )}
    </aside>
  );
}

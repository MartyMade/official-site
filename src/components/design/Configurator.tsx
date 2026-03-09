'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import StepIndicator from '@/components/design/StepIndicator';
import SummaryPanel from '@/components/design/SummaryPanel';
import { materials } from '@/data/materials';
import {
  presetSizes,
  materialBasePrices,
  ventilationOptions,
  doorStyleOptions,
} from '@/data/configurator';
import type { Material, ProductSize, TerrariumConfig } from '@/types';
import DimensionDisplay from '@/components/ui/DimensionDisplay';
import {
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';

const STEPS = ['Material', 'Size', 'Features', 'Review'];

const defaultConfig: TerrariumConfig = {
  material: null,
  size: { preset: null },
  features: {
    ventilation: 'screen-top',
    doorStyle: 'sliding',
  },
};

export default function Configurator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<TerrariumConfig>(defaultConfig);
  const [submitted, setSubmitted] = useState(false);
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [customDimensions, setCustomDimensions] = useState({ w: 36, d: 24, h: 18 });
  const [direction, setDirection] = useState(1);
  const prevStep = useRef(currentStep);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const isCustomSize = useCustomSize || !!config.size.custom;

  const totalPrice = useMemo(() => {
    if (isCustomSize) return null;
    let price = 0;
    if (config.material) {
      price += materialBasePrices[config.material] ?? 0;
    }
    if (config.size.preset) {
      const size = presetSizes.find((s) => s.key === config.size.preset);
      if (size) price += size.basePrice;
    }
    const vent = ventilationOptions.find((v) => v.key === config.features.ventilation);
    if (vent) price += vent.price;
    const door = doorStyleOptions.find((d) => d.key === config.features.doorStyle);
    if (door) price += door.price;
    return price;
  }, [config, isCustomSize]);

  const setMaterial = useCallback((m: Material) => {
    setConfig((prev) => ({ ...prev, material: m }));
  }, []);

  const setSize = useCallback((key: ProductSize) => {
    setUseCustomSize(false);
    setConfig((prev) => ({ ...prev, size: { preset: key, custom: undefined } }));
  }, []);

  const setFeature = useCallback(
    <K extends keyof TerrariumConfig['features']>(key: K, value: TerrariumConfig['features'][K]) => {
      setConfig((prev) => ({ ...prev, features: { ...prev.features, [key]: value } }));
    },
    []
  );

  const handleSubmit = () => {
    console.log('Terrarium configuration submitted:', config);
    console.log('Total price:', totalPrice);
    setSubmitted(true);
  };

  const goNext = () => {
    setDirection(1);
    prevStep.current = currentStep;
    setCurrentStep((s) => Math.min(s + 1, 4));
  };
  const goBack = () => {
    setDirection(-1);
    prevStep.current = currentStep;
    setCurrentStep((s) => Math.max(s - 1, 1));
  };
  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    prevStep.current = currentStep;
    setCurrentStep(step);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const renderMaterialStep = () => (
    <div>
      <h3 className="text-xl font-semibold text-surface-50 mb-2">Choose Your Material</h3>
      <p className="text-surface-400 mb-6">Each material offers unique benefits for your terrarium build.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {materials.map((mat) => {
          const isSelected = config.material === mat.name;
          const basePrice = materialBasePrices[mat.name as keyof typeof materialBasePrices];
          return (
            <motion.button
              key={mat.slug}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setMaterial(mat.name as Material)}
              className={cn(
                'relative rounded-xl border-2 p-5 text-left transition-all cursor-pointer',
                'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500',
                isSelected
                  ? 'border-primary-500 bg-primary-950 shadow-md'
                  : 'border-surface-700 bg-surface-800'
              )}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-surface-50">
                  <Check className="h-4 w-4" />
                </span>
              )}
              <h4 className="text-lg font-semibold text-surface-50">{mat.name}</h4>
              <p className="mt-1 text-sm text-surface-400">{mat.tagline}</p>
              <ul className="mt-3 space-y-1">
                {mat.pros.slice(0, 3).map((pro) => (
                  <li key={pro} className="flex items-start gap-1.5 text-xs text-surface-300">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary-500" />
                    {pro}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <span className="text-sm font-medium text-surface-400">Starting at </span>
                <span className="text-lg font-bold text-copper-400">{formatPrice(basePrice)}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );

  const renderSizeStep = () => (
    <div>
      <h3 className="text-xl font-semibold text-surface-50 mb-2">Select a Size</h3>
      <p className="text-surface-400 mb-6">Pick a preset size or enter custom dimensions.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {presetSizes.map((size) => {
          const isSelected = !useCustomSize && config.size.preset === size.key;
          return (
            <motion.button
              key={size.key}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setSize(size.key as ProductSize)}
              className={cn(
                'relative rounded-xl border-2 p-5 text-left transition-all cursor-pointer',
                'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500',
                isSelected
                  ? 'border-primary-500 bg-primary-950 shadow-md'
                  : 'border-surface-700 bg-surface-800'
              )}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-surface-50">
                  <Check className="h-4 w-4" />
                </span>
              )}
              <h4 className="font-semibold text-surface-50">{size.label}</h4>
              <p className="text-sm text-surface-400"><DimensionDisplay dimensions={size.dimensions} /></p>
              <p className="mt-2 text-sm font-medium text-copper-400">
                {size.basePrice === 0 ? 'Included' : `+ ${formatPrice(size.basePrice)}`}
              </p>
            </motion.button>
          );
        })}
        {/* Custom size card */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setUseCustomSize(true);
            setConfig((prev) => ({ ...prev, size: { preset: null, custom: { ...customDimensions } } }));
          }}
          className={cn(
            'relative rounded-xl border-2 p-5 text-left transition-all cursor-pointer',
            'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500',
            useCustomSize
              ? 'border-primary-500 bg-primary-950 shadow-md'
              : 'border-surface-700 bg-surface-800'
          )}
        >
          {useCustomSize && (
            <span className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-surface-50">
              <Check className="h-4 w-4" />
            </span>
          )}
          <h4 className="font-semibold text-surface-50">Custom</h4>
          <p className="text-sm text-surface-400">Enter your own dimensions</p>
          <p className="mt-2 text-sm font-medium text-copper-400">Quote Required</p>
        </motion.button>
      </div>

      {useCustomSize && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 rounded-xl border-2 border-primary-500/30 bg-primary-950/30 p-5"
        >
          <h4 className="font-semibold text-surface-50 mb-3">Custom Dimensions</h4>
          <div className="grid grid-cols-3 gap-4">
            {(['w', 'd', 'h'] as const).map((dim) => (
              <div key={dim}>
                <label className="block text-xs font-medium text-surface-400 mb-1">
                  {dim === 'w' ? 'Width' : dim === 'd' ? 'Depth' : 'Height'} (in)
                </label>
                <input
                  type="number"
                  min={6}
                  max={120}
                  value={customDimensions[dim]}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setCustomDimensions((prev) => ({ ...prev, [dim]: val }));
                    setConfig((prev) => ({ ...prev, size: { preset: null, custom: { ...customDimensions, [dim]: val } } }));
                  }}
                  className="w-full rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-surface-50 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:shadow-[0_0_0_4px_rgba(74,133,37,0.1)] transition-all"
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-surface-400">
            <DimensionDisplay w={customDimensions.w} d={customDimensions.d} h={customDimensions.h} />
          </p>
        </motion.div>
      )}
    </div>
  );

  const renderFeaturesStep = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-surface-50 mb-2">Ventilation</h3>
        <p className="text-surface-400 mb-4">Choose the top style for your enclosure.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {ventilationOptions.map((opt) => {
            const isSelected = config.features.ventilation === opt.key;
            return (
              <motion.button
                key={opt.key}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setFeature('ventilation', opt.key as TerrariumConfig['features']['ventilation'])}
                className={cn(
                  'rounded-xl border-2 p-4 text-left transition-all cursor-pointer',
                  'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500',
                  isSelected ? 'border-primary-500 bg-primary-950' : 'border-surface-700 bg-surface-800'
                )}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-surface-50">{opt.label}</h4>
                  <div
                    className={cn(
                      'h-4 w-4 rounded-full border-2',
                      isSelected ? 'border-primary-500 bg-primary-500' : 'border-surface-600'
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3 text-surface-50" />}
                  </div>
                </div>
                <p className="mt-1 text-xs text-surface-400">{opt.description}</p>
                <p className="mt-2 text-sm font-medium text-copper-400">
                  {opt.price === 0 ? 'Included' : `+ ${formatPrice(opt.price)}`}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-surface-50 mb-2">Door Style</h3>
        <p className="text-surface-400 mb-4">How would you like to access your terrarium?</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {doorStyleOptions.map((opt) => {
            const isSelected = config.features.doorStyle === opt.key;
            return (
              <motion.button
                key={opt.key}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setFeature('doorStyle', opt.key as TerrariumConfig['features']['doorStyle'])}
                className={cn(
                  'rounded-xl border-2 p-4 text-left transition-all cursor-pointer',
                  'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500',
                  isSelected ? 'border-primary-500 bg-primary-950' : 'border-surface-700 bg-surface-800'
                )}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-surface-50">{opt.label}</h4>
                  <div
                    className={cn(
                      'h-4 w-4 rounded-full border-2',
                      isSelected ? 'border-primary-500 bg-primary-500' : 'border-surface-600'
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3 text-surface-50" />}
                  </div>
                </div>
                <p className="mt-1 text-xs text-surface-400">{opt.description}</p>
                <p className="mt-2 text-sm font-medium text-copper-400">
                  {opt.price === 0 ? 'Included' : `+ ${formatPrice(opt.price)}`}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => {
    if (submitted) {
      return (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-2xl border-2 border-primary-700 bg-primary-950 p-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-surface-50">
            <Check className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-surface-50 mb-2">Inquiry Submitted!</h3>
          <p className="text-surface-300">
            Thank you for your interest. We&apos;ll review your configuration and
            get back to you within 1-2 business days with a final quote.
          </p>
        </motion.div>
      );
    }

    const selectedSize = presetSizes.find((s) => s.key === config.size.preset);
    const selectedVent = ventilationOptions.find((v) => v.key === config.features.ventilation);
    const selectedDoor = doorStyleOptions.find((d) => d.key === config.features.doorStyle);

    return (
      <div>
        <h3 className="text-xl font-semibold text-surface-50 mb-2">Review Your Build</h3>
        <p className="text-surface-400 mb-6">Double-check everything before submitting your inquiry.</p>

        <div className="space-y-4">
          <div className="rounded-xl border border-surface-700 bg-surface-800 p-4">
            <h4 className="text-sm font-medium text-surface-400">Material</h4>
            <p className="mt-1 text-lg font-semibold text-surface-50">{config.material ?? 'Not selected'}</p>
            {config.material && (
              <p className="text-sm text-surface-400">
                Base: {formatPrice(materialBasePrices[config.material as keyof typeof materialBasePrices])}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-surface-700 bg-surface-800 p-4">
            <h4 className="text-sm font-medium text-surface-400">Size</h4>
            {selectedSize ? (
              <>
                <p className="mt-1 text-lg font-semibold text-surface-50">{selectedSize.label}</p>
                <p className="text-sm text-surface-400">
                  <DimensionDisplay dimensions={selectedSize.dimensions} />
                  {selectedSize.basePrice > 0 && ` (+${formatPrice(selectedSize.basePrice)})`}
                </p>
              </>
            ) : config.size.custom ? (
              <>
                <p className="mt-1 text-lg font-semibold text-surface-50">Custom</p>
                <p className="text-sm text-surface-400">
                  <DimensionDisplay w={config.size.custom.w} d={config.size.custom.d} h={config.size.custom.h} />
                </p>
              </>
            ) : (
              <p className="mt-1 text-surface-500 italic">Not selected</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-surface-700 bg-surface-800 p-4">
              <h4 className="text-sm font-medium text-surface-400">Ventilation</h4>
              <p className="mt-1 font-semibold text-surface-50">{selectedVent?.label}</p>
            </div>
            <div className="rounded-xl border border-surface-700 bg-surface-800 p-4">
              <h4 className="text-sm font-medium text-surface-400">Door Style</h4>
              <p className="mt-1 font-semibold text-surface-50">{selectedDoor?.label}</p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-copper-400 bg-surface-800 p-5 text-center">
            <p className="text-sm font-medium text-surface-400">Estimated Total</p>
            <p className="text-3xl font-bold text-copper-400">
              {totalPrice !== null ? formatPrice(totalPrice) : 'Quote Required'}
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button onClick={handleSubmit} disabled={!config.material}>
            Submit Inquiry
          </Button>
        </div>
      </div>
    );
  };

  const stepRenderers = [renderMaterialStep, renderSizeStep, renderFeaturesStep, renderReviewStep];

  return (
    <div>
      <StepIndicator steps={STEPS} currentStep={currentStep} onStepClick={goToStep} />

      <div className={currentStep < 4 ? 'lg:grid lg:grid-cols-3 lg:gap-8' : ''}>
        <div className={currentStep < 4 ? 'lg:col-span-2' : ''}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {stepRenderers[currentStep - 1]()}
            </motion.div>
          </AnimatePresence>

          {!submitted && (
            <div className="mt-8 flex items-center justify-between">
              <Button onClick={goBack} variant="outline" disabled={currentStep === 1}>
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back
              </Button>
              {currentStep < 4 && (
                <Button onClick={goNext}>
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {currentStep < 4 && (
          <div className="mt-8 lg:mt-0">
            <SummaryPanel config={config} totalPrice={totalPrice} onSubmit={handleSubmit} currentStep={currentStep} />
          </div>
        )}
      </div>
    </div>
  );
}

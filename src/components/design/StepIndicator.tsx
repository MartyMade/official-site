import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export default function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress" className="mb-10">
      <ol className="flex items-center justify-between">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isFuture = stepNumber > currentStep;

          return (
            <li key={label} className="relative flex flex-1 items-center">
              {index > 0 && (
                <div
                  className={cn(
                    'absolute right-1/2 top-4 -z-10 h-0.5 w-full -translate-y-1/2',
                    isCompleted || isCurrent ? 'bg-primary-600' : 'bg-surface-700'
                  )}
                  aria-hidden="true"
                />
              )}

              <div className="flex flex-col items-center gap-2 w-full">
                <button
                  type="button"
                  onClick={() => isCompleted && onStepClick?.(stepNumber)}
                  disabled={!isCompleted}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                    isCompleted &&
                      'border-primary-600 bg-primary-600 text-surface-50 cursor-pointer hover:bg-primary-500',
                    isCurrent &&
                      'border-primary-500 bg-surface-800 text-primary-400 ring-2 ring-primary-900 cursor-default',
                    isFuture &&
                      'border-surface-600 bg-surface-800 text-surface-500 cursor-default'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    stepNumber
                  )}
                </button>

                <span
                  className={cn(
                    'text-xs font-medium text-center hidden sm:block',
                    isCompleted && 'text-primary-400',
                    isCurrent && 'text-primary-400',
                    isFuture && 'text-surface-500'
                  )}
                >
                  {label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

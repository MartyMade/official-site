import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
  className?: string;
}

const variants = {
  default: 'bg-surface-800 text-surface-300',
  success: 'bg-primary-900 text-primary-300',
  warning: 'bg-copper-900 text-copper-300',
  info: 'bg-blue-900 text-blue-300',
};

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  );
}

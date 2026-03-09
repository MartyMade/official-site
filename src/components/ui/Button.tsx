import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonAsLink = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants = {
  primary: 'bg-primary-600 hover:bg-primary-500 text-surface-50 hover:shadow-md hover:shadow-primary-600/25',
  secondary: 'bg-copper-400 hover:bg-copper-300 text-surface-950 hover:shadow-md hover:shadow-copper-400/25',
  outline: 'border border-surface-600 hover:border-primary-500 hover:text-primary-400 hover:bg-primary-950 text-surface-300',
  ghost: 'hover:bg-surface-800 text-surface-300',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
};

export default function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 cursor-pointer',
    'hover:scale-[1.02] active:scale-[0.98]',
    variants[variant],
    sizes[size],
    className
  );

  if ('href' in props && props.href) {
    return <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }
  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}

import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { cn } from '@/lib/utils';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className, 
  disabled, 
  loading,
  ...props 
}: ButtonProps) => {
  const baseStyles = "flex flex-row items-center justify-center rounded-lg";
  
  const variantStyles = {
    primary: "bg-primary-500 active:bg-primary-600",
    secondary: "bg-secondary-500 active:bg-secondary-600",
    outline: "border border-gray-300 active:bg-gray-100",
    ghost: "active:bg-gray-100",
    danger: "bg-error-500 active:bg-error-600",
  };
  
  const sizeStyles = {
    sm: "px-3 py-1.5",
    md: "px-4 py-2.5",
    lg: "px-6 py-3",
  };
  
  const textBaseStyles = "font-medium text-center";
  
  const textVariantStyles = {
    primary: "text-white",
    secondary: "text-white",
    outline: "text-gray-700",
    ghost: "text-gray-700",
    danger: "text-white",
  };
  
  const textSizeStyles = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };
  
  const isDisabled = disabled || loading;
  const disabledStyles = isDisabled ? "opacity-50" : "";
  
  return (
    <TouchableOpacity
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabledStyles,
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'ghost' ? '#374151' : '#ffffff'} 
          className="mr-2"
        />
      ) : null}
      
      {typeof children === 'string' ? (
        <Text 
          className={cn(
            textBaseStyles,
            textVariantStyles[variant],
            textSizeStyles[size]
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

interface CardProps extends ViewProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Card = ({ title, subtitle, children, className, ...props }: CardProps) => {
  return (
    <View 
      className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden",
        className
      )} 
      {...props}
    >
      {(title || subtitle) && (
        <View className="p-4 border-b border-gray-100">
          {title && <Text className="text-lg font-semibold text-gray-900">{title}</Text>}
          {subtitle && <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>}
        </View>
      )}
      <View className="p-4">
        {children}
      </View>
    </View>
  );
};

export const CardHeader = ({ children, className, ...props }: ViewProps) => {
  return (
    <View className={cn("mb-2", className)} {...props}>
      {children}
    </View>
  );
};

export const CardContent = ({ children, className, ...props }: ViewProps) => {
  return (
    <View className={cn("", className)} {...props}>
      {children}
    </View>
  );
};

export const CardFooter = ({ children, className, ...props }: ViewProps) => {
  return (
    <View className={cn("mt-4 flex-row justify-end", className)} {...props}>
      {children}
    </View>
  );
};
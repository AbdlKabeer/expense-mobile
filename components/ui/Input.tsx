import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = ({ 
  label, 
  error, 
  helper,
  leftIcon,
  rightIcon,
  className,
  style,
  ...props 
}: InputProps) => {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </Text>
      )}
      
      <View className="relative">
        {leftIcon && (
          <View className="absolute left-3 top-0 bottom-0 justify-center z-10">
            {leftIcon}
          </View>
        )}
        
        <TextInput
          className={cn(
            "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base text-gray-900",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-error-500",
            className
          )}
          placeholderTextColor="#9CA3AF"
          {...props}
        />
        
        {rightIcon && (
          <View className="absolute right-3 top-0 bottom-0 justify-center z-10">
            {rightIcon}
          </View>
        )}
      </View>
      
      {error ? (
        <Text className="mt-1 text-xs text-error-500">{error}</Text>
      ) : helper ? (
        <Text className="mt-1 text-xs text-gray-500">{helper}</Text>
      ) : null}
    </View>
  );
};
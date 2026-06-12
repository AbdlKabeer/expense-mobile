import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, EyeOff, Eye, ArrowRight } from 'lucide-react-native';
import { useAuthStore } from '@/lib/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, user, isLoading, error } = useAuthStore();
  
  // useEffect(() => {
  //   if (user) {
  //     router.replace('/(protected)/');
  //   }
  // }, [user]);
  
  const handleLogin = async () => {
    await login(email, password);
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View className="flex-1 bg-white p-6">
          <View className="flex-1 justify-center">
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-primary-100 rounded-full items-center justify-center mb-4">
                <Text className="text-primary-500 text-4xl font-bold">W</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-900">Welcome back</Text>
              <Text className="text-base text-gray-500 mt-1">Sign in to your account</Text>
            </View>
            
            {error && (
              <View className="mb-4 p-3 bg-error-50 rounded-lg">
                <Text className="text-error-700 text-sm">{error}</Text>
              </View>
            )}
            
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={20} color="#9CA3AF" />}
              className="mb-4"
            />
            
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              leftIcon={<Lock size={20} color="#9CA3AF" />}
              rightIcon={
                <TouchableOpacity onPress={toggleShowPassword}>
                  {showPassword ? (
                    <EyeOff size={20} color="#9CA3AF" />
                  ) : (
                    <Eye size={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              }
              className="mb-2"
            />
            
            <TouchableOpacity className="self-end mb-6">
              <Text className="text-primary-600 text-sm font-medium">Forgot password?</Text>
            </TouchableOpacity>
            
            <Button 
              onPress={handleLogin} 
              loading={isLoading}
              size="lg"
              className="mb-6"
            >
              Sign In
            </Button>
            
            <View className="flex-row justify-center">
              <Text className="text-gray-600">Don't have an account?</Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text className="text-primary-600 font-medium ml-1">Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
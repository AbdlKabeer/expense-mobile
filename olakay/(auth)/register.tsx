import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, User, EyeOff, Eye, ArrowLeft } from 'lucide-react-native';
import { useAuthStore } from '@/lib/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, user, isLoading, error } = useAuthStore();
  
  useEffect(() => {
    if (user) {
      router.replace('/(protected)/');
    }
  }, [user]);
  
  const handleRegister = async () => {
    await register(email, password, name);
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
          <TouchableOpacity 
            className="mb-6 w-10 h-10 items-center justify-center" 
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          
          <View className="flex-1 justify-center">
            <View className="mb-8">
              <Text className="text-2xl font-bold text-gray-900">Create Account</Text>
              <Text className="text-base text-gray-500 mt-1">Sign up to get started</Text>
            </View>
            
            {error && (
              <View className="mb-4 p-3 bg-error-50 rounded-lg">
                <Text className="text-error-700 text-sm">{error}</Text>
              </View>
            )}
            
            <Input
              label="Full Name"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              leftIcon={<User size={20} color="#9CA3AF" />}
              className="mb-4"
            />
            
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
              placeholder="Create a password"
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
              helper="Must be at least 8 characters"
              className="mb-6"
            />
            
            <Button 
              onPress={handleRegister}
              loading={isLoading}
              size="lg"
              className="mb-6"
            >
              Create Account
            </Button>
            
            <View className="flex-row justify-center">
              <Text className="text-gray-600">Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-primary-600 font-medium ml-1">Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
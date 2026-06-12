import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { CircleUser as UserCircle, Settings, CreditCard, Bell, Moon, LogOut, ChevronRight, Shield, CircleHelp as HelpCircle } from 'lucide-react-native';
import { useAuthStore } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };
  
  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: handleLogout,
          style: "destructive"
        }
      ]
    );
  };
  
  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-primary-500 px-6 pt-16 pb-6">
        <View className="flex-row items-center">
          <Text className="text-white text-xl font-bold">Profile</Text>
        </View>
      </View>
      
      <ScrollView className="flex-1 px-6 pt-6">
        {/* Profile Card */}
        <Card className="mb-6">
          <CardContent>
            <View className="items-center py-4">
              <View className="bg-primary-100 w-20 h-20 rounded-full items-center justify-center mb-3">
                <UserCircle size={50} color="#10B981" />
              </View>
              <Text className="text-lg font-bold text-gray-900">{user?.name}</Text>
              <Text className="text-gray-500">{user?.email}</Text>
              
              <TouchableOpacity className="mt-4">
                <Text className="text-primary-500 font-medium">Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </CardContent>
        </Card>
        
        {/* Settings */}
        <Card className="mb-6">
          <CardContent>
            {/* Account Settings */}
            <Text className="text-sm font-medium text-gray-500 mb-3 uppercase">Account Settings</Text>
            
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="bg-primary-100 w-8 h-8 rounded-full items-center justify-center mr-3">
                  <Settings size={18} color="#10B981" />
                </View>
                <Text className="text-gray-800">Account Settings</Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="bg-secondary-100 w-8 h-8 rounded-full items-center justify-center mr-3">
                  <CreditCard size={18} color="#3B82F6" />
                </View>
                <Text className="text-gray-800">Payment Methods</Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>
            
            <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="bg-accent-100 w-8 h-8 rounded-full items-center justify-center mr-3">
                  <Bell size={18} color="#8B5CF6" />
                </View>
                <Text className="text-gray-800">Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#E5E7EB', true: '#D1FAE5' }}
                thumbColor={notifications ? '#10B981' : '#9CA3AF'}
              />
            </View>
            
            <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="bg-gray-100 w-8 h-8 rounded-full items-center justify-center mr-3">
                  <Moon size={18} color="#6B7280" />
                </View>
                <Text className="text-gray-800">Dark Mode</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#E5E7EB', true: '#D1FAE5' }}
                thumbColor={darkMode ? '#10B981' : '#9CA3AF'}
              />
            </View>
            
            {/* Help & Support */}
            <Text className="text-sm font-medium text-gray-500 mt-6 mb-3 uppercase">Help & Support</Text>
            
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="bg-warning-100 w-8 h-8 rounded-full items-center justify-center mr-3">
                  <HelpCircle size={18} color="#F59E0B" />
                </View>
                <Text className="text-gray-800">Help Center</Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="bg-error-100 w-8 h-8 rounded-full items-center justify-center mr-3">
                  <Shield size={18} color="#EF4444" />
                </View>
                <Text className="text-gray-800">Privacy & Security</Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </CardContent>
        </Card>
        
        {/* Logout Button */}
        <Button 
          variant="outline" 
          size="lg"
          onPress={confirmLogout}
          className="mb-8"
        >
          <View className="flex-row items-center">
            <LogOut size={18} color="#EF4444" className="mr-2" />
            <Text className="text-error-500 font-medium">Logout</Text>
          </View>
        </Button>
        
        {/* App Version */}
        <View className="items-center mb-8">
          <Text className="text-gray-400 text-sm">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}
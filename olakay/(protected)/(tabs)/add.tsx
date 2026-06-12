import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Calendar, Tag, MessageSquare, Repeat, ArrowLeft } from 'lucide-react-native';
import { useExpenseStore, TransactionType } from '@/lib/expense';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function AddTransactionScreen() {
  const { categories, addTransaction } = useExpenseStore();
  
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringPeriod, setRecurringPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  
  const handleAddTransaction = () => {
    if (!amount || !description || !selectedCategory) {
      return;
    }
    
    addTransaction({
      amount: parseFloat(amount),
      type,
      categoryId: selectedCategory,
      date,
      description,
      isRecurring,
      recurringPeriod: isRecurring ? recurringPeriod : undefined,
    });
    
    router.push('/(protected)/(tabs)/');
  };
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="bg-primary-500 px-6 pt-16 pb-6">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="w-10 h-10 items-center justify-center bg-white bg-opacity-20 rounded-full mr-4"
            >
              <ArrowLeft size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Add Transaction</Text>
          </View>
          
          {/* Transaction Type Toggle */}
          <View className="flex-row mt-6 bg-white bg-opacity-20 rounded-full p-1">
            <TouchableOpacity
              className={`flex-1 py-2 px-4 rounded-full ${type === 'expense' ? 'bg-white' : 'bg-transparent'}`}
              onPress={() => setType('expense')}
            >
              <Text className={`text-center font-medium ${type === 'expense' ? 'text-primary-500' : 'text-white'}`}>
                Expense
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className={`flex-1 py-2 px-4 rounded-full ${type === 'income' ? 'bg-white' : 'bg-transparent'}`}
              onPress={() => setType('income')}
            >
              <Text className={`text-center font-medium ${type === 'income' ? 'text-primary-500' : 'text-white'}`}>
                Income
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <ScrollView className="flex-1 px-6 pt-6">
          {/* Amount Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-1.5">Amount</Text>
            <View className="relative">
              <Text className="absolute left-4 top-0 bottom-0 text-xl font-bold text-gray-700 flex items-center justify-center">
                $
              </Text>
              <Input
                placeholder="0.00"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                className="pl-10 text-xl font-bold"
              />
            </View>
          </View>
          
          {/* Description Input */}
          <Input
            label="Description"
            placeholder="What was this for?"
            value={description}
            onChangeText={setDescription}
            leftIcon={<MessageSquare size={20} color="#9CA3AF" />}
          />
          
          {/* Category Selection */}
          <Text className="text-sm font-medium text-gray-700 mb-1.5">Category</Text>
          <View className="mb-6">
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              className="flex-row pb-2"
            >
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  className={`mr-3 px-4 py-2 rounded-full border ${
                    selectedCategory === category.id 
                      ? 'bg-primary-50 border-primary-500' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <Text
                    className={`${
                      selectedCategory === category.id
                        ? 'text-primary-700'
                        : 'text-gray-700'
                    }`}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          {/* Date Selection */}
          <Input
            label="Date"
            placeholder="Select date"
            value={date}
            onChangeText={setDate}
            leftIcon={<Calendar size={20} color="#9CA3AF" />}
          />
          
          {/* Recurring Toggle */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity 
              onPress={() => setIsRecurring(!isRecurring)}
              className="flex-row items-center"
            >
              <View 
                className={`w-5 h-5 rounded border mr-2 ${
                  isRecurring 
                    ? 'bg-primary-500 border-primary-500' 
                    : 'bg-white border-gray-300'
                }`}
              />
              <Text className="text-gray-700">Recurring Transaction</Text>
            </TouchableOpacity>
          </View>
          
          {/* Recurring Period Selection - only shown if recurring is enabled */}
          {isRecurring && (
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 mb-1.5">Recurring Period</Text>
              <View className="flex-row">
                {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((period) => (
                  <TouchableOpacity
                    key={period}
                    onPress={() => setRecurringPeriod(period)}
                    className={`mr-3 px-4 py-2 rounded-full border ${
                      recurringPeriod === period
                        ? 'bg-primary-50 border-primary-500'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <Text
                      className={`${
                        recurringPeriod === period
                          ? 'text-primary-700'
                          : 'text-gray-700'
                      }`}
                    >
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          
          {/* Submit Button */}
          <Button 
            size="lg"
            onPress={handleAddTransaction}
            className="mb-8"
            disabled={!amount || !description || !selectedCategory}
          >
            Add Transaction
          </Button>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
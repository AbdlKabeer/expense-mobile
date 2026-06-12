import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Calendar, Filter, ChevronDown, ArrowDown, ArrowUp } from 'lucide-react-native';
import { useExpenseStore } from '@/lib/expense';
import { formatCurrency, calculatePercentage } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

const screenWidth = Dimensions.get('window').width;

export default function AnalyticsScreen() {
  const { transactions, categories, budgets } = useExpenseStore();
  const [timeframe, setTimeframe] = useState('month');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Get current month transactions
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const thisMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
  
  // Calculate income and expenses
  const totalIncome = thisMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = thisMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;
  
  // Data for expense by category pie chart
  const expensesByCategory = categories.map(category => {
    const amount = thisMonthTransactions
      .filter(t => t.type === 'expense' && t.categoryId === category.id)
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      name: category.name,
      amount,
      color: category.color,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    };
  }).filter(item => item.amount > 0);
  
  // Data for monthly comparison bar chart
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - 5 + i);
    return d;
  });
  
  const monthlyExpenses = months.map(month => {
    const monthTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return (
        date.getMonth() === month.getMonth() &&
        date.getFullYear() === month.getFullYear() &&
        t.type === 'expense'
      );
    });
    
    return monthTransactions.reduce((sum, t) => sum + t.amount, 0);
  });
  
  const monthlyIncomes = months.map(month => {
    const monthTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return (
        date.getMonth() === month.getMonth() &&
        date.getFullYear() === month.getFullYear() &&
        t.type === 'income'
      );
    });
    
    return monthTransactions.reduce((sum, t) => sum + t.amount, 0);
  });
  
  const barChartData = {
    labels: months.map(m => m.toLocaleString('default', { month: 'short' })),
    datasets: [
      {
        data: monthlyExpenses,
        color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: monthlyIncomes,
        color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ['Expenses', 'Income']
  };
  
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: true,
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };
  
  // Budget progress
  const activeBudgets = budgets.filter(budget => {
    const startDate = new Date(budget.startDate);
    const isCurrentPeriod = startDate.getMonth() === currentMonth && 
                           startDate.getFullYear() === currentYear;
    return isCurrentPeriod;
  });
  
  // Calculate budget progress
  const budgetProgress = activeBudgets.map(budget => {
    const category = categories.find(c => c.id === budget.categoryId);
    const spent = thisMonthTransactions
      .filter(t => t.type === 'expense' && t.categoryId === budget.categoryId)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const percentUsed = calculatePercentage(spent, budget.amount);
    const isOverBudget = spent > budget.amount;
    
    return {
      ...budget,
      category,
      spent,
      percentUsed,
      isOverBudget
    };
  });
  
  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-primary-500 px-6 pt-16 pb-6">
        <Text className="text-white text-xl font-bold">Analytics</Text>
        
        <View className="flex-row mt-4 items-center justify-between">
          <TouchableOpacity className="flex-row items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
            <Calendar size={16} color="white" />
            <Text className="text-white ml-2">This Month</Text>
            <ChevronDown size={16} color="white" className="ml-2" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
            <Filter size={16} color="white" />
            <Text className="text-white ml-2">All Categories</Text>
            <ChevronDown size={16} color="white" className="ml-2" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView className="flex-1 px-6 pt-6">
        {/* Overview Card */}
        <Card className="mb-6">
          <CardHeader>
            <Text className="text-lg font-semibold text-gray-900">Monthly Overview</Text>
          </CardHeader>
          <CardContent>
            <View className="flex-row justify-between mb-4">
              <View>
                <Text className="text-gray-500">Income</Text>
                <Text className="text-success-500 text-xl font-bold">{formatCurrency(totalIncome)}</Text>
              </View>
              <View>
                <Text className="text-gray-500">Expenses</Text>
                <Text className="text-error-500 text-xl font-bold">{formatCurrency(totalExpenses)}</Text>
              </View>
              <View>
                <Text className="text-gray-500">Balance</Text>
                <Text className={`text-xl font-bold ${balance >= 0 ? 'text-success-500' : 'text-error-500'}`}>
                  {formatCurrency(balance)}
                </Text>
              </View>
            </View>
            
            <View className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <View 
                className="h-full bg-success-500 rounded-full" 
                style={{ width: `${Math.min(calculatePercentage(totalIncome, totalIncome + totalExpenses), 100)}%` }}
              />
            </View>
          </CardContent>
        </Card>
        
        {/* Expense by Category */}
        {expensesByCategory.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <Text className="text-lg font-semibold text-gray-900">Expense by Category</Text>
            </CardHeader>
            <CardContent>
              <PieChart
                data={expensesByCategory}
                width={screenWidth - 60}
                height={200}
                chartConfig={chartConfig}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
              
              <View className="mt-4">
                {expensesByCategory.map((item, index) => (
                  <View key={index} className="flex-row justify-between items-center py-2 border-b border-gray-100">
                    <View className="flex-row items-center">
                      <View 
                        className="w-4 h-4 rounded mr-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <Text className="text-gray-700">{item.name}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text className="text-gray-900 font-medium">{formatCurrency(item.amount)}</Text>
                      <Text className="text-gray-500 ml-2">
                        ({calculatePercentage(item.amount, totalExpenses)}%)
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        )}
        
        {/* Monthly Comparison */}
        <Card className="mb-6">
          <CardHeader>
            <Text className="text-lg font-semibold text-gray-900">Monthly Comparison</Text>
          </CardHeader>
          <CardContent>
            <BarChart
              data={barChartData}
              width={screenWidth - 60}
              height={220}
              chartConfig={chartConfig}
              yAxisLabel="$"
              verticalLabelRotation={0}
              showBarTops={false}
              fromZero={true}
              withInnerLines={false}
              style={{ borderRadius: 16 }}
            />
          </CardContent>
        </Card>
        
        {/* Budget Progress */}
        {budgetProgress.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <Text className="text-lg font-semibold text-gray-900">Budget Progress</Text>
            </CardHeader>
            <CardContent>
              {budgetProgress.map((budget, index) => (
                <View key={index} className="mb-4">
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-gray-700 font-medium">{budget.category?.name}</Text>
                    <Text className="text-gray-700">
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
                    </Text>
                  </View>
                  <View className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <View 
                      className={`h-full ${budget.isOverBudget ? 'bg-error-500' : 'bg-primary-500'} rounded-full`}
                      style={{ width: `${Math.min(budget.percentUsed, 100)}%` }}
                    />
                  </View>
                  {budget.isOverBudget && (
                    <Text className="text-error-500 text-xs mt-1">
                      Over budget by {formatCurrency(budget.spent - budget.amount)}
                    </Text>
                  )}
                </View>
              ))}
            </CardContent>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}
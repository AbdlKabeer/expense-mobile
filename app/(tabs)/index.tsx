// import React, { useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
// import { PieChart, LineChart } from 'react-native-chart-kit';
// import { Dimensions } from 'react-native';
// import { router } from 'expo-router';
// import { 
//   Wallet, ArrowDown, ArrowUp, ChevronRight, Filter, Plus, 
//   ChevronDown, Calendar, TrendingUp, TrendingDown 
// } from 'lucide-react-native';
// import { useExpenseStore, TransactionType } from '@/lib/expense';
// import { formatCurrency, formatDate } from '@/lib/utils';
// import { Card, CardHeader, CardContent } from '@/components/ui/Card';
// import { Button } from '@/components/ui/Button';

// const screenWidth = Dimensions.get('window').width;

// export default function HomeScreen() {
//   const { transactions, categories, budgets } = useExpenseStore();
//   const [timeframe, setTimeframe] = useState('month');
//   const [refreshing, setRefreshing] = useState(false);
  
//   // Get current month/week transactions
//   const currentDate = new Date();
//   const currentMonth = currentDate.getMonth();
//   const currentYear = currentDate.getFullYear();
  
//   const thisMonthTransactions = transactions.filter(t => {
//     const date = new Date(t.date);
//     return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
//   });
  
//   // Calculate income and expenses
//   const totalIncome = thisMonthTransactions
//     .filter(t => t.type === 'income')
//     .reduce((sum, t) => sum + t.amount, 0);
    
//   const totalExpenses = thisMonthTransactions
//     .filter(t => t.type === 'expense')
//     .reduce((sum, t) => sum + t.amount, 0);
    
//   const balance = totalIncome - totalExpenses;

//   // Data for pie chart
//   const expensesByCategory = categories.map(category => {
//     const amount = thisMonthTransactions
//       .filter(t => t.type === 'expense' && t.categoryId === category.id)
//       .reduce((sum, t) => sum + t.amount, 0);
    
//     return {
//       name: category.name,
//       amount,
//       color: category.color,
//       legendFontColor: '#7F7F7F',
//       legendFontSize: 12
//     };
//   }).filter(item => item.amount > 0);

//   // Data for line chart
//   const days = Array.from({ length: 7 }, (_, i) => {
//     const d = new Date();
//     d.setDate(d.getDate() - 6 + i);
//     return d;
//   });
  
//   const dailyExpenses = days.map(day => {
//     const dayTransactions = transactions.filter(t => {
//       const date = new Date(t.date);
//       return (
//         date.getDate() === day.getDate() &&
//         date.getMonth() === day.getMonth() &&
//         date.getFullYear() === day.getFullYear() &&
//         t.type === 'expense'
//       );
//     });
    
//     return dailyTransactions.reduce((sum, t) => sum + t.amount, 0);
//   });
  
//   const lineChartData = {
//     labels: days.map(d => d.getDate().toString()),
//     datasets: [
//       {
//         data: dailyExpenses,
//         color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
//         strokeWidth: 2
//       }
//     ]
//   };
  
//   const chartConfig = {
//     backgroundGradientFrom: '#ffffff',
//     backgroundGradientTo: '#ffffff',
//     color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
//     strokeWidth: 2,
//     barPercentage: 0.5,
//     useShadowColorFromDataset: false,
//     decimalPlaces: 0,
//     labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//   };
  
//   // Format transactions for display
//   const recentTransactions = [...transactions]
//     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//     .slice(0, 5);
    
//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1000);
//   }, []);
  
//   return (
//     <View className="flex-1 bg-gray-50">
//       <ScrollView
//         className="flex-1"
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         {/* Header */}
//         <View className="bg-primary-500 px-6 pt-16 pb-6">
//           <View className="flex-row items-center justify-between">
//             <View>
//               <Text className="text-white text-lg font-bold">Current Balance</Text>
//               <Text className="text-white text-3xl font-bold mt-1">
//                 {formatCurrency(balance)}
//               </Text>
//             </View>
//             <View className="bg-white bg-opacity-20 rounded-full p-3">
//               <Wallet size={24} color="white" />
//             </View>
//           </View>
          
//           <View className="flex-row mt-6">
//             <View className="flex-1 bg-white bg-opacity-20 rounded-xl p-4 mr-2">
//               <View className="flex-row items-center">
//                 <View className="bg-success-500 rounded-full p-1 mr-2">
//                   <ArrowDown size={12} color="white" />
//                 </View>
//                 <Text className="text-white text-sm">Income</Text>
//               </View>
//               <Text className="text-white text-xl font-bold mt-1">
//                 {formatCurrency(totalIncome)}
//               </Text>
//             </View>
            
//             <View className="flex-1 bg-white bg-opacity-20 rounded-xl p-4 ml-2">
//               <View className="flex-row items-center">
//                 <View className="bg-error-500 rounded-full p-1 mr-2">
//                   <ArrowUp size={12} color="white" />
//                 </View>
//                 <Text className="text-white text-sm">Expenses</Text>
//               </View>
//               <Text className="text-white text-xl font-bold mt-1">
//                 {formatCurrency(totalExpenses)}
//               </Text>
//             </View>
//           </View>
//         </View>
        
//         {/* Time frame selector */}
//         <View className="px-6 py-4 flex-row justify-between">
//           <TouchableOpacity 
//             className={`py-2 px-4 rounded-full ${timeframe === 'week' ? 'bg-primary-500' : 'bg-gray-200'}`}
//             onPress={() => setTimeframe('week')}
//           >
//             <Text className={timeframe === 'week' ? 'text-white' : 'text-gray-800'}>
//               Week
//             </Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             className={`py-2 px-4 rounded-full ${timeframe === 'month' ? 'bg-primary-500' : 'bg-gray-200'}`}
//             onPress={() => setTimeframe('month')}
//           >
//             <Text className={timeframe === 'month' ? 'text-white' : 'text-gray-800'}>
//               Month
//             </Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             className={`py-2 px-4 rounded-full ${timeframe === 'quarter' ? 'bg-primary-500' : 'bg-gray-200'}`}
//             onPress={() => setTimeframe('quarter')}
//           >
//             <Text className={timeframe === 'quarter' ? 'text-white' : 'text-gray-800'}>
//               Quarter
//             </Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             className={`py-2 px-4 rounded-full ${timeframe === 'year' ? 'bg-primary-500' : 'bg-gray-200'}`}
//             onPress={() => setTimeframe('year')}
//           >
//             <Text className={timeframe === 'year' ? 'text-white' : 'text-gray-800'}>
//               Year
//             </Text>
//           </TouchableOpacity>
//         </View>
        
//         {/* Spending trend */}
//         <View className="px-6 pb-4">
//           <Card>
//             <CardHeader>
//               <View className="flex-row justify-between items-center">
//                 <Text className="text-lg font-semibold text-gray-900">Spending Trend</Text>
//                 <View className="flex-row items-center">
//                   <Calendar size={16} color="#6B7280" />
//                   <Text className="ml-1 text-gray-500">Last 7 Days</Text>
//                 </View>
//               </View>
//             </CardHeader>
//             <CardContent>
//               <LineChart
//                 data={lineChartData}
//                 width={screenWidth - 60}
//                 height={180}
//                 chartConfig={chartConfig}
//                 bezier
//                 style={{ borderRadius: 16 }}
//                 withDots={false}
//                 withInnerLines={false}
//                 withOuterLines={false}
//               />
//             </CardContent>
//           </Card>
//         </View>
        
//         {/* Expense by category */}
//         {expensesByCategory.length > 0 && (
//           <View className="px-6 pb-4">
//             <Card>
//               <CardHeader>
//                 <View className="flex-row justify-between items-center">
//                   <Text className="text-lg font-semibold text-gray-900">Expense by Category</Text>
//                   <TouchableOpacity 
//                     className="flex-row items-center"
//                     onPress={() => router.push('/(protected)/(tabs)/analytics')}
//                   >
//                     <Text className="text-primary-500 text-sm mr-1">See Details</Text>
//                     <ChevronRight size={16} color="#10B981" />
//                   </TouchableOpacity>
//                 </View>
//               </CardHeader>
//               <CardContent>
//                 <PieChart
//                   data={expensesByCategory}
//                   width={screenWidth - 60}
//                   height={180}
//                   chartConfig={chartConfig}
//                   accessor="amount"
//                   backgroundColor="transparent"
//                   paddingLeft="15"
//                   absolute
//                 />
//               </CardContent>
//             </Card>
//           </View>
//         )}
        
//         {/* Recent transactions */}
//         <View className="px-6 pb-6">
//           <Card>
//             <CardHeader>
//               <View className="flex-row justify-between items-center">
//                 <Text className="text-lg font-semibold text-gray-900">Recent Transactions</Text>
//                 <TouchableOpacity 
//                   className="flex-row items-center"
//                   onPress={() => router.push('/(protected)/(tabs)/analytics')}
//                 >
//                   <Text className="text-primary-500 text-sm mr-1">See All</Text>
//                   <ChevronRight size={16} color="#10B981" />
//                 </TouchableOpacity>
//               </View>
//             </CardHeader>
//             <CardContent>
//               {recentTransactions.length > 0 ? (
//                 recentTransactions.map((transaction) => {
//                   const category = categories.find(c => c.id === transaction.categoryId);
//                   return (
//                     <View 
//                       key={transaction.id} 
//                       className="flex-row items-center py-3 border-b border-gray-100"
//                     >
//                       <View 
//                         className="w-10 h-10 rounded-full items-center justify-center mr-3"
//                         style={{ backgroundColor: category?.color + '20' }}
//                       >
//                         {transaction.type === 'income' ? (
//                           <TrendingUp size={18} color={category?.color} />
//                         ) : (
//                           <TrendingDown size={18} color={category?.color} />
//                         )}
//                       </View>
//                       <View className="flex-1">
//                         <Text className="text-gray-900 font-medium">{transaction.description}</Text>
//                         <Text className="text-gray-500 text-sm">{category?.name} • {formatDate(new Date(transaction.date))}</Text>
//                       </View>
//                       <Text 
//                         className={transaction.type === 'income' ? 'text-success-500 font-semibold' : 'text-error-500 font-semibold'}
//                       >
//                         {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
//                       </Text>
//                     </View>
//                   );
//                 })
//               ) : (
//                 <View className="py-8 items-center">
//                   <Text className="text-gray-500 mb-4">No transactions yet</Text>
//                   <Button 
//                     variant="primary" 
//                     size="sm"
//                     onPress={() => router.push('/(protected)/(tabs)/add')}
//                   >
//                     Add Transaction
//                   </Button>
//                 </View>
//               )}
//             </CardContent>
//           </Card>
//         </View>
//       </ScrollView>
      
//       {/* Quick add button */}
//       <TouchableOpacity 
//         className="absolute bottom-24 right-6 bg-primary-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
//         onPress={() => router.push('/(protected)/(tabs)/add')}
//       >
//         <Plus size={24} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// }


// app/index.tsx
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View className=' top-16' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the App 👋</Text>
    </View>
  );
}

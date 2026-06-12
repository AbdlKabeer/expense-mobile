import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/ui/Button';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-6 bg-white">
        <Text className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</Text>
        <Text className="text-gray-600 text-center mb-8">
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Link href="/(protected)/" asChild>
          <Button>Go back to home</Button>
        </Link>
      </View>
    </>
  );
}
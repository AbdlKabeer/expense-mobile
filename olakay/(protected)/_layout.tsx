import { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import { useAuthStore } from '@/lib/auth';

export default function ProtectedLayout() {
  const { user, isLoading } = useAuthStore();
  
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading]);
  
  if (isLoading || !user) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
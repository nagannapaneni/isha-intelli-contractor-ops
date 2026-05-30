import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { DashboardScreen } from './screens/DashboardScreen';
import { JobsScreen } from './screens/JobsScreen';
import { CaptureScreen } from './screens/CaptureScreen';
import { ApprovalsScreen } from './screens/ApprovalsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { COLORS } from './lib/theme';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{name}</Text>
  </View>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: COLORS.surface,
              borderTopColor: COLORS.border,
              borderTopWidth: 1,
              height: 65,
              paddingBottom: 10,
              paddingTop: 8,
            },
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.textMuted,
            tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          }}
        >
          <Tab.Screen name="Dashboard" component={DashboardScreen}
            options={{ tabBarIcon: ({ focused }) => <TabIcon name="📊" focused={focused} />, tabBarLabel: 'Dashboard' }}
          />
          <Tab.Screen name="Jobs" component={JobsScreen}
            options={{ tabBarIcon: ({ focused }) => <TabIcon name="🏗️" focused={focused} />, tabBarLabel: 'Jobs' }}
          />
          <Tab.Screen name="Capture" component={CaptureScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={{ backgroundColor: COLORS.primary, borderRadius: 32, width: 52, height: 52, alignItems: 'center', justifyContent: 'center', marginBottom: 16, shadowColor: COLORS.primary, shadowOpacity: 0.5, shadowRadius: 8, elevation: 8 }}>
                  <Text style={{ fontSize: 24 }}>📷</Text>
                </View>
              ),
              tabBarLabel: 'Capture',
            }}
          />
          <Tab.Screen name="Approvals" component={ApprovalsScreen}
            options={{ tabBarIcon: ({ focused }) => <TabIcon name="✅" focused={focused} />, tabBarLabel: 'Approvals' }}
          />
          <Tab.Screen name="Profile" component={ProfileScreen}
            options={{ tabBarIcon: ({ focused }) => <TabIcon name="👤" focused={focused} />, tabBarLabel: 'Profile' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

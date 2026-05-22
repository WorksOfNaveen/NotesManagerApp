import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { HeaderButton } from '../components/HeaderButton';
import { useAppTheme } from '../hooks/useAppTheme';
import { DeleteScreen } from '../screens/DeleteScreen';
import { EditorScreen } from '../screens/EditorScreen';
import { HomeScreen } from '../screens/HomeScreen';
import type { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const colors = useAppTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'My Notes',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <HeaderButton
              label="Manage"
              color={colors.primary}
              onPress={() => navigation.navigate('Delete')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Editor"
        component={EditorScreen}
        options={({ route }) => ({
          title: route.params?.noteId ? 'Edit Note' : 'New Note',
        })}
      />
      <Stack.Screen
        name="Delete"
        component={DeleteScreen}
        options={{ title: 'Delete Notes' }}
      />
    </Stack.Navigator>
  );
}

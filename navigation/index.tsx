import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AboutScreen from '../screens/About';
import CharacterScreen from '../screens/Characters';
import CharactersNav from '../screens/CharactersNav';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack: any = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{height: "100%", width: "100%", paddingTop: 0}} >

    
    <BottomTab.Navigator
      initialRouteName="Characters"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Characters"
        component={CharactersNav}
        options={({ navigation }: RootTabScreenProps<'Characters'>) => ({
          title: "Characters",
          headerShown: false,
          tabBarIcon: ({ color }: {color: any}) => <TabBarIcon  name="users" color={"#FFE81F"} />
        })}
      />
      {/* <BottomTab.Screen
        name="Character"
        component={CharacterScreen}
        options={({ navigation }: RootTabScreenProps<'Character'>) => ({
          title: "Character",
          headerShown: true,
          tabBarIcon: ({ color }: {color: any}) => <TabBarIcon name="search" color={color} />
        })}
      /> */}
      <BottomTab.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerShown: false,
          title: 'about',
          tabBarIcon: ({ color }: {color: string}) => <TabBarIcon name="info" color={"#FFE81F"} />,
        }}
      />
    </BottomTab.Navigator>
    </SafeAreaView>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

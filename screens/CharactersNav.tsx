import { StyleSheet } from 'react-native';
import React from "react"
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import TopSearchBar from "../components/SearchComponent/index"
import { SafeAreaView } from 'react-native-safe-area-context';
import { global_styles } from '../GlobalStyles';
import Header1 from '../components/Headers/Header1';
import List1 from '../components/Lists/List1';
import { createStackNavigator } from '@react-navigation/stack';
import CharacterScreen from './CharacterScreens/Character';
import CharactersScreen from './Characters';
import CharacterNav from './CharacterScreens';
import { QueryClient, QueryClientProvider } from 'react-query';

const CharactersStack = createStackNavigator()

export default function CharactersNav({ navigation }: RootTabScreenProps<'Characters'>) {
  const initial_query_client  = new QueryClient()
  return (
    <QueryClientProvider client={initial_query_client} >
      <CharactersStack.Navigator initialRouteName='All'  screenOptions={{
          headerShown: false
      }} >          
        <CharactersStack.Screen name="All" component={CharactersScreen} />
        <CharactersStack.Screen initialParams={{data_url: "https://swapi.dev/api/people/1/"}} name="Character" component={CharacterNav} />
      </CharactersStack.Navigator>
      </QueryClientProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  top_container: {

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

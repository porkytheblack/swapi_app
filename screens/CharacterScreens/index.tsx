import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CharacterScreen from './Character'
import Films from './Films'
import StarShips from './StarShips'
import Vehicles from './Vehicles'
import { QueryClient, QueryClientProvider } from 'react-query'

const CharacterNav = ({route}:{route: any}) => {
    const CharacterStack = createStackNavigator()
    const character_query = new QueryClient()
  return (
    <QueryClientProvider client={character_query} >
    <CharacterStack.Navigator initialRouteName='main' >
        <CharacterStack.Screen options={{
            headerTitle: "Information"
        }} name="main" initialParams={{data_url: route.params.data_url}} component={CharacterScreen}  />
        <CharacterStack.Screen options={{
            headerTitle: "Film"
        }} name="films" component={Films}  />
        <CharacterStack.Screen options={{
            headerTitle: "Star Ship"
        }} name="starships" component={StarShips}  />
        <CharacterStack.Screen options={{
            headerTitle: "Vehicle"
        }} name="vehicles" component={Vehicles}  />
    </CharacterStack.Navigator>
    </QueryClientProvider>
  )
}

export default CharacterNav

const styles = StyleSheet.create({})
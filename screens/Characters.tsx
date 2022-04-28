import { FlatList, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from "react"
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import TopSearchBar from "../components/SearchComponent/index"
import { SafeAreaView } from 'react-native-safe-area-context';
import { global_styles } from '../GlobalStyles';
import Header1 from '../components/Headers/Header1';
import List1 from '../components/Lists/List1';
import { createStackNavigator } from '@react-navigation/stack';
import Pagination from '../components/Pagination';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import axios from 'axios';
import { ActivityIndicator, Button } from 'react-native-paper';
import Text1 from '../components/Text/Text1';
import ListElement from '../components/Lists/List1/ListElement';
import { Feather } from '@expo/vector-icons';

const CharactersStack = createStackNavigator()



export default function CharactersScreen({ navigation }: any) {
  //query object
  const query_item = new QueryClient()
  const [results, set_results] = useState<any>({})
  const [search_active, set_search_active] = useState<boolean>(false)
  const [search_term, set_search_term] = useState<string>("")
  const dynamic_search = (str: string) =>{
    return axios.get(`https://swapi.dev/api/people/?search=${str}`).then((res)=>res.data)
  }
  const search_query = useQuery(["search", search_term], ()=> dynamic_search(search_term), {
    enabled: false
  } )

  const queryClient = new QueryClient()
  const search_for_term = () =>{
    search_query.refetch().then((data)=>{
      console.log(data)
    }).catch((e)=>{

    })

  }
  useEffect(()=>{

  }, [,search_term])
  const set_search =(str: string)=>{
    console.log(str)
    set_search_term(str)
    set_search_active(true)
  }
  return (
      <SafeAreaView style={{height: "100%", width: "100%"}} >
          <View style={{...styles.container, ...global_styles.flex_col_start}}>
                <TopSearchBar _submit={search_for_term} search_term={set_search} />
                <Header1>
                    Characters 
                </Header1>  
                {search_active ? (
                  <>
                  {search_query.isLoading ? (
                    <View style={{width: "100%", ...global_styles.flex_col_start}} >
                    <ActivityIndicator style={{marginBottom: 20}} size="large" color="#FFE81F" />
                    <Text1 color="#FFE81F" size={16} weight="300" >
                        {`Searching for ${search_term}`}
                    </Text1>
                    </View>
                 ): (
                  <>  
                  {search_query.data?.count > 0 && !search_query.isError ? (
                    <View style={{width: "100%", ...global_styles.flex_col_start}}  >
                        <Text1 color="#FFE81F" size={16} weight="300" >
                          {`Found ${search_query.data.count} match(es) for ${search_term}`}
                        </Text1>
                        <FlatList  data={search_query.data.results} keyExtractor={(item, index)=>(index.toString())} renderItem={(item)=>(
                              <QueryClientProvider client={query_item} >
                                  <ListElement _url={item.item.url} nav={navigation} name={item.item.name} gender={item.item.gender} species={item.item.species} />
                              </QueryClientProvider>
                          )} />
                        
                    </View>
                    
                  ): (
                    <Text1 color="#FFE81F" size={16} weight="300" >
                        {`Found 0 matches for ${search_term}`}
                    </Text1>
                  ) }
                  {search_query.isError  && (<View style={{...styles.container, width: "100%", height: "100%"}} >
                                              <Feather name="x-circle" size={30} color="#FFE81F" />
                                              <Text1 color="#FFE81F" size={16} weight="300" >
                                                  Oops! something went wrong
                                              </Text1>
                                            </View> )}
                  
                  </>
                 )}
                 <View style={{...global_styles.flex_row_center, marginTop: 100, width: "100%"}} >
                  <Button mode="text" onPress={()=>{
                      set_search_active(false)
                    }} color="#FFE81F" >
                      Back
                    </Button>
                 </View>
                  
                  </>
                ): (
                  <QueryClientProvider client={queryClient} >
                    <List1 nav={navigation} start_index={0} />
                  </QueryClientProvider>
                )}
                 
                
                
            </View>
            
      </SafeAreaView  >
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: "black"
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

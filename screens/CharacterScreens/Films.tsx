import { StyleSheet,  Text,  View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { global_styles } from '../../GlobalStyles'
import Text1 from '../../components/Text/Text1'
import { ActivityIndicator, List, Paragraph } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Feather } from '@expo/vector-icons'

const Films = ({route, navigate}: {route: any, navigate: any}) => {

  const film_query = useQuery(`${route.params.data_url}`, ()=>axios.get(route.params.data_url).then((res)=>res.data))
  const [film_name, set_film_name] = useState<string>("")
  const [film_description, set_film_description] = useState<string>("")
  useEffect(() => {
    set_film_name(film_query.data?.title)
    set_film_description(film_query.data?.opening_crawl)
    return () => {
      
    }
  }, [, film_query.isLoading])

  if (film_query.isLoading) return (<View style={{...styles.container, width: "100%", height: "100%"}} >
            <ActivityIndicator style={{marginBottom: 20}} size="large" color="#FFE81F" />
            <Text1 color="#FFE81F" size={16} weight="300" >
                Loading Film Information
            </Text1>
        </View>)
        if (film_query.isError) return <View style={{...styles.container, width: "100%", height: "100%"}} >
            <Feather name="x-circle" size={30} color="#FFE81F" />
            <Text1 color="#FFE81F" size={16} weight="300" >
                Oops! something went wrong
            </Text1>
        </View> 
  

  const attributes: any = {
    title: "A new hope",
    description: "Amid a galactic civil war, Rebel Alliance spies have stolen plans to the Galactic",
    director: "don",
    episode_id: "4",
    producer: "don",
    release_date: "1977-05-25",

  }
  return (
    <ScrollView contentContainerStyle={styles.container} >
      <Text1 color="#FFE81F" size={24} weight="bold" >
        {film_name}
      </Text1>
      <View style={styles.description_container} >
        <Paragraph  style={{color: "white", width: "100%", textAlign: "center"}} >
        {film_description}
        </Paragraph>
      </View>
      <View style={{...global_styles.flex_col_start_start, width: "100%"}} >
        <ScrollView style={styles.list_area} >
          <View style={{width: 400}} ></View>
          {Object.keys(film_query.data).map((key)=>{
            if(["characters", "planets", "starships", "vehicles", "species", "opening_crawl", "created", "url", "edited"].indexOf(key) == -1){
            return (
            <List.Item style={{marginBottom: 10}}  key={key} title={<Text1 size={16} color="white" weight='600'  >
            {key.toLocaleUpperCase()}
            </Text1>}
            description={
                <Text1 color="#FFE81F" size={18} weight="bold" >
                    {film_query.data[key]}
                </Text1>
            }
            />    
          )}
        }
          ) 
          }
                      
        </ScrollView>
      </View>
      
    </ScrollView>
  )
}

export default Films

const styles = StyleSheet.create({
  container: {
    ...global_styles.flex_col_start,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10
  },
  description_container : {
    ...global_styles.flex_col_start_start,
    width: "100%",
    padding: 10
  },
  list_area: {
    width: 300,
    paddingBottom: 100
  }
})
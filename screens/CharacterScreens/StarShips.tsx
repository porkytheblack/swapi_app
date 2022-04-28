import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { global_styles } from '../../GlobalStyles'
import Text1 from '../../components/Text/Text1'
import { ActivityIndicator, List } from 'react-native-paper'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Feather } from '@expo/vector-icons'

const StarShips = ({route}: {route: any}) => {

  const starship_query = useQuery(`${route.params.data_url}`, ()=>axios.get(route.params.data_url).then((res)=>res.data))
  const [starship_name, set_starship_name] = useState<string>("")
  useEffect(() => {
    set_starship_name(starship_query.data?.name)
    return () => {
      
    }
  }, [, starship_query.isLoading])

  if (starship_query.isLoading) return (<View style={{...styles.container, width: "100%", height: "100%"}} >
            <ActivityIndicator style={{marginBottom: 20}} size="large" color="#FFE81F" />
            <Text1 color="#FFE81F" size={16} weight="300" >
                Loading Starship Information
            </Text1>
        </View>)
        if (starship_query.isError) return <View style={{...styles.container, width: "100%", height: "100%"}} >
            <Feather name="x-circle" size={30} color="#FFE81F" />
            <Text1 color="#FFE81F" size={16} weight="300" >
                Oops! something went wrong
            </Text1>
        </View> 

  
  return (
    <View style={styles.container} >
      <Text1 color="#FFE81F" size={24} weight="bold" >
        {starship_name}
      </Text1>
      <ScrollView  style={{width: "100%", marginTop: 0, marginBottom: 30}} >
            {Object.keys(starship_query.data).map((key)=>{
              if(["pilots", "films", "created", "edited", "url"].indexOf(key) == -1){
                return (
                  <List.Item style={{marginBottom: 10}} key={key} title={<Text1 size={16} color="white" weight='600'  >
                            {key.toLocaleUpperCase()}
                        </Text1>}
                        description={
                            <Text1 color="#FFE81F" size={18} weight="bold" >
                                {starship_query.data[key]}
                            </Text1>
                        }
                        />
                )
              }
            }
                        
                    )}
        </ScrollView>
      </View>
  )
}
export default StarShips

const styles = StyleSheet.create({
  container: {
    ...global_styles.flex_col_start,
    height: "100%",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10
  },
})
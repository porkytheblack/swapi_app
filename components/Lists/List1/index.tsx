import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { global_styles } from '../../../GlobalStyles'
import ListElement from './ListElement'
import Pagination from '../../Pagination'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import axios from 'axios'
import { ActivityIndicator } from 'react-native-paper'
import Text1 from '../../Text/Text1'
import { Feather } from '@expo/vector-icons';


const List1 = ({start_index, nav}:{start_index: number, nav: any}) => {
    const ListElementQuery = new QueryClient()
    const [current_url, set_current_url] = useState<string>("https://swapi.dev/api/people/")
    const [next_url, set_next_url] = useState<string>("")
    const [previous_url, set_previous_url] = useState<string>("https://swapi.dev/api/people/")
    const [all_urls, set_all_urls] = useState<string[]>(["https://swapi.dev/api/people/"])
    const [pages_counted, set_pages_counted] = useState<number>(0)
    const [retry, set_retry] = useState<boolean>(false)

    const next_page =() =>{
        var urls = all_urls
        urls.push(next_url)
        var current = current_url
        set_current_url(next_url)
        set_pages_counted(pages_counted+1)
    }
    const previous_page = () =>{
        var current = current_url
        set_current_url(all_urls[pages_counted-1])
        set_next_url(current)
        set_pages_counted(pages_counted-1)
    }


    const [unique_species, set_unique_species] = useState<string[]>([])
    const {isLoading, isError, data} = useQuery(`fetch_people${pages_counted}`, ()=>{
        return axios.get(current_url).then((res)=>res.data)
    })

    useEffect(() => {
        var temp = all_urls;
        const rn = () =>{
            if(pages_counted < data?.count){
                set_next_url(data?.next)
                if(all_urls.indexOf(data?.next) == -1){
                    temp.push(data?.next)
                    set_all_urls(temp)
                }
            }
        }
        rn()
      return () => {
          rn()
      }
    }, [,isLoading, pages_counted])
    

    if (isLoading) return (<View style={styles.container} >
        <ActivityIndicator style={{marginBottom: 20}} size="large" color="#FFE81F" />
        <Text1 color="#FFE81F" size={16} weight="300" >
            Loading Characters
        </Text1>
    </View>)
    if (isError) return <View style={styles.container} >
        <Feather name="x-circle" size={30} color="#FFE81F" />
        <Text1 color="#FFE81F" size={16} weight="300" >
            Oops! something went wrong
        </Text1>
    </View> 
  return (
      <>

    <FlatList ListFooterComponent={<Pagination prev={previous_page} next={next_page} current={pages_counted} max={data.count} min={0} />} ListFooterComponentStyle={{
        width: "100%",
        ...global_styles.flex_row_center,
        marginBottom: 50
    }} data={data.results} keyExtractor={(item, index)=>(index.toString())} renderItem={(item)=>(
        <QueryClientProvider client={ListElementQuery} >
            <ListElement _url={item.item.url} nav={nav} name={item.item.name} gender={item.item.gender} species={item.item.species} />
        </QueryClientProvider>
    )} />
    
    </>
    
  )
}

export default List1

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        ...global_styles.flex_col_start,
        padding: 10,
        paddingTop: 100
    }
})
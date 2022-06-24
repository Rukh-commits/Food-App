import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Image,FlatList} from 'react-native';
import { Searchbar,Button } from 'react-native-paper';
import { LogBox } from 'react-native';


export default function SearchBlog({ route, navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [data, setData] = useState([]);
  const [getJson, setJson] = useState('');
  const[load,setLoad]=useState(true)
  const[searchBool,setSearchBool] = useState(false)

  const onChangeSearch = query => setSearchQuery(query);
  
  const getData = ()=> {
  fetch("https://nutracal-7efd5-default-rtdb.firebaseio.com/blogs.json")
  .then(response => response.json())
  .then(result =>
  { 

    setData(Object.values(result));
  })
  .catch(error => console.log('error', error));
}

const searchBlog=()=>{

    if( searchQuery!=''){
      let array = []
      const item2 = data.find(item=>{
      if(item.title===searchQuery){
        return item
        }
      })
       if(item2 ==undefined)
      {
        alert("Blog not found")
        setSearchQuery('')
      }
    
      else if(item2!=undefined)
      {
        array.push(item2)
        setData(array)
        setSearchQuery('')
      }
    }
    else{
      alert("Search field empty")
      setSearchQuery('')
      getData()
  }
}

  useEffect(()=>{
    LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.']);
  if(load==true && searchBool==false){
    console.log("Ran for Search False")
    getData()
    setLoad(false)
  }
  else if(load==true && searchBool==true){
    console.log("Ran for Search True")
    searchBlog()
    setLoad(false)
    setSearchBool(false)
  }
  },[load])
  



  return (
    <View style={styles.container}>
     <Searchbar
            placeholder="Search blogs..."
            onChangeText={onChangeSearch}
            value={searchQuery}
            onIconPress={()=>
            {
              setLoad(true)
              setSearchBool(true)
            }}/>

    <View>
        <FlatList
        data={data}
        renderItem={({index,item})=> 
        
        <View key={item.key}>
        <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('Blog',{title:item.title})}>
          <View style={styles.column}>
          <Text style={{letterSpacing:2}}>ARTICLE</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Button icon='play' style={styles.btn} color="#FF8473" labelStyle={{ color: "white"}}   mode="contained" onPress={() => navigation.navigate('Blog',{title:item.title})}>Read Now</Button>
          </View>
          <Image style={styles.icon} source={{uri: item.img}}/>
        </TouchableOpacity>
        </View>
        }
        />            
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    paddingTop: 30,
    backgroundColor: '#ffffff',
    padding: 8,
    flex:1,
    paddingBottom:70,
    
  },
  title: {
    color:"black",
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:10,
    marginTop:5,

  },

  column:{
    width:150,
  },

  btn:{
    alignSelf:"flex-start"
  },

  touchable:{
    marginTop:10,
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center",
    paddingTop:20,
    paddingBottom:20,
    borderRadius:10,
    backgroundColor:"#FFF7F1",
  },

  icon:{
    height:100,
    width:100,
  },
});


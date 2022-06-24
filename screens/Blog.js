import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet,FlatList,TouchableOpacity,Image,} from 'react-native';
import { Avatar,TextInput,Button} from 'react-native-paper';
import { ScrollView } from 'react-native-virtualized-view';
import auth from '@react-native-firebase/auth';

export default function Blog({ route, navigation }) {
  const { title } = route.params;
  const[comment,setComment]=useState('');
  const [data, setData] = useState([]);
  const [item, setItem] = useState([]);
  const [getJson, setJson] = useState('');

  
const setDataFirebase = ()=> {
  var requestOptions = {
  method: 'POST',
  body: JSON.stringify({
     title:"How to meal plan?",
     description:"hehehehehehehehhe",
comments:[{id:1, name:"Frank Odalthh", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",time:"9:58 am"},{id:2, img: "https://bootdey.com/img/Content/avatar/avatar6.png", name:"John DoeLink",comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",time:"9:58 am"}, {id:3, img: "https://bootdey.com/img/Content/avatar/avatar7.png", name:"March SoulLaComa", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor",time:"9:58 am"},{id:4, img: "https://bootdey.com/img/Content/avatar/avatar2.png", name:"Finn DoRemiFaso",  comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",time:"9:58 am"},{id:5, img: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Maria More More",  comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",time:"9:58 am"}]
  }
)

 
};

fetch("https://nutracal-7efd5-default-rtdb.firebaseio.com/blogs.json", requestOptions)
  .then(response => response.json())
  .then(result =>
  { 
    console.log(result)


  })
  .catch(error => console.log('error', error));
}


  const getData = ()=> {
  fetch("https://nutracal-7efd5-default-rtdb.firebaseio.com/blogs.json")
  .then(response => response.json())
  .then(result =>
  { 
   
    // console.log(result)
    setData(Object.values(result));
    console.log(title)
    

    
  })
  .catch(error => console.log('error', error));
}

  useEffect(() => {
    getData();
    // setDataFirebase();
   
  },[]);



  return (
    <View style={styles.container}>
     <ScrollView>   
   
    <View style={{}}>
    {
        data.map(item=>{
        if(item.title==title){
   
        var description=JSON.stringify(item.description);
        const description2 = description.split("_").join("\n")
        return(
          <View>
          <View style={styles.cell}>
          {/* <Image style={{alignSelf:"center"}} source={{uri: item.img}} /> */}
          <Image
          style={{
            height: 150,
            width: 400,
            alignSelf:"center"
          }}
          source={{uri: item.img}}
        />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{description2}</Text>
          </View>
           <Text style={styles.title}>Comments:</Text>
               <View style={{width:370, alignItems:"center"}}>
        <TextInput style={{width:370}} placeholder="Add a comment..."  value={comment.value} mode="outlined"  multiline={true}></TextInput>
        <Button style={styles.btn} color="#90C888" labelStyle={{ color: "white"}}  mode="contained" onPress={{}}>Comment</Button>
          </View>
          

      <FlatList
        style={styles.root}
        data={item.comments}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          return(
            <View style={styles.container2}>
              <TouchableOpacity onPress={() => {}}>
                <Image style={styles.image} source={{uri: Notification.img}}/>
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text  style={styles.name}>{Notification.name}</Text>
                  <Text style={styles.time}>
                    9:58 am
                  </Text>
                </View>
                <Text style={styles.comment}>{Notification.comment}</Text>
              </View>
            </View>
          );
        }}/>
           </View>
          );}
          
    })
      
      }
      
    </View>



       </ScrollView>


    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: "#ffffff",
    padding:24,
  },
   title: {
    marginTop:30,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color:"black",
  },
    description: {
    marginTop:10,
    fontSize: 16,
    textAlign: 'justify',
    color:"grey",
    lineHeight:25,
    marginRight:20,
    color:"black",
  },


  btn:{
    marginTop:10,
    width:140,
    marginBottom:15,
    alignSelf:"flex-end"
  },

  root: {
    marginTop:10,
  },
  container2: {
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
 
  },
  content: {
    marginLeft: 16,
    flex: 1,
    backgroundColor: "#f1f1f1",
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:25,
    borderRadius:15

    
 
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,

  },
  separator: {
    height: 3,
    backgroundColor: "#ffffff"
  },
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  time:{
    fontSize:11,
    color:"#808080",
    color:"black",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
    color:"black",
  },

  comment:{
    textAlign:"left",
    width:200,
    color:"black",
  },
});

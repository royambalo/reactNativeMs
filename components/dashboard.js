import React, { Component } from 'react';
import { StyleSheet, View, Text,ActivityIndicator,FlatList } from 'react-native';
import  * as firebase from 'firebase'
import {apiUrl,doApiGet} from '../core/api.service'
import {Card,Button,Title,IconButton,Paragraph,Snackbar} from 'react-native-paper'
import ADDEEDIT from './add_edit_dialog'
export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = { 
      data: [],
      item:null,
      isLoading:false,
      edit:false,
      visible:false,
      errorMessage:''
    }
  }
  componentDidMount(){
    this.getData();
     }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  
  getData(){
    this.setState({ isLoading: true });
    fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
      this.setState({ data: json.data });
    })
    .catch((error) => this.setState({errorMessage:error,visible:true}))
    .finally(() => {
      this.setState({ isLoading: false });
    }); 
  }
  deleteItem(id){
    this.setState({isLoading:true})
    fetch("http://dummy.restapiexample.com/public/api/v1/delete/"+id,{method:'DELETE'})
    .then((response) => response.json())
    .then((data)=>{this.getData()})
    .catch((error) => this.setState({errorMessage:error,visible:true}))
    .finally(()=>{
      this.setState({isLoading:false})
    });
  }
  editItem(item){
    this.setState({item:item,edit:true})
  }
  cb(dateFromChild,id){
     this.setState({edit:false});
     if(dateFromChild){
       this.setState({isLoading:true});
       
       let data={
         name:dateFromChild.name,
         salary:dateFromChild.salary,
         age:dateFromChild.age
        }
        if(id){
      fetch('http://dummy.restapiexample.com/api/v1/update/'+id,
      {method:'PUT',body:JSON.stringify(data)})
      .then((response) => response.json())
      .then((data)=>console.log(data))
      .catch((error) => this.setState({errorMessage:error,visible:true}))
      .finally(()=>{this.setState({isLoading:false})})
    }
    else{
      fetch('http://dummy.restapiexample.com/api/v1/create',
      {method:'POST',body:JSON.stringify(data)})
      .then((response) => response.json())
      .then((data)=>console.log(data))
      .catch((error) => this.setState({errorMessage:error,visible:true}))
      .finally(()=>{this.setState({isLoading:false})})

    }
  }
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }  
    if(this.state.edit){
      return(
        <View style={styles.preloader}>
          <ADDEEDIT item={this.state.item} cb={this.cb.bind(this)} />
        </View>
      )
    } 
    return(
      <View style={styles.container}>
       <Button style={styles.Button} mode="contained" onPress={()=>this.editItem()}>     
        Add new employee</Button>
      <FlatList style={styles.FlatList}
      data={this.state.data}
      keyExtractor={({ id }, index) => id}
      renderItem={({ item }) => (
        <Card
        style={styles.Card}
        >
          <Card.Content style={styles.Content}> 
            <Title>{item.employee_name}</Title>
            <Paragraph>Salary :{item.employee_salary}$</Paragraph>
          </Card.Content>
          <Card.Actions style={styles.Actions}>
            <IconButton style={styles.button} size={25} icon="account-edit" onPress={()=>this.editItem(item)}/>
            <IconButton size={25} icon="delete" onPress={()=>this.deleteItem(item.id)}/>
            </Card.Actions>
        </Card>
      )}/>

      <Snackbar style={styles.Snackbar}
        visible={this.state.visible}
        onDismiss ={()=>this.setState({visible:false})}
        action={{
          label: 'Close',
          onPress: () => {
            this.setState({visible:false})
          },
        }}
        >
          {this.state.errorMessage}
          </Snackbar> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'floralwhite',
  },
  Button:{
    backgroundColor:'royalblue',
    borderRadius:0
  },
  FlatList:{
        direction:'rtl',
        margin:10
  },
  Card:{
    borderColor:'#e4e6e8',
    backgroundColor:'ghostwhite',
    borderStyle:'solid',
    borderWidth:1,
    marginBottom:5,
    borderRadius:5,

    },
    Snackbar:{
      width:'100%',
      marginLeft:'10%',
      color:'#721c24',
      backgroundColor: '#f44336'
    },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});
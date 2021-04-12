import React, { Component } from "react";
import {StyleSheet, View,Alert } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  TextInput,
} from "react-native-paper";

export default class ADDEDIT extends Component {
  constructor() {
    super();
    this.state = {
      name:'',
      salary:null,
      age:null,
      }
  }
  componentDidMount() {
    if(this.props.item){
      this.setState({
        name:this.props.item.employee_name,
        salary:this.props.item.employee_salary,
        age:this.props.item.employee_age
      })
    }
  }
  cancel(){
    this.props.cb();
  }
  closeDialog() {
    if(this.state.name&&this.state.salary&&this.state.age){
      this.props.cb(this.state,this.props.item?.id);
    }
      else{
        Alert.alert('Enter details to Save!')
      }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  render() {
    return (
      <View>
        <Portal>
          <Dialog
            visible="true"
            onDismiss={() => this.cancel()}
          >
            <Dialog.Title>Add Edit Employee</Dialog.Title>
            <Dialog.Content>
              <TextInput
                style={styles.inputStyle}
                label="Name"
                value={this.state.name}
                onChangeText={(val) => this.updateInputVal(val, "name")}
              />
              <TextInput
                style={styles.inputStyle}
                label="Salary"
                value={this.state.salary}
                onChangeText={(val) => this.updateInputVal(val, "salary")}
              />
               <TextInput
                style={styles.inputStyle}
                label="Age"
                value={this.state.age}
                onChangeText={(val) => this.updateInputVal(val, "age")}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => this.closeDialog()}>Save</Button>
              <Button onPress={() => this.cancel()}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    padding:0,
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
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

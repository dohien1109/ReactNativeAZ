import React from "react";
import {Component} from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
    Alert,
} from 'react-native';
import {Cell, Section, TableView} from 'react-native-tableview-simple';

export default class ListCustomerController extends Component { 
  
  static navigationOptions= ({ navigation, screenProps }) => ({

    headerStyle: {
      backgroundColor: 'red',
    }
  });

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={styles.container_text}>
          <View style= {{flexDirection: 'row',justifyContent:'space-between'}}>
              <Text style = {{fontSize: 18, color:'black' }}>
                {`${[item.tencongty]}`}
              </Text>

              <Text style = {{fontSize: 15, color:'red',paddingRight: 20}}>
               {`${[item.tenviettat]}`}
             </Text> 
          </View>
         
          <View style= {{flexDirection: 'row', marginTop: 20, justifyContent:'space-between'}}>
              <Text style = {{fontSize: 15, color:'gray'}}>
                    {`${[item.didong]}`}
              </Text>

              <Text style = {{fontSize: 15, color:'black',paddingRight: 20}}>
                    {`${[item.email]}`}
              </Text>
          </View>

        </View>
      </View>
    );
  }

  renderSeparator = () => {
    return (
      <View 
        style={{height: 1, width:'100%', backgroundColor:'#DDDDDD', marginLeft: 10}}
      ></View>
    );
  }

    state = {
      data: []
    };

    componentDidMount() {
      this.handlePress();
    }

    handlePress = async () => {
    const url = `http://appdemo.azmax.vn/services/mobileapi.ashx`;
    this.setState({ loading: true });

    fetch(url, {
      method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "method":"customers",
                "rtype": 1,
                "seckey":"azmax"
            })
     })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res["data"],
          error: res.error || null,
          isLoading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
      }

    render() {
      return (
        this.state.isLoading
        ?
        <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
            <ActivityIndicator size="large" color="black" animating/>
        </View>
        :
        <View style={styles.headerView}>
          <FlatList
            data=  {this.state.data}
            renderItem= {this.renderItem}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={this.renderSeparator}
          ></FlatList>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    stage: {
      paddingTop: 0,
      paddingBottom: 0
    },
    headerView: {
      flex: 1,
      backgroundColor:'#F5FCFF'
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      marginRight:16,
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 5,
      marginLeft: 10,
      backgroundColor: '#FFF',
      elevation: 2,
    },

    container_text: {
      flex: 1
  },
  });


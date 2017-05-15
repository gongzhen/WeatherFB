/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View,
  ScrollView
} from 'react-native';

import {StackNavigator} from 'react-navigation'

class CityWeather extends Component {

  render(){
    return(
    <View>
       <Text onPress={this.props.onPress ? this.props.onPress() : null}>
         {this.props.name}{this.props.temp}{this.props.weather}</Text>
    </View>
    )
  }

}

class MasterScreen extends Component {
  
  static navigationOptions = {
    title: 'Weather',
  };  

  constructor(){
    super();

    this.state = {
      cities: [
        { name: 'San Jose', id: 5392171 },
        { name: 'New York', id: 5128581 },
        { name: 'London', id: 2643744 },
        { name: 'Paris', id: 2968815 },
        { name: 'Hong Kong', id: 1819729 },
        { name: 'Singapore', id: 1880252 },
        { name: 'Beijing', id: 1816670 },
        { name: 'Sydney', id: 6619279 },
        { name: 'São Paulo', id: 3448439 },
        { name: 'San Juan', id: 4568138 },
        { name: 'Mumbai', id: 1275339 },
        { name: 'Reykjavík', id: 6692263 },
      ],      
    }
  }

  componentDidMount() {
    const ids = this.state.cities.map(city => city.id).toString();
    fetch(
      `http://api.openweathermap.org/data/2.5/group?units=imperial&APPID=b1b35bba8b434a28a0be2a3e1071ae5b&id=${ids}`
    )
    .then(res => res.json())
    .then(body => body.list.map(city => {
      return {
        id: city.id,
        name: city.name,
        temp: city.main.temp,
        icon: 'http://openweathermap.org/img/w/' + city.weather[0].icon + '.png',
        weather: city.weather[0].main,        
      }
    }))
    .then(cities => {
      console.log(cities)
      this.setState({
        cities:cities
      })
    })
  }

  render() {
    return (
      <ScrollView>
        {this.state.cities.map((item, index) => {
          return <CityWeather 
            key={item.id} 
            name ={item.name} 
            temp = {item.temp} 
            weather={item.weather}
            onPress={() => () => this.props.navigation.navigate('Detail', {
              cityId:item.id
            })}
            />
        })}
      </ScrollView>     
    );
  }
}

class DetailScreen extends React.Component{
  static navigationOptions = {
    title: 'Details',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Detailed weather information coming soon.
        </Text>
      </View>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default (MainNavigator = StackNavigator({
  Master: { screen: MasterScreen },
  Detail: { screen: DetailScreen },
}));

AppRegistry.registerComponent('WeatherFB', () => MainNavigator);

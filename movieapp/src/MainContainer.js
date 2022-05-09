import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
//Screens
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import FavoriteScreen from "./screens/favoriteScreen";
import { api_key } from "./Utils/constants";

const Tab = createBottomTabNavigator();

export default class MainContainer extends Component {
  state = {
    isLoading: true,
    allGenres: []
  };

  componentDidMount() {
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        allGenres: responseJson.genres,
      });
    })
    .catch((error) => console.error(error));
  }

  render(){
    const Home = (props) => (
      <HomeScreen genres={this.state.allGenres} />
    );
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName,
              routeName = route.name;
            if (routeName === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (routeName === "Search") {
              iconName = focused ? "ios-search" : "ios-search-outline";
            } else if (routeName === "Favorite") {
              iconName = focused ? "ios-heart" : "ios-heart-outline";
            }
  
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favorite" component={FavoriteScreen} />
      </Tab.Navigator>
    );
  }
}

import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';
import Search from '../Components/Search';
import Home from '../Components/Home';
import News from '../Components/News';
import Vus from '../Components/Vus';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // remove the tabNav title
    }}
    mode="modal">
    <Stack.Screen name="home" component={Home} />
  </Stack.Navigator>
);

const SearchStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // remove the tabNav title
    }}>
    <Stack.Screen name="search" component={Search} />
    <Stack.Screen name="Details" component={FilmDetail} />
  </Stack.Navigator>
);

const FavoritesStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // remove the tabNav title
    }}>
    <Stack.Screen name="Favories" component={Favorites} />
    <Stack.Screen name="Details" component={FilmDetail} />
  </Stack.Navigator>
);

const NewsStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // remove the tabNav title
    }}>
    <Stack.Screen
      name="news"
      component={News}
      options={{title: 'Les Derniers Films'}}
    />
    <Stack.Screen name="Details" component={FilmDetail} />
  </Stack.Navigator>
);

const VusStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // remove the tabNav title
    }}>
    <Stack.Screen
      name="vus"
      component={Vus}
      options={{title: 'Mes Films Vus'}}
    />
    <Stack.Screen name="Details" component={FilmDetail} />
  </Stack.Navigator>
);

const MoviesTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false, // remove the tabNav title
      activeBackgroundColor: '#DDDDDD',
      inactiveBackgroundColor: '#FFFFFF',
      showLabel: false,
      showIcon: true,
    }}>
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarIcon: () => (
          <Image source={require('../Images/home.png')} style={styles.icon} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchStackNavigator}
      options={{
        tabBarIcon: () => (
          <Image
            source={require('../Images/ic_search.png')}
            style={styles.icon}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesStackNavigator}
      options={{
        tabBarIcon: () => (
          <Image
            source={require('../Images/ic_favorite.png')}
            style={styles.icon}
          />
        ),
      }}
    />
    <Tab.Screen
      name="New"
      component={NewsStackNavigator}
      options={{
        tabBarIcon: () => (
          <Image
            source={require('../Images/ic_fiber_new.png')}
            style={styles.icon}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Vus"
      component={VusStackNavigator}
      options={{
        tabBarIcon: () => (
          <Image source={require('../Images/ic_vus.png')} style={styles.icon} />
        ),
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default function Navigation() {
  return (
    <NavigationContainer>
      <MoviesTabNavigator />
    </NavigationContainer>
  );
}

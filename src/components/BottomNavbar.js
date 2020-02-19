import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet} from 'react-native';

const Tab = createMaterialBottomTabNavigator();

// import screens
import Movies from '../screens/Movies';
import People from '../screens/People';

const BottomNavbar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Movies"
      activeColor="#22B07F"
      inactiveColor="#FFFFFF"
      barStyle={styles.barStyle}>
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarLabel: 'Movies',
          tabBarIcon: ({focused}) => (
            <Icon name="film" color={focused ? '#22B07F' : '#FFF'} size={16} />
          ),
        }}
      />
      <Tab.Screen
        name="People"
        component={People}
        options={{
          tabBarLabel: 'People',
          tabBarIcon: ({focused}) => (
            <Icon name="users" color={focused ? '#22B07F' : '#FFF'} size={16} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: '#343336',
  },
});

export default BottomNavbar;

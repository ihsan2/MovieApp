import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Root} from 'native-base';
import {Provider} from 'react-redux';
// import store
import store from './src/public/redux/store';

//import screen
import BottomNavbar from './src/components/BottomNavbar';
import DetailPeople from './src/screens/DetailPeople';
import DetailMovie from './src/screens/DetailMovie';
import SearchMovies from './src/screens/SearchMovies';
import SearchPerson from './src/screens/SearchPerson';

const Stack = createStackNavigator();

// wrap all component with redux Provider and the store
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Navbar" component={BottomNavbar} />
              <Stack.Screen name="DetailMovie" component={DetailMovie} />
              <Stack.Screen name="DetailPeople" component={DetailPeople} />
              <Stack.Screen name="SearchPerson" component={SearchPerson} />
              <Stack.Screen name="SearchMovies" component={SearchMovies} />
            </Stack.Navigator>
          </NavigationContainer>
        </Root>
      </Provider>
    );
  }
}

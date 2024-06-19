import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Auth/LoginScreen';
import Options from './Auth/Options';
import Scan from './Auth/Scan';
import Credit from './Auth/Credit';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Options"
          component={Options}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Scan"
          component={Scan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Credit"
          component={Credit}
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen name="FeedingFeed" component={FeedingFeedPage} /> */}
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

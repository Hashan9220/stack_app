import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screen/Home';
import Welcome from '../screen/Welcome';
import TaskPage from '../screen/TaskPage';
import Register from '../screen/Register';
import Login from '../screen/Login';
import AddUser from '../screen/Users';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TaskPage" component={TaskPage} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AddUser" component={AddUser} />
    </Stack.Navigator>
  );
};

export default StackNav;

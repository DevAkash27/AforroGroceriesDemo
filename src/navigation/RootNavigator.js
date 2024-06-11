import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Home from '../screens/home/Home';
import ProductDetails from '../screens/home/ProductDetails';
import CartScreen from '../screens/cart/CartScreen';
import AddressPaymentScreen from '../screens/checkout/AddressPaymentScreen';
import CheckoutScreen from '../screens/checkout/CheckoutScreen';
import MockApiList from '../screens/mockApiList/MockApiList';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Address"
          component={AddressPaymentScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Mock"
          component={MockApiList}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

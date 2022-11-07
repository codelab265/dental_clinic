import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from './screens/Welcome'
import Login from './screens/Login'
import Register from './screens/Register'
import HomeTab from './screens/HomeTab'
import './api'
import CreateAppointment from './screens/CreateAppointment'
import Services from './screens/Services'
import Dentists from './screens/Dentists'
import ViewAppointment from './screens/ViewAppointment'
import EditAppointment from './screens/EditAppointment'
import ViewInvoice from './screens/ViewInvoice'

Services

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen name="Register" component={Register}></Stack.Screen>
        <Stack.Screen
          name="HomeTab"
          component={HomeTab}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="CreateAppointment"
          component={CreateAppointment}
          options={{ headerTitle: 'Appointment' }}
        ></Stack.Screen>
        <Stack.Screen
          name="Services"
          component={Services}
          options={{ headerTitle: 'Clinic Services' }}
        ></Stack.Screen>
        <Stack.Screen
          name="Dentists"
          component={Dentists}
          options={{ headerTitle: 'Clinic Dentists' }}
        ></Stack.Screen>
        <Stack.Screen
          name="ViewAppointment"
          component={ViewAppointment}
          options={{ headerTitle: 'View Appointment' }}
        ></Stack.Screen>
        <Stack.Screen
          name="EditAppointment"
          component={EditAppointment}
          options={{ headerTitle: 'Edit Appointment' }}
        ></Stack.Screen>
        <Stack.Screen
          name="ViewInvoice"
          component={ViewInvoice}
          options={{ headerTitle: 'Invoice Details' }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

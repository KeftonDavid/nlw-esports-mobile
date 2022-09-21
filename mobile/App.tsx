import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_900Black
} from '@expo-google-fonts/inter';



import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import './src/services/notificationConfigs';
import './src/services/getPushNotificationToken';
import { Subscription } from 'expo-modules-core';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';

import * as Notifications from 'expo-notifications';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_900Black
  });

  const getNotificationListener = useRef<Subscription>();
  const resNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  })

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    console.log(notification);
    })

    resNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      
    })

    return () => {
      if (getNotificationListener.current && resNotificationListener.current){
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(resNotificationListener.current);
      }
    }
  })

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    {fontsLoaded? <Routes/> : <Loading/> }
    </Background>
  );
}

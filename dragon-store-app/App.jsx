import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';
import {useEffect,useState} from 'react'

import MainNavigator from './src/nav/mainNavigator';

import { store } from './src/components/store';
import { Provider } from 'react-redux';
import { createSessionsTable } from './src/db';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Montserrat': require('./global/fuentes/Montserrat-Variable.ttf'),
    'PressStart2P': require('./global/fuentes/PressStart2P-Static.ttf')
  });

  useEffect(() => {
    createSessionsTable().catch((tableError) => console.log("Error al crear la tabla de sesiones", tableError));
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <MainNavigator />
      <StatusBar style="light" />
    </Provider>
  );
}

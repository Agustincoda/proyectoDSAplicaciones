import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';
import {useEffect,useState} from 'react'

import MainNavigator from './src/nav/mainNavigator';

import { store } from './src/components/store';
import { Provider } from 'react-redux';
import { createSessionsTable, createPreferencesTable } from './src/db';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Montserrat': require('./global/fuentes/Montserrat-Variable.ttf'),
    'PressStart2P': require('./global/fuentes/PressStart2P-Static.ttf')
  });

  // Tiene que correr antes que cualquier pantalla intente leer o
  // guardar una sesión (ver src/db/index.jsx), así que va acá, en el
  // componente raíz, en vez de en la pantalla de login.
  useEffect(() => {
    createSessionsTable().catch((tableError) => console.log("Error al crear la tabla de sesiones", tableError));
    createPreferencesTable().catch((tableError) => console.log("Error al crear la tabla de preferencias", tableError));
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

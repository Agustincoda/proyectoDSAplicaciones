import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import TabNavigator from './src/Navegacion/navegacionSectores'; 


import { Provider } from 'react-redux';
import { store } from './src/componentes/tienda'; 

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Montserrat': require('./global/fuentes/Montserrat-Variable.ttf'), 
    'PressStart2P': require('./global/fuentes/PressStart2P-Static.ttf')  
  });

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
      <TabNavigator /> 
      <StatusBar style="light" /> 
    </Provider>
  );
}

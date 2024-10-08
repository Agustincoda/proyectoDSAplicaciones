import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';
import CategoriesScreen from './src/pantallas/categorias';
import ProductsScreen from './src/pantallas/productos';
import Header from './src/componentes/header';
import {useEffect,useState} from 'react'

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Montserrat': require('./global/fuentes/Montserrat-Variable.ttf'),
    'PressStart2P': require('./global/fuentes/PressStart2P-Static.ttf')
  });

  const [category, setCategory] = useState("")
  //console.log(category)

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Header />
      {
        category
        ?
        <ProductsScreen category={category} setCategory={setCategory}/>
        :
        <CategoriesScreen setCategory={setCategory}  />
      }
      <StatusBar style="light" />
    </>
  );
}
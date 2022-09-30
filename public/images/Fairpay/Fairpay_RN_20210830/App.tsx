import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'i18n';
import 'utils/firebase';

import {default as darkTheme} from 'constants/theme/dark.json';
import {default as lightTheme} from 'constants/theme/light.json';
import {default as customTheme} from 'constants/theme/appTheme.json';
import {default as customMapping} from 'constants/theme/mapping.json';
import AppContainer from 'navigation/AppContainer';
import ThemeContext from './ThemeContext';
import AssetIconsPack from 'assets/AssetIconsPack';
import {LogBox, StatusBar, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

LogBox.ignoreLogs(['Constants.installationId has been deprecated']);

export default function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  React.useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide();
    }, 1000);
  }, []);
  React.useEffect(() => {
    AsyncStorage.getItem('theme').then(value => {
      if (value === 'light' || value === 'dark') setTheme(value);
    });
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    AsyncStorage.setItem('theme', nextTheme).then(() => {
      setTheme(nextTheme);
    });
  };

  return (
    <SafeAreaProvider>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
        <ApplicationProvider
          {...eva}
          theme={
            theme === 'light'
              ? {...eva.light, ...customTheme, ...lightTheme}
              : {...eva.dark, ...customTheme, ...darkTheme}
          }
          //@ts-ignore
          customMapping={customMapping}>
          <StatusBar
            barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
            translucent={true}
            backgroundColor={'#00000000'}
          />
          <AppContainer cachedResources={true} />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </SafeAreaProvider>
  );
}

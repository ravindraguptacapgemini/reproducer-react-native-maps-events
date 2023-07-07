/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import MapView, { enableLatestRenderer, PROVIDER_GOOGLE } from 'react-native-maps';

enableLatestRenderer();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <SafeAreaView style={backgroundStyle}>
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        moveOnMarkerPress={false} // android only
        initialRegion={{
          latitude: 12.55825,
          longitude: 33.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsMyLocationButton={true}
        scrollEnabled={true}
        onMapReady={() => {
          console.log("Map is loaded....")
        }}
        onRegionChange={() => {
          console.log("Map is loaded....")
        }}
        onRegionChangeComplete={() => {
          console.log("Map is loaded....")
        }}
        onPress={() => {
          console.log("Map is loaded....")
        }}
        onPoiClick={() => {
          console.log("Map is loaded....")
        }}
      />
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

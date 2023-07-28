/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useReducer } from 'react';
import {
  Button,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import MapView, {
  Marker,
  enableLatestRenderer,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import LoginScreen from './src/LoginScreen';

enableLatestRenderer();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const forceUpdate = useReducer(x => x + 1, 0)[1];

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderMap = () => {
    return (
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        moveOnMarkerPress={false} // android only
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
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
        }}>
        <Marker
          key={0}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={'title'}
          description={'description'}
        />
      </MapView>
    );
  };

  // let map = renderMap();

  return (
    // <SafeAreaView style={backgroundStyle}>
    <View style={styles.page}>
      {/* {map}
      <Button
        color={'red'}
        title={'Re-render Map'}
        onPress={() => {
          forceUpdate();
        }}
      /> */}
      <LoginScreen />
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1
  },
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

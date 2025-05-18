import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './src/Components/header/header';
import HomeScreen from './src/Page/Home/homeScreen';
import Toast from 'react-native-toast-message';



export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
    <Header />
    <HomeScreen />

    <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

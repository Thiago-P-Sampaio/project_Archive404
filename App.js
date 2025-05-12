import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './src/Components/header/header';

export default function App() {
  const handleAdd = () => {
    console.log('Adicionar novo jogo');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header username="Archive404" onAdd={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 40,
  },
});

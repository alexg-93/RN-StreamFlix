import { Stack } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScreensLayout() {
  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#121212'}}>
      <Stack>
        <Stack.Screen 
          name="movieDetails" 
          options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
            onPress={() => navigation.pop()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{"Back"}</Text>
          </TouchableOpacity>
        ),
        headerStyle: { 
          backgroundColor: '#121212',
        },
        headerTitleStyle: {
          color:'white'
        },
        headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen 
          name="movieList" 
          options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
            onPress={() => navigation.pop()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        ),
        headerStyle: { 
          backgroundColor: '#121212',
        },
        headerTitleStyle: {
          color:'white',
        },
        headerTitleAlign: 'center',
          })}
        />
      </Stack>
      </SafeAreaView>
  );

  
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:14
  },
});

import { StyleSheet , Text, View } from 'react-native';


export default function NotFoundScreen() {
  return (
  
     <View style={styles.container}>
      <Text>{"Page Not Found"}</Text>
     </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

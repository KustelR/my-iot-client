import { Image, StyleSheet, Platform, Text, View, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView>
      <Text>ScrollView</Text>
<Device name="chicken" />  
<Device name="cock" />  
    </ScrollView>
  );
}

function Device(props: {name: string}) {
  return <View style={styles.device}>
    <Text style={styles.deviceHeader}>I'm {props.name}</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff0000",
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  device: {
    padding: 5
  },
  deviceHeader: {
    fontWeight: "bold"
  }
});

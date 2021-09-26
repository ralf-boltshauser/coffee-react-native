import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

const baseUrl = "http://192.168.0.38";

export default function App() {
  useEffect(() => {});

  const getState = () => {
    fetch(baseUrl + "/state")
      .then((res) => res.json())
      .then(
        (data: any) => {
          setState(data.state);
        },
        (error) => {
          setState("nicht erreichbar");
        }
      );
  };

  const [state, setState] = React.useState("nicht erreichbar");
  const toggleState = () => {
    fetch(baseUrl + "/toggle").then(() => {
      getState();
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Kaffee Steuerung</Text>
      <Text style={styles.text}>Die Kaffeemaschine ist zurzeit {state}</Text>
      <Button onPress={toggleState} title="I/O" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  heading: {
    fontSize: 30,
  },
  text: {
    marginTop: 20,
  },
});

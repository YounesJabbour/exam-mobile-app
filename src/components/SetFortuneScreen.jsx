import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

export default function SetFortuneScreen({ navigation }) {
  const [fortune, setFortune] = useState("");

  const handlePress = () => {
    const parsedFortune = parseInt(fortune, 10);

    if (isNaN(parsedFortune) || parsedFortune < 0 || parsedFortune === 0) {
      Alert.alert("Erreur", "Veuillez entrer un nombre valide.");
      return;
    }

    navigation.navigate("Game", { playerFortune: parsedFortune });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrez votre fortune</Text>
      <TextInput
        style={styles.input}
        value={fortune}
        onChangeText={setFortune}
        keyboardType="numeric"
      />
      <Button
        title="Commencer le jeu"
        style={styles.btn}
        onPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

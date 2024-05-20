import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import { getRandomInt, rollDie } from "../utils/random";
import dieImage from "../Assets/die.png";
import face1 from "../Assets/face1.png";
import face2 from "../Assets/face2.png";
import face3 from "../Assets/face3.png";
import face4 from "../Assets/face4.png";
import face5 from "../Assets/face5.png";
import face6 from "../Assets/face6.png";

const GameScreen = ({ navigation, route }) => {
  const dieFaces = [face1, face2, face3, face4, face5, face6];

  const [playerFortune, setPlayerFortune] = useState(
    route.params?.playerFortune || 100
  );
  const [casinoFortune, setCasinoFortune] = useState(getRandomInt(10, 100));
  const [message, setMessage] = useState("");
  const [dieFace, setDieFace] = useState(null);
  const [rolling, setRolling] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const playTurn = () => {
    if (rolling) return;
    setRolling(true);
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setRolling(false);
      const dieRoll = rollDie();
      setDieFace(dieRoll);

      if (dieRoll === 2 || dieRoll === 3) {
        setPlayerFortune((prev) => prev + 1);
        setCasinoFortune((prev) => prev - 1);
        setMessage("Player wins 1 euro!");
      } else {
        setPlayerFortune((prev) => prev - 1);
        setCasinoFortune((prev) => prev + 1);
        setMessage("Casino wins 1 euro!");
      }

      if (playerFortune <= 0) {
        setMessage("Casino wins! Player is bankrupt.");
      } else if (casinoFortune <= 0) {
        setMessage("Player wins! Casino is bankrupt.");
      }
    });
  };

  const terminateGame = () => {
    navigation.navigate("Auth");
  };

  useEffect(() => {
    if (playerFortune <= 0 || casinoFortune <= 0) {
      setTimeout(() => {
        navigation.navigate("Auth");
      }, 3000);
    }
  }, [playerFortune, casinoFortune]);

  const interpolateRotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ruine de Joueur</Text>
      <View style={styles.fortuneContainer}>
        <Text style={styles.fortuneText}>
          Player Fortune: {playerFortune} euros
        </Text>
        <Text style={styles.fortuneText}>
          Casino Fortune: {casinoFortune} euros
        </Text>
      </View>
      <View style={styles.dieContainer}>
        <Animated.Image
          source={dieFace ? dieFaces[dieFace - 1] : dieImage}
          style={[
            styles.dieImage,
            { transform: [{ rotate: interpolateRotation }] },
          ]}
        />
        {dieFace && <Text style={styles.dieFace}>Die Face: {dieFace}</Text>}
      </View>
      <Text style={styles.messageText}>{message}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, rolling && styles.disabledButton]}
          onPress={playTurn}
          disabled={playerFortune <= 0 || casinoFortune <= 0 || rolling}
        >
          <Text style={styles.buttonText}>
            {rolling ? "Rolling..." : "Roll Die"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={terminateGame}>
          <Text style={styles.buttonText}>Terminate Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f0f0f0",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  fortuneContainer: {
    marginBottom: 20,
  },
  fortuneText: {
    fontSize: 18,
    marginBottom: 5,
  },
  dieContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  dieImage: {
    width: 100,
    height: 100,
  },
  dieFace: {
    fontSize: 16,
    marginTop: 5,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});

export default GameScreen;

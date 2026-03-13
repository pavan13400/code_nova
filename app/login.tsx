import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//   const handleLogin = () => {

//     // TEMP USERS (later from backend)
//     if (email === "attender@lifelink.com" && password === "1234") {
//       router.replace("/attenderDashboard");
//     } 
    
//     else if (email === "patient@lifelink.com" && password === "1234") {
//       router.replace("/patientDashboard");
//     } 
    
//     else {
//       alert("Invalid credentials");
//     }

//   };
    const handleLogin = async () => {

  try {

    const res = await fetch("http://192.168.0.33:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await res.json();

    if (res.ok) {
      router.replace("/attenderDashboard");
    } else {
      alert("Invalid credentials");
    }

  } catch (error) {
    console.log(error);
    alert("Server error");
  }

};

    return (
    <View style={styles.container}>

      <Text style={styles.title}>LifeLink Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    padding: 25
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 40,
    textAlign: "center"
  },

  input: {
    backgroundColor: "#1E293B",
    padding: 15,
    borderRadius: 10,
    color: "white",
    marginBottom: 15
  },

  button: {
    backgroundColor: "#39be3b",
    padding: 15,
    borderRadius: 10,
    marginTop: 10
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
    fontSize: 16
  }

});
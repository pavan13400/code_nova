import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Hello Hub</Text>

      <TextInput placeholder="Search Services..." style={styles.input} />
      <TextInput placeholder="Enter Location" style={styles.input} />
      <TextInput placeholder="Category" style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Plumber</Text>
        <Text>Available nearby</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Electrician</Text>
        <Text>Fast service</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>AC Repair</Text>
        <Text>Verified technicians</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
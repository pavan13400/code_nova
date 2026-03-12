
import { ScrollView, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import Card from "../components/Card";
import ActionButton from "../components/ActionButton";

export default function Home() {

  const router = useRouter();

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>LifeLink Responder</Text>

      <Card>
        <Text style={styles.status}>● System Active</Text>
      </Card>

      <Text style={styles.section}>Quick Actions</Text>

      <ActionButton
        title="Scan Patient QR"
        color="#39be3b"
        onPress={() => router.push("/scanner")}
      />

      <ActionButton
        title="Create Emergency Report"
        color="#6480b8"
        onPress={() => router.push("/report")}
      />

      <ActionButton
        title="Patient Medical ID"
        color="#1F2A40"
        onPress={() => router.push("/patient")}
      />

      <ActionButton
        title="Send Emergency Alert"
        color="#FF3B3B"
        onPress={() => router.push("/alert")}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 22,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#F9FAFB",
    marginBottom: 25,
    letterSpacing: 0.5,
  },

  section: {
    color: "#94A3B8",
    fontSize: 15,
    marginTop: 20,
    marginBottom: 12,
    fontWeight: "600",
  },

  status: {
    color: "#22C55E",
    fontWeight: "700",
    fontSize: 15,
  },
});
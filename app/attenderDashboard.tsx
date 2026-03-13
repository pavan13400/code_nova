import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import ActionButton from "../components/ActionButton";
import Card from "../components/Card";

export default function AttenderDashboard() {

  const router = useRouter();

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Responder Dashboard</Text>

      <Card>
        <Text style={styles.status}>● Emergency Mode</Text>
      </Card>

      <Text style={styles.section}>Emergency Tools</Text>

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
    fontSize: 28,
    fontWeight: "800",
    color: "#F9FAFB",
    marginBottom: 25,
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
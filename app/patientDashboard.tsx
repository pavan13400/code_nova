import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import ActionButton from "../components/ActionButton";
import Card from "../components/Card";

export default function PatientDashboard() {

  const router = useRouter();

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Patient Dashboard</Text>

      <Card>
        <Text style={styles.status}>● Personal Medical Access</Text>
      </Card>

      <Text style={styles.section}>Medical Features</Text>

      <ActionButton
        title="Generate Medical QR"
        color="#8B5CF6"
        onPress={() => router.push("/MedicalQRScreen")}
      />

      <ActionButton
        title="Patient Medical ID"
        color="#1F2A40"
        onPress={() => router.push("/patient")}
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
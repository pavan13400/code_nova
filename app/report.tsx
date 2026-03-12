import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";


export default function Report() {
  
  const router = useRouter();
  const { patient } = useLocalSearchParams();

  let data = null;

  try {
    if (patient) {
      data = JSON.parse(patient as string);
    }
  } catch {
    data = null;
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Emergency Medical Report</Text>

      {!data ? (
        <Text style={styles.noData}>
          No patient scanned yet.
        </Text>
      ) : (
        <>
          <Text>Patient: {data.name}</Text>
          <Text>Blood Group: {data.bloodGroup}</Text>

          <Text style={styles.red}>
            Allergies: {data.allergies?.join(", ")}
          </Text>

          <Text>
            Conditions: {data.medicalHistory?.join(", ")}
          </Text>

          <Text>
            Medications: {data.medications?.join(", ")}
          </Text>

          <Text style={{ marginTop: 20 }}>
            Emergency Contact: {data.emergencyContact}
          </Text>
        </>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: "#F4F6FA",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 20,
  },

  red: {
    color: "#EF4444",
    fontWeight: "700",
  },

  noData: {
    color: "#6B7280",
    fontSize: 16,
  },
});
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import InputField from "../components/InputField";

export default function Patient() {
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Medical ID</Text>

      <Card>

        <InputField placeholder="Patient Name" />

        <View style={styles.row}>
          <InputField placeholder="Age" />
          <InputField placeholder="Blood Type" />
        </View>

        <InputField placeholder="Allergies" />
        <InputField placeholder="Current Medications" />
        <InputField placeholder="Previous Surgeries" />
        <InputField placeholder="Emergency Contact" />

      </Card>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },
});
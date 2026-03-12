import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Report() {

  const { patient, hospital } = useLocalSearchParams();

  let patientData:any = null;
  let hospitalData:any = null;

  try {
    if (patient) patientData = JSON.parse(patient as string);
    if (hospital) hospitalData = JSON.parse(hospital as string);
  } catch {
    patientData = null;
  }

  useEffect(() => {
    console.log("===== REPORT DATA =====");
    console.log("Hospital:", hospitalData);
    console.log("Patient:", patientData);
  }, []);

  const submitReport = () => {

    const report = {
      hospital: hospitalData,
      patient: patientData
    };

    console.log("SUBMITTING REPORT:", report);

    Alert.alert("Report Submitted", "Emergency report sent successfully");
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>🚑 Emergency Medical Report</Text>

      {/* Hospital Info */}
      {hospitalData && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Hospital</Text>
          <Text style={styles.value}>{hospitalData.name}</Text>
          <Text style={styles.sub}>{hospitalData.vicinity}</Text>
        </View>
      )}

      {/* Patient Info */}
      {patientData && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Patient Details</Text>

          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{patientData.name}</Text>

          <Text style={styles.label}>Blood Group</Text>
          <Text style={styles.value}>{patientData.bloodGroup}</Text>

          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{patientData.phone}</Text>

          <Text style={styles.label}>Emergency Contact</Text>
          <Text style={styles.value}>{patientData.emergencyContact}</Text>

          <Text style={styles.label}>Allergies</Text>
          <Text style={styles.allergy}>
            {patientData.allergies?.join(", ") || "None"}
          </Text>

          <Text style={styles.label}>Conditions</Text>
          <Text style={styles.value}>
            {patientData.medicalHistory?.join(", ") || "None"}
          </Text>

          <Text style={styles.label}>Medications</Text>
          <Text style={styles.value}>
            {patientData.medications?.join(", ") || "None"}
          </Text>
        </View>
      )}

      {/* Assessment */}
      {patientData && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Emergency Assessment</Text>

          <Text style={styles.label}>Condition</Text>
          <Text style={styles.value}>{patientData.condition}</Text>

          <Text style={styles.label}>Severity</Text>
          <Text style={styles.value}>{patientData.severity}</Text>

          <Text style={styles.label}>Blood Pressure</Text>
          <Text style={styles.value}>{patientData.bp}</Text>

          <Text style={styles.label}>Heart Rate</Text>
          <Text style={styles.value}>{patientData.heartRate}</Text>

          <Text style={styles.label}>Oxygen</Text>
          <Text style={styles.value}>{patientData.oxygen}</Text>

          <Text style={styles.label}>Notes</Text>
          <Text style={styles.value}>{patientData.notes}</Text>
        </View>
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={submitReport}>
        <Text style={styles.submitText}>Submit Report</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#F4F6FA",
    padding:20
  },

  title:{
    fontSize:26,
    fontWeight:"800",
    marginBottom:20,
    color:"#111827"
  },

  card:{
    backgroundColor:"white",
    padding:18,
    borderRadius:14,
    marginBottom:16,
    shadowColor:"#000",
    shadowOpacity:0.08,
    shadowRadius:10,
    elevation:4
  },

  sectionTitle:{
    fontSize:18,
    fontWeight:"700",
    marginBottom:10,
    color:"#111827"
  },

  label:{
    fontSize:13,
    color:"#6B7280",
    marginTop:8
  },

  value:{
    fontSize:16,
    fontWeight:"600",
    color:"#111827"
  },

  sub:{
    fontSize:14,
    color:"#6B7280"
  },

  allergy:{
    fontSize:16,
    fontWeight:"700",
    color:"#EF4444"
  },

  submitBtn:{
    backgroundColor:"#0284C7",
    padding:18,
    borderRadius:14,
    alignItems:"center",
    marginTop:10,
    marginBottom:40
  },

  submitText:{
    color:"white",
    fontSize:16,
    fontWeight:"700"
  }

});
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Report() {

  const { patient, hospital } = useLocalSearchParams();
  const router = useRouter();
  const [loading,setLoading] = useState(false);
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

  // const submitReport = () => {
  //   const report = {
  //     hospital: hospitalData,
  //     patient: patientData
  //   };

  //   console.log("SUBMITTING REPORT:", report);

  //   Alert.alert("Report Submitted", "Emergency report sent successfully");
  // };
  // const submitReport = async () => {

  // const report = {
  // name: patientData.name,
  // age: patientData.age,
  // blood: patientData.bloodGroup,

  // allergies: patientData.allergies || [],
  // meds: patientData.medications || [],
  // surgeries: patientData.medicalHistory || [],
  // contacts: [patientData.phone, patientData.emergencyContact],

  // bp: patientData.bp,
  // pulse: patientData.heartRate,
  // severity: patientData.severity,

  // hospital:{
  // h_name: hospitalData.name,
  // vicinity: hospitalData.vicinity
  // }

  // };

  // try{

  // await fetch("http://192.168.44.1:5000/report",{
  // method:"POST",
  // headers:{
  // "Content-Type":"application/json"
  // },
  // body: JSON.stringify(report)
  // });

  // Alert.alert("Success","Report stored in MongoDB");

  // }catch(err){

  // Alert.alert("Error","Failed to send report");

  // }

  // };
  // const submitReport = async () => {

  // console.log("BUTTON CLICKED");

  // console.log("Hospital Data:", hospitalData);
  // console.log("Patient Data:", patientData);

  //   const report = {
  //     name: patientData?.name,
  //     age: patientData?.age,
  //     blood: patientData?.blood,

  //     allergies: patientData?.allergies || [],
  //     meds: patientData?.meds || [],
  //     surgeries: patientData?.surgeries || [],
  //     contacts: patientData?.contacts || [],
  //     // contacts: [patientData?.phone, patientData?.emergencyContact],

  //     bp: patientData?.bp,
  //     // pulse: patientData?.heartRate,
  //     pulse: patientData?.heartRate || patientData?.pulse,
  //     severity: patientData?.severity,

  //     hospital:{
  //       h_name: hospitalData?.name,
  //       vicinity: hospitalData?.vicinity
  //     }
  //   };

  //   console.log("FINAL REPORT OBJECT:");
  //   console.log(JSON.stringify(report, null, 2));

  //   try {

  //     console.log("Sending request to server...");

  //     const response = await fetch("http://192.168.1.7:5000/patient",{
  //       method:"POST",
  //       headers:{
  //         "Content-Type":"application/json"
  //       },
  //       body: JSON.stringify(report)
  //     });

  //     console.log("SERVER RESPONSE:", response);
  //     console.log("REPORT PATIENT DATA:", patientData);

  //     const data = await response.json();

  //     console.log("SERVER DATA:", data);

  //     Alert.alert("Success","Report stored in MongoDB");

  //   } catch(err) {

  //     console.log("ERROR OCCURRED:");
  //     console.log(err);

  //     Alert.alert("Error","Failed to send report");
  //   }

  // };
//   const submitReport = async () => {

//   const report = {
//     name: patientData?.name,
//     age: patientData?.age,
//     blood: patientData?.blood,

//     allergies: patientData?.allergies || [],
//     meds: patientData?.meds || [],
//     surgeries: patientData?.surgeries || [],
//     contacts: patientData?.contacts || [],

//     bp: patientData?.bp,
//     pulse: patientData?.heartRate || patientData?.pulse,
//     severity: patientData?.severity,

//     hospital:{
//       h_name: hospitalData?.name,
//       vicinity: hospitalData?.vicinity
//     }
//   };

//   try {

//     const response = await fetch("http://192.168.1.7:5000/patient",{
//       method:"POST",
//       headers:{
//         "Content-Type":"application/json"
//       },
//       body: JSON.stringify(report)
//     });

//     const data = await response.json();

//     console.log("SERVER DATA:", data);

//     // SUCCESS ALERT WITH REDIRECT
//     Alert.alert(
//       "✅ Report Submitted",
//       "Emergency report sent successfully",
//       [
//         {
//           text:"OK",
//           onPress: () => router.replace("/") // go back to index.tsx
//         }
//       ]
//     );

//   } catch(err) {

//     console.log(err);

//     Alert.alert("Error","Failed to send report");

//   }

// };
const submitReport = async () => {

  console.log("===== SUBMIT BUTTON CLICKED =====");

      const report = {
        name: patientData?.name,
        age: patientData?.age,
        blood: patientData?.blood,
        allergies: patientData?.allergies || [],
        meds: patientData?.meds || [],
        surgeries: patientData?.surgeries || [],
        contacts: patientData?.contacts || [],
        bp: patientData?.bp,
        pulse: patientData?.heartRate || patientData?.pulse,
        severity: patientData?.severity,
        hospital:{
          h_name: hospitalData?.name,
          vicinity: hospitalData?.vicinity
        }
      };

      console.log("REPORT OBJECT:");
      console.log(JSON.stringify(report,null,2));

      try {

        setLoading(true);

        console.log("Sending request to server...");
        console.log("URL: http://192.168.1.7:5000/patient");

        // const response = await fetch("http://192.168.1.7:5000/patient",{
        //   method:"POST",
        //   headers:{
        //     "Content-Type":"application/json"
        //   },
        //   body: JSON.stringify(report)
        // });
        const controller = new AbortController();
        const timeout = setTimeout(()=>controller.abort(),8000);

        const response = await fetch("http://192.168.0.33:5000/patient",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(report),
          signal: controller.signal
        });

        clearTimeout(timeout);

        console.log("SERVER RESPONSE STATUS:",response.status);

        const text = await response.text();
        console.log("RAW SERVER RESPONSE:",text);

        let data;

        try{
          data = JSON.parse(text);
          console.log("PARSED SERVER DATA:",data);
        }catch{
          console.log("Response is not JSON");
        }

        setLoading(false);

        Alert.alert(
          "✅ Report Submitted",
          "Emergency report sent successfully",
          [
            {
              text:"OK",
              onPress: () => router.replace("/")
            }
          ]
        );

      } catch(err) {

        setLoading(false);

        console.log("===== FETCH ERROR =====");
        console.log(err);

        Alert.alert("Error","Failed to send report");

      }

    };

  return (
    <SafeAreaView style={{flex:1}}>
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
            <Text style={styles.value}>{patientData.blood}</Text>

            {/* <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{patientData.phone}</Text>

            <Text style={styles.label}>Emergency Contact</Text>
            <Text style={styles.value}>{patientData.emergencyContact}</Text> */}
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>
            {patientData.contacts?.[0] || "N/A"}
            </Text>

            <Text style={styles.label}>Emergency Contact</Text>
            <Text style={styles.value}>
            {patientData.contacts?.[1] || "N/A"}
            </Text>

            <Text style={styles.label}>Allergies</Text>
            <Text style={styles.allergy}>
              {patientData.allergies?.join(", ") || "None"}
            </Text>

            <Text style={styles.label}>Conditions</Text>
            <Text style={styles.value}>
            {patientData.surgeries?.join(", ") || "None"}
            </Text>

            <Text style={styles.label}>Medications</Text>
            <Text style={styles.value}>
            {patientData.meds?.join(", ") || "None"}
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
        {/* <TouchableOpacity style={styles.submitBtn} onPress={submitReport}>
          <Text style={styles.submitText}>Submit Report</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.submitBtn} onPress={submitReport} disabled={loading}>

      {loading ? (
        <ActivityIndicator size="small" color="white"/>
      ) : (
        <Text style={styles.submitText}>Submit Report</Text>
      )}

    </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
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
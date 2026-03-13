// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { useState } from 'react';
// import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function Info() {

//   const [condition, setCondition] = useState("");
//   const [severity, setSeverity] = useState("");
//   const [bp, setBp] = useState("");
//   const [heartRate, setHeartRate] = useState("");
//   const [oxygen, setOxygen] = useState("");
//   const [notes, setNotes] = useState("");

//   const { patient } = useLocalSearchParams();
//   const data = JSON.parse(patient);
//   console.log("INFO SCREEN DATA:", data);
//   const router = useRouter();

//   <View style={styles.vitalsCard}>

//     <Text style={styles.sectionTitle}>Emergency Assessment</Text>

//     <TextInput
//       placeholder="Condition (e.g. Chest Pain)"
//       style={styles.input}
//       value={condition}
//       onChangeText={setCondition}
//     />

//     <TextInput
//       placeholder="Severity (Serious / Moderate / Stable)"
//       style={styles.input}
//       value={severity}
//       onChangeText={setSeverity}
//     />

//     <TextInput
//       placeholder="Blood Pressure (120/80)"
//       style={styles.input}
//       value={bp}
//       onChangeText={setBp}
//     />

//     <TextInput
//       placeholder="Heart Rate (bpm)"
//       style={styles.input}
//       value={heartRate}
//       onChangeText={setHeartRate}
//     />

//     <TextInput
//       placeholder="Oxygen Level SpO2 (%)"
//       style={styles.input}
//       value={oxygen}
//       onChangeText={setOxygen}
//     />

//     <TextInput
//       placeholder="Additional Notes"
//       style={styles.input}
//       value={notes}
//       onChangeText={setNotes}
//     />

//   </View>

//   const alertEmergency = () => {
//     router.push({
//       pathname: "/alert",
//       params: { patient: JSON.stringify(data) }
//     });
//   };

// //   const alertHospital = () => {
// //   router.push("/hospitals");
// // };

//   const alertHospital = () => {

//   const payload = {
//     ...data,
//     condition,
//     severity,
//     bp,
//     heartRate,
//     oxygen,
//     notes
//   };

//   router.push({
//     pathname: "/hospitals",
//     params: {
//       patient: JSON.stringify(payload)
//     }
//   });

// };

//   return (
//     <SafeAreaView style={styles.safe}>
//       <View style={styles.container}>

//       <ScrollView contentContainerStyle={styles.scroll}>

//         <Text style={styles.title}>Patient Information</Text>
//         <View style={styles.card}>

//       <View style={styles.row}>
//         <Text style={styles.label}>Name</Text>
//         <Text style={styles.value}>{data.name}</Text>
//       </View>

//       <View style={styles.row}>
//         <Text style={styles.label}>Age</Text>
//         <Text style={styles.value}>{data.age}</Text>
//       </View>

//     <View style={styles.row}>
//       <Text style={styles.label}>Blood Group</Text>
//       <Text style={styles.value}>{data.blood}</Text>
//     </View>

//     <View style={styles.row}>
//       <Text style={styles.label}>Phone</Text>
//       <Text style={styles.value}>{data.phone}</Text>
//     </View>

//     <View style={styles.row}>
//       <Text style={styles.label}>Emergency Contact</Text>
//       <Text style={styles.value}>{data.emergencyContact}</Text>
//     </View>

//     <View style={styles.row}>
//       <Text style={styles.label}>Allergies</Text>
//       <Text style={styles.value}>
//         {Array.isArray(data.allergies) ? data.allergies.join(", ") : data.allergies}
//       </Text>
//     </View>

//     <View style={styles.row}>
//       <Text style={styles.label}>Conditions</Text>
//       <Text style={styles.value}>
//         {Array.isArray(data.conditions) ? data.conditions.join(", ") : data.conditions}
//       </Text>
//     </View>

//     <View style={styles.row}>
//       <Text style={styles.label}>Medications</Text>
//       <Text style={styles.value}>
//         {Array.isArray(data.medications) ? data.medications.join(", ") : data.medications}
//       </Text>
//     </View>

//     <View style={styles.row}>
//       <Text style={styles.label}>Surgeries</Text>
//       <Text style={styles.value}>
//         {Array.isArray(data.surgeries) ? data.surgeries.join(", ") : data.surgeries}
//       </Text>
//     </View>

// </View>

//       </ScrollView>
//         <View style={styles.vitalsCard}>

//         <Text style={styles.sectionTitle}>Emergency Assessment</Text>

//         <TextInput
//           placeholder="Condition (e.g. Chest Pain)"
//           style={styles.input}
//           value={condition}
//           onChangeText={setCondition}
//         />

//       <TextInput
//         placeholder="Severity (Serious / Moderate / Stable)"
//         style={styles.input}
//         value={severity}
//         onChangeText={setSeverity}
//       />

//       <TextInput
//         placeholder="Blood Pressure (120/80)"
//         style={styles.input}
//         value={bp}
//         onChangeText={setBp}
//       />

//       <TextInput
//         placeholder="Heart Rate (bpm)"
//         style={styles.input}
//         value={heartRate}
//         onChangeText={setHeartRate}
//       />

//       <TextInput
//         placeholder="Oxygen Level SpO2 (%)"
//         style={styles.input}
//         value={oxygen}
//         onChangeText={setOxygen}
//       />

//       <TextInput
//         placeholder="Additional Notes"
//         style={styles.input}
//         value={notes}
//         onChangeText={setNotes}
//       />

//     </View>


//         <View style={styles.bottomBar}>

//           <TouchableOpacity style={styles.emergencyBtn} onPress={alertEmergency}>
//             <Text style={styles.btnText}>🚑 ALERT EMERGENCY</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.hospitalBtn} onPress={alertHospital}>
//             <Text style={styles.btnText}>🏥 ALERT HOSPITAL</Text>
//           </TouchableOpacity>

//         </View>

//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//     safe:{
//     flex:1,
//     backgroundColor:"#F4F6FA"
//   },

//   container:{
//     flex:1,
//     backgroundColor:"#F4F6FA"
//   },

//   scroll:{
//     padding:20,
//     paddingBottom:120
//   },

//   title:{
//     fontSize:26,
//     fontWeight:"700",
//     marginBottom:20,
//     color:"#111827"
//   },
//     vitalsCard:{
//     backgroundColor:"white",
//     borderRadius:14,
//     padding:18,
//     marginTop:20,
//     elevation:5
//   },

//   sectionTitle:{
//     fontSize:20,
//     fontWeight:"700",
//     marginBottom:12
//   },

//   input:{
//     backgroundColor:"#F9FAFB",
//     borderRadius:10,
//     padding:12,
//     marginBottom:10,
//     borderWidth:1,
//     borderColor:"#E5E7EB"
//   },

//   card:{
//     backgroundColor:"white",
//     borderRadius:14,
//     padding:18,
//     shadowColor:"#000",
//     shadowOpacity:0.1,
//     shadowRadius:10,
//     elevation:5
//   },

//   row:{
//     marginBottom:14
//   },

//   label:{
//     fontSize:13,
//     color:"#6B7280",
//     marginBottom:2
//   },

//   value:{
//     fontSize:17,
//     fontWeight:"600",
//     color:"#111827"
//   },

//   bottomBar:{
//     position:"absolute",
//     bottom:0,
//     width:"100%",
//     padding:16,
//     backgroundColor:"#F4F6FA",
//     gap:12
//   },

//   emergencyBtn:{
//     backgroundColor:"#EF4444",
//     padding:18,
//     borderRadius:14,
//     alignItems:"center",
//     shadowColor:"#EF4444",
//     shadowOpacity:0.3,
//     shadowRadius:8,
//     elevation:6
//   },

//   hospitalBtn:{
//     backgroundColor:"#0284C7",
//     padding:18,
//     borderRadius:14,
//     alignItems:"center",
//     shadowColor:"#0284C7",
//     shadowOpacity:0.3,
//     shadowRadius:8,
//     elevation:6
//   },

//   btnText:{
//     color:"white",
//     fontSize:16,
//     fontWeight:"700",
//     letterSpacing:0.5
//   }

// });

import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Info() {

  const [condition, setCondition] = useState("");
  const [severity, setSeverity] = useState("");
  const [bp, setBp] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [oxygen, setOxygen] = useState("");
  const [notes, setNotes] = useState("");

  // const { patient } = useLocalSearchParams();
  // const data = JSON.parse(patient);
  const params = useLocalSearchParams();

  console.log("INFO PARAMS:", params);

  let data = {};

  try {
    data = JSON.parse(params.patient);
    console.log("INFO DATA:", data);
  } catch (err) {
    console.log("INFO PARSE ERROR:", err);
  }

  console.log("INFO SCREEN DATA:", data);

  const router = useRouter();

  const alertEmergency = () => {
    router.push({
      pathname: "/alert",
      params: { patient: JSON.stringify(data) }
    });
  };

  const alertHospital = () => {

    const payload = {
      ...data,
      condition,
      severity,
      bp,
      heartRate,
      oxygen,
      notes
    };

    router.push({
      pathname: "/hospitals",
      params: {
        patient: JSON.stringify(payload)
      }
    });

  };

  // return (
  //   <SafeAreaView style={styles.safe}>
  //     <View style={styles.container}>

  //       <ScrollView contentContainerStyle={styles.scroll}>

  //         <Text style={styles.title}>Patient Information</Text>

  //         <View style={styles.card}>

  //           <View style={styles.row}>
  //             <Text style={styles.label}>Name</Text>
  //             <Text style={styles.value}>{data.name || "Unknown"}</Text>
  //           </View>

  //           <View style={styles.row}>
  //             <Text style={styles.label}>Age</Text>
  //             <Text style={styles.value}>{data.age || "N/A"}</Text>
  //           </View>

  //           <View style={styles.row}>
  //             <Text style={styles.label}>Blood Group</Text>
  //             <Text style={styles.value}>{data.blood || "N/A"}</Text>
  //           </View>

  //           <View style={styles.row}>
  //             <Text style={styles.label}>Emergency Contact</Text>
  //             <Text style={styles.value}>
  //               {data.contacts?.length > 1
  //                 ? data.contacts[1]
  //                 : data.contacts?.[0] || "N/A"}
  //             </Text>
  //           </View>

  //           <View style={styles.row}>
  //             <Text style={styles.label}>Allergies</Text>
  //             <Text style={styles.value}>
  //               {data.allergies?.length > 0
  //                 ? data.allergies.join(", ")
  //                 : "None"}
  //             </Text>
  //           </View>

  //           <View style={styles.row}>
  //             <Text style={styles.label}>Medications</Text>
  //             <Text style={styles.value}>
  //               {data.meds?.length > 0
  //                 ? data.meds.join(", ")
  //                 : "None"}
  //             </Text>
  //           </View>

  //           <View style={styles.row}>
  //             <Text style={styles.label}>Surgeries</Text>
  //             <Text style={styles.value}>
  //               {data.surgeries?.length > 0
  //                 ? data.surgeries.join(", ")
  //                 : "None"}
  //             </Text>
  //           </View>

  //         </View>

  //       </ScrollView>

  //       <View style={styles.vitalsCard}>

  //         <Text style={styles.sectionTitle}>Emergency Assessment</Text>

  //         <TextInput
  //           placeholder="Condition (e.g. Chest Pain)"
  //           style={styles.input}
  //           value={condition}
  //           onChangeText={setCondition}
  //         />

  //         <TextInput
  //           placeholder="Severity (Serious / Moderate / Stable)"
  //           style={styles.input}
  //           value={severity}
  //           onChangeText={setSeverity}
  //         />

  //         <TextInput
  //           placeholder="Blood Pressure (120/80)"
  //           style={styles.input}
  //           value={bp}
  //           onChangeText={setBp}
  //         />

  //         <TextInput
  //           placeholder="Heart Rate (bpm)"
  //           style={styles.input}
  //           value={heartRate}
  //           onChangeText={setHeartRate}
  //         />

  //         <TextInput
  //           placeholder="Oxygen Level SpO2 (%)"
  //           style={styles.input}
  //           value={oxygen}
  //           onChangeText={setOxygen}
  //         />

  //         <TextInput
  //           placeholder="Additional Notes"
  //           style={styles.input}
  //           value={notes}
  //           onChangeText={setNotes}
  //         />

  //       </View>

  //       <View style={styles.bottomBar}>

  //         <TouchableOpacity style={styles.emergencyBtn} onPress={alertEmergency}>
  //           <Text style={styles.btnText}>🚑 ALERT EMERGENCY</Text>
  //         </TouchableOpacity>

  //         <TouchableOpacity style={styles.hospitalBtn} onPress={alertHospital}>
  //           <Text style={styles.btnText}>🏥 ALERT HOSPITAL</Text>
  //         </TouchableOpacity>

  //       </View>

  //     </View>
  //   </SafeAreaView>
  // );
  return (
  <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          <Text style={styles.title}>Patient Information</Text>

          <View style={styles.card}>

            <View style={styles.row}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{data.name || "Unknown"}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Age</Text>
              <Text style={styles.value}>{data.age || "N/A"}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Blood Group</Text>
              <Text style={styles.value}>{data.blood || "N/A"}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Emergency Contact</Text>
              <Text style={styles.value}>
                {data.contacts?.length > 1
                  ? data.contacts[1]
                  : data.contacts?.[0] || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Insurance</Text>
              <Text style={styles.value}>
                {data.insurance?.provider || "None"}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Allergies</Text>
              <Text style={styles.value}>
                {data.allergies?.length > 0 ? data.allergies.join(", ") : "None"}
              </Text>
            </View>

          </View>

          {/* EMERGENCY ASSESSMENT MOVED INSIDE SCROLL */}

          <View style={styles.vitalsCard}>

            <Text style={styles.sectionTitle}>Emergency Assessment</Text>

            <TextInput
              placeholder="Condition (e.g. Chest Pain)"
              style={styles.input}
              value={condition}
              onChangeText={setCondition}
            />

            <TextInput
              placeholder="Severity (Serious / Moderate / Stable)"
              style={styles.input}
              value={severity}
              onChangeText={setSeverity}
            />

            <TextInput
              placeholder="Blood Pressure (120/80)"
              style={styles.input}
              value={bp}
              onChangeText={setBp}
            />

            <TextInput
              placeholder="Heart Rate (bpm)"
              style={styles.input}
              value={heartRate}
              onChangeText={setHeartRate}
            />

            <TextInput
              placeholder="Oxygen Level SpO2 (%)"
              style={styles.input}
              value={oxygen}
              onChangeText={setOxygen}
            />

            <TextInput
              placeholder="Additional Notes"
              style={styles.input}
              value={notes}
              onChangeText={setNotes}
            />

          </View>

        </ScrollView>

        {/* BUTTONS FIXED AT BOTTOM */}

        <View style={styles.bottomBar}>

          <TouchableOpacity style={styles.emergencyBtn} onPress={alertEmergency}>
            <Text style={styles.btnText}>🚑 ALERT</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.hospitalBtn} onPress={alertHospital}>
            <Text style={styles.btnText}>🏥 ALERT HOSPITAL</Text>
          </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safe:{
    flex:1,
    backgroundColor:"#F4F6FA"
  },

  container:{
    flex:1,
    backgroundColor:"#F4F6FA"
  },

  scroll:{
    padding:20,
    paddingBottom:120
  },

  title:{
    fontSize:26,
    fontWeight:"700",
    marginBottom:20,
    color:"#111827"
  },

  vitalsCard:{
    backgroundColor:"white",
    borderRadius:14,
    padding:18,
    marginTop:20,
    elevation:5
  },

  sectionTitle:{
    fontSize:20,
    fontWeight:"700",
    marginBottom:12
  },

  input:{
    backgroundColor:"#F9FAFB",
    borderRadius:10,
    padding:12,
    marginBottom:10,
    borderWidth:1,
    borderColor:"#E5E7EB"
  },

  card:{
    backgroundColor:"white",
    borderRadius:14,
    padding:18,
    elevation:5
  },

  row:{
    marginBottom:14
  },

  label:{
    fontSize:13,
    color:"#6B7280",
    marginBottom:2
  },

  value:{
    fontSize:17,
    fontWeight:"600",
    color:"#111827"
  },

  bottomBar:{
    position:"absolute",
    bottom:0,
    width:"100%",
    padding:16,
    backgroundColor:"#F4F6FA",
    gap:12
  },

  emergencyBtn:{
    backgroundColor:"#EF4444",
    padding:18,
    borderRadius:14,
    alignItems:"center"
  },

  hospitalBtn:{
    backgroundColor:"#0284C7",
    padding:18,
    borderRadius:14,
    alignItems:"center"
  },

  btnText:{
    color:"white",
    fontSize:16,
    fontWeight:"700"
  }

});
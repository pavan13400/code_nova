import CryptoJS from 'crypto-js';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SECRET_KEY = "life_link_medical_vault_secure_2026_mt4_sat3_pav2_sid1";


export default function ScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedResult, setScannedResult] = useState(null);

  // Auto-request permissions when screen opens
  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);

  // --- SCAN LOGIC ---
  // const onScan = ({ data }) => {
  // try {

  //   let parsedData;

  //   try {
  //     // try decrypting first
  //     const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  //     const originalText = bytes.toString(CryptoJS.enc.Utf8);

  //     if (originalText) {
  //       parsedData = JSON.parse(originalText);
  //     } else {
  //       throw new Error("Not encrypted");
  //     }

  //   } catch {
  //     // fallback if QR is plain JSON
  //     parsedData = JSON.parse(data);
  //   }

  //     router.push({
  //       pathname: "/info",
  //       params: {
  //         patient: JSON.stringify(parsedData)
  //       }
  //     });

  //   } catch (e) {
  //     Alert.alert("Scan Error", "Invalid Medical QR Code.");
  //   }
  // };
//   const onScan = ({ data }) => {
//   try {
//     const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
//     const originalText = bytes.toString(CryptoJS.enc.Utf8);

//     if (!originalText) {
//       throw new Error("Invalid QR");
//     }

//     const parsedData = JSON.parse(originalText);

//     const patientData = {
//       name: parsedData.name || "Unknown",
//       age: parsedData.age || "N/A",
//       blood: parsedData.blood || "N/A",
//       phone: parsedData.phone || "N/A",
//       emergencyContact: parsedData.emergencyContact || "N/A",
//       allergies: parsedData.allergies || [],
//       conditions: parsedData.conditions || [],
//       medications: parsedData.meds || [],
//       surgeries: parsedData.surgeries || []
//     };

//     router.push({
//       pathname: "/info",
//       params: {
//         patient: JSON.stringify(patientData)
//       }
//     });

//   } catch (e) {
//     Alert.alert("Scan Error", "Invalid Medical QR Code.");
//   }
// };
const onScan = ({ data }) => {
    try {

      console.log("RAW QR DATA:", data);

      const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);

      console.log("DECRYPTED TEXT:", originalText);

      const parsedData = JSON.parse(originalText);

      console.log("PARSED QR OBJECT:", parsedData);

      router.push({
        pathname: "/info",
        params: {
          patient: JSON.stringify(parsedData)
        }
      });

    } catch (e) {
      console.log("SCAN ERROR:", e);
      Alert.alert("Scan Error", "Invalid Medical QR Code.");
    }
  };

  // If we have a result, show the Modal with data
  // if (scannedResult) {
  //   return (
  //     // <Modal visible={!!scannedResult} animationType="slide">
  //     //   <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
  //     //     <ScrollView contentContainerStyle={styles.resultContainer}>
  //     //       <View style={styles.emergencyBadge}>
  //     //         <ShieldAlert color="white" size={24} />
  //     //         <Text style={styles.badgeText}>EMERGENCY DATA</Text>
  //     //       </View>
            
  //     //       <View style={styles.card}>
  //     //         <Text style={styles.resName}>{scannedResult?.name || "Unknown Patient"}</Text>
              
  //     //         <View style={styles.resBasicInfo}>
  //     //           <Text style={styles.resBasicText}>Age: <Text style={styles.bold}>{scannedResult?.age || "N/A"}</Text></Text>
  //     //           <Text style={styles.resBasicText}>Blood: <Text style={styles.bold}>{scannedResult?.blood || "N/A"}</Text></Text>
  //     //         </View>
  //     //       </View>

  //     //       <ResultSection label="ALLERGIES" items={scannedResult?.allergies} color="#CC0000" bg="#FFDADA" />
  //     //       <ResultSection label="MEDICATIONS" items={scannedResult?.meds} color="#0D47A1" bg="#D1E9FF" />
  //     //       <ResultSection label="SURGERIES" items={scannedResult?.surgeries} color="#7E22CE" bg="#F3E8FF" />
  //     //       <ResultSection label="CONTACTS" items={scannedResult?.contacts} color="#15803D" bg="#DCFCE7" />

  //     //       {/* CHANGED THIS: Now takes you back to the Generator when closed */}
  //     //       <TouchableOpacity onPress={() => router.back()} style={styles.closeModalBtn}>
  //     //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Close Medical Record</Text>
  //     //       </TouchableOpacity>
  //     //     </ScrollView>
  //     //   </SafeAreaView>
  //     // </Modal>

  //   );
  // }

  // ==========================================
  // ZONE 3: UI - CAMERA SCANNER
  // ==========================================
  // Default view: Show the camera
  return (
    <View style={StyleSheet.absoluteFill}>
      <CameraView style={StyleSheet.absoluteFill} onBarcodeScanned={onScan} barcodeScannerSettings={{ barcodeTypes: ["qr"] }} />
      
      {/* CHANGED THIS: Now goes back to the Generator if they hit the "X" */}
      <TouchableOpacity style={styles.closeScannerBtn} onPress={() => router.back()}>
        <X color="white" size={32} />
      </TouchableOpacity>
      
      <View style={styles.scanOverlay}>
        <Text style={styles.scanText}>Point at Medical QR Code</Text>
      </View>
    </View>
  );
}

// ResultSection Component for Scanner
const ResultSection = ({ label, items, color, bg }) => (
  <View style={[styles.card, { marginTop: 15 }]}>
    <Text style={styles.resLabel}>{label}</Text>
    <View style={styles.tagWrapper}>
      {items && items.length > 0 ? items.map((t, i) => <Text key={i} style={[styles.resTag, { backgroundColor: bg, color: color }]}>{t}</Text>) : <Text style={styles.emptyText}>None listed</Text>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', padding: 20, borderRadius: 20, marginBottom: 20, elevation: 3 },
  closeScannerBtn: { position: 'absolute', top: 60, right: 30, backgroundColor: 'rgba(0,0,0,0.5)', padding: 12, borderRadius: 50 },
  scanOverlay: { position: 'absolute', bottom: 100, width: '100%', alignItems: 'center' },
  scanText: { color: 'white', fontSize: 18, fontWeight: '800', backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 25 },
  resultContainer: { flexGrow: 1, padding: 20, paddingBottom: 50 },
  emergencyBadge: { backgroundColor: '#FF3B30', padding: 18, borderRadius: 20, flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  badgeText: { color: 'white', fontWeight: '900', fontSize: 18 },
  resName: { fontSize: 36, fontWeight: '900', textAlign: 'center', marginBottom: 15 },
  resBasicInfo: { flexDirection: 'row', justifyContent: 'center', gap: 30 },
  resBasicText: { fontSize: 18, color: '#4B5563' },
  bold: { fontWeight: '900', color: '#111827' },
  resLabel: { fontSize: 14, fontWeight: '800', color: '#6B7280', marginBottom: 10 },
  tagWrapper: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 },
  resTag: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, fontWeight: '800', overflow: 'hidden' },
  emptyText: { color: '#9CA3AF', fontStyle: 'italic' },
  closeModalBtn: { backgroundColor: '#111827', padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 40 }
});
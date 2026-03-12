import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Activity, HeartPulse, Plus, Scan, Share2, ShieldAlert, X } from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
    Alert, KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet, Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MedicalQRScreen() {
  // ZONE 1: STATE...
  // ==========================================
  // ZONE 1: STATE (DATA STORAGE)
  // To add a new simple field (like Aadhar), just add it here! e.g., aadhar: ''
  // ==========================================
  const [formData, setFormData] = useState({
    name: '', age: '', blood: '',
    // aadhar: '', <-- Example of future addition
    allergies: [], meds: [], surgeries: [], contacts: []
  });

  // Stores what the user is currently typing before they press the "+" button
  const [tempInputs, setTempInputs] = useState({ allergy: '', med: '', surgery: '', contact: '' });
  
  // App State
  const [qrString, setQrString] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();

  const qrRef = useRef();

  // ==========================================
  // ZONE 2: LOGIC & VALIDATION
  // ==========================================

  // --- SHARE LOGIC ---
  const shareQR = async () => {
    if (!qrRef.current) return;
    
    qrRef.current.toDataURL(async (data) => {
      try {
        const fileName = `${formData.name.replace(/\s+/g, '_') || 'Medical'}_QR.png`;
        const fileUri = FileSystem.cacheDirectory + fileName;

        await FileSystem.writeAsStringAsync(fileUri, data, {
          encoding: FileSystem.EncodingType.Base64
        });

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri, {
            mimeType: 'image/png',
            dialogTitle: 'Save Medical QR Code',
            UTI: 'public.png'
          });
        } else {
          Alert.alert("Error", "Sharing is not available on this device.");
        }
      } catch (error) {
        Alert.alert("Error", "Could not generate shareable image.");
      }
    });
  };

  // --- FIELD VALIDATORS ---
  const handleAgeChange = (text) => {
    if (text === '') { setFormData({ ...formData, age: '' }); return; }
    const num = parseInt(text);
    if (num >= 0 && num <= 120) setFormData({ ...formData, age: text });
    else { Alert.alert("Invalid Age", "Please enter 0-120."); setFormData({ ...formData, age: '' }); }
  };

  const handleBloodChange = (text) => {
    if (text === '') { setFormData({ ...formData, blood: '' }); return; }
    const validBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const upperText = text.toUpperCase();
    if (validBloodTypes.some(type => type.startsWith(upperText))) {
      setFormData({ ...formData, blood: upperText });
    } else {
      Alert.alert("Invalid Blood Type", "e.g., A+, O-");
      setFormData({ ...formData, blood: '' });
    }
  };

  // --- TAG/LIST HANDLERS ---
  const addItem = (field, tempKey) => {
    const value = tempInputs[tempKey];
    if (!value.trim()) return;
    if (field === 'contacts') {
      const digitCount = (value.match(/\d/g) || []).length;
      if (digitCount < 7) { Alert.alert("Invalid Number", "Too short."); return; }
    }
    setFormData(prev => ({ ...prev, [field]: [...prev[field], value] }));
    setTempInputs(prev => ({ ...prev, [tempKey]: '' }));
  };

  const removeItem = (field, index) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  // --- CORE SUBMIT LOGIC (MANDATORY FIELDS CHECKED HERE) ---
  const handleGenerateQR = () => {
    // 1. Mandatory Field Checks
    if (!formData.name.trim()) { Alert.alert("Missing Info", "Patient Name is required."); return; }
    if (!formData.age) { Alert.alert("Missing Info", "Age is required."); return; }
    if (!formData.blood) { Alert.alert("Missing Info", "Blood Type is required."); return; }
    if (formData.contacts.length === 0) { Alert.alert("Missing Info", "At least one Emergency Contact is required."); return; }

    // 2. Final Blood Type Clean Up
    const validBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const cleanBlood = formData.blood.trim().toUpperCase();

    if (!validBloodTypes.includes(cleanBlood)) {
      Alert.alert("Invalid Blood Type", "Please enter a valid type (e.g. O+).");
      return;
    }

    // 3. Generate QR
    const finalData = { ...formData, blood: cleanBlood };
    setFormData(finalData);
    setQrString(JSON.stringify(finalData));
  };

  // --- SCAN LOGIC ---
  const onScan = ({ data }) => {
    try {
      setScannedResult(JSON.parse(data));
      setIsScanning(false);
    } catch (e) {
      Alert.alert("Scan Error", "Invalid Medical QR Code.");
      setIsScanning(false);
    }
  };

  // ==========================================
  // ZONE 3: UI - CAMERA SCANNER
  // ==========================================
  if (isScanning) {
    return (
      <View style={StyleSheet.absoluteFill}>
        <CameraView style={StyleSheet.absoluteFill} onBarcodeScanned={onScan} barcodeScannerSettings={{ barcodeTypes: ["qr"] }} />
        <TouchableOpacity style={styles.closeScannerBtn} onPress={() => setIsScanning(false)}>
          <X color="white" size={32} />
        </TouchableOpacity>
        <View style={styles.scanOverlay}>
          <Text style={styles.scanText}>Point at Medical QR Code</Text>
        </View>
      </View>
    );
  }

  // ==========================================
  // ZONE 4: UI - MAIN GENERATOR FORM
  // ==========================================
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={20}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <HeartPulse color="#FF3B30" size={32} />
              <Text style={styles.title}>Medical ID</Text>
            </View>
            <TouchableOpacity onPress={async () => {
              const { granted } = await requestPermission();
              if (granted) setIsScanning(true); else Alert.alert("Permission Denied", "Camera required.");
            }}>
              <Scan color="#007AFF" size={28} />
            </TouchableOpacity>
          </View>

          {/* --- BASIC INFO CARD --- */}
          <View style={styles.card}>
            
            <View style={styles.section}>
              <Text style={styles.label}>Patient Name *</Text>
              <TextInput style={styles.input} value={formData.name} onChangeText={(t) => setFormData({ ...formData, name: t })} placeholder="John Doe" />
            </View>
            
            {/* EXAMPLE: How to add Aadhar manually later */}
            {/* <View style={styles.section}>
              <Text style={styles.label}>Aadhar Number</Text>
              <TextInput style={styles.input} value={formData.aadhar} onChangeText={(t) => setFormData({ ...formData, aadhar: t })} placeholder="1234 5678 9012" keyboardType="numeric" />
            </View> */}

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Age *</Text>
                <TextInput style={styles.input} value={formData.age} onChangeText={handleAgeChange} placeholder="34" keyboardType="numeric" maxLength={3} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Blood Type *</Text>
                <TextInput style={styles.input} value={formData.blood} onChangeText={handleBloodChange} placeholder="O+" autoCapitalize="characters" maxLength={3} />
              </View>
            </View>
          </View>

          {/* --- DYNAMIC TAG CARDS --- */}
          <TagCard label="Allergies" value={tempInputs.allergy} onChangeText={(t) => setTempInputs({ ...tempInputs, allergy: t })} onAdd={() => addItem('allergies', 'allergy')} items={formData.allergies} onRemove={(i) => removeItem('allergies', i)} themeColor="#CC0000" bgColor="#FFEDED" />
          <TagCard label="Medications" value={tempInputs.med} onChangeText={(t) => setTempInputs({ ...tempInputs, med: t })} onAdd={() => addItem('meds', 'med')} items={formData.meds} onRemove={(i) => removeItem('meds', i)} themeColor="#0D47A1" bgColor="#E3F2FD" />
          <TagCard label="Previous Surgeries" value={tempInputs.surgery} onChangeText={(t) => setTempInputs({ ...tempInputs, surgery: t })} onAdd={() => addItem('surgeries', 'surgery')} items={formData.surgeries} onRemove={(i) => removeItem('surgeries', i)} themeColor="#7E22CE" bgColor="#F3E8FF" />
          <TagCard label="Emergency Contacts *" value={tempInputs.contact} onChangeText={(t) => setTempInputs({ ...tempInputs, contact: t })} onAdd={() => addItem('contacts', 'contact')} items={formData.contacts} onRemove={(i) => removeItem('contacts', i)} themeColor="#15803D" bgColor="#DCFCE7" keyboardType="phone-pad" />

          {/* --- SUBMIT BUTTON --- */}
          <TouchableOpacity style={styles.generateBtn} onPress={handleGenerateQR}>
            <Activity color="white" size={20} />
            <Text style={styles.btnText}>Generate Secure QR</Text>
          </TouchableOpacity>

          {/* --- QR DISPLAY ZONE --- */}
          {qrString && (
            <View style={styles.qrContainer}>
              <View style={styles.qrWrapper}>
                <QRCode value={qrString} size={200} getRef={(c) => (qrRef.current = c)} />
              </View>
              <TouchableOpacity onPress={shareQR} style={styles.shareBtn}>
                <Share2 color="white" size={20} />
                <Text style={styles.shareBtnText}>Share / Save QR Image</Text>
              </TouchableOpacity>
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>

      {/* ========================================== */}
      {/* ZONE 5: UI - SCAN RESULT MODAL */}
      {/* ========================================== */}
      <Modal visible={!!scannedResult} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
          <ScrollView contentContainerStyle={styles.resultContainer}>
            <View style={styles.emergencyBadge}><ShieldAlert color="white" size={24} /><Text style={styles.badgeText}>EMERGENCY DATA</Text></View>
            
            <View style={styles.card}>
              <Text style={styles.resName}>{scannedResult?.name || "Unknown Patient"}</Text>
              
              {/* EXAMPLE: Displaying future Aadhar data */}
              {/* {scannedResult?.aadhar && <Text style={{textAlign: 'center', marginBottom: 10}}>Aadhar: {scannedResult.aadhar}</Text>} */}

              <View style={styles.resBasicInfo}>
                <Text style={styles.resBasicText}>Age: <Text style={styles.bold}>{scannedResult?.age || "N/A"}</Text></Text>
                <Text style={styles.resBasicText}>Blood: <Text style={styles.bold}>{scannedResult?.blood || "N/A"}</Text></Text>
              </View>
            </View>

            <ResultSection label="ALLERGIES" items={scannedResult?.allergies} color="#CC0000" bg="#FFDADA" />
            <ResultSection label="MEDICATIONS" items={scannedResult?.meds} color="#0D47A1" bg="#D1E9FF" />
            <ResultSection label="SURGERIES" items={scannedResult?.surgeries} color="#7E22CE" bg="#F3E8FF" />
            <ResultSection label="CONTACTS" items={scannedResult?.contacts} color="#15803D" bg="#DCFCE7" />

            <TouchableOpacity onPress={() => setScannedResult(null)} style={styles.closeModalBtn}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Close Medical Record</Text></TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

// ==========================================
// ZONE 6: REUSABLE COMPONENTS
// ==========================================
const TagCard = ({ label, value, onChangeText, onAdd, items, onRemove, themeColor, bgColor, keyboardType = "default" }) => (
  <View style={styles.card}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputRow}>
      <TextInput style={[styles.input, { flex: 1 }]} value={value} onChangeText={onChangeText} placeholder="Add new..." keyboardType={keyboardType} />
      <TouchableOpacity onPress={onAdd} style={[styles.addBtn, { backgroundColor: themeColor }]}><Plus color="white" /></TouchableOpacity>
    </View>
    <View style={styles.tagWrapper}>
      {items.map((item, i) => (
        <View key={i} style={[styles.tag, { backgroundColor: bgColor }]}>
          <Text style={[styles.tagText, { color: themeColor }]}>{item}</Text>
          <TouchableOpacity onPress={() => onRemove(i)}><X size={14} color={themeColor} /></TouchableOpacity>
        </View>
      ))}
    </View>
  </View>
);

const ResultSection = ({ label, items, color, bg }) => (
  <View style={[styles.card, { marginTop: 15 }]}>
    <Text style={styles.resLabel}>{label}</Text>
    <View style={styles.tagWrapper}>
      {items && items.length > 0 ? items.map((t, i) => <Text key={i} style={[styles.resTag, { backgroundColor: bg, color: color }]}>{t}</Text>) : <Text style={styles.emptyText}>None listed</Text>}
    </View>
  </View>
);

// ==========================================
// ZONE 7: STYLES
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F4F7' },
  scrollContent: { padding: 20, paddingBottom: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25, marginTop: 10 },
  title: { fontSize: 32, fontWeight: '900', color: '#1A1A1A' },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 20, marginBottom: 20, elevation: 3 },
  section: { marginBottom: 15 },
  row: { flexDirection: 'row', gap: 15, marginTop: 15 },
  label: { fontSize: 13, fontWeight: '800', color: '#6B7280', textTransform: 'uppercase', marginBottom: 8 },
  input: { backgroundColor: '#F9FAFB', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#E5E7EB', fontSize: 16 },
  inputRow: { flexDirection: 'row', gap: 10 },
  addBtn: { padding: 16, borderRadius: 14, justifyContent: 'center', alignItems: 'center', width: 60 },
  tagWrapper: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 },
  tag: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, gap: 6 },
  tagText: { fontWeight: '700', fontSize: 14 },
  generateBtn: { backgroundColor: '#10B981', flexDirection: 'row', padding: 20, borderRadius: 18, justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: 'white', fontWeight: '800', fontSize: 18 },
  qrContainer: { backgroundColor: 'white', padding: 30, borderRadius: 24, marginTop: 30, alignItems: 'center' },
  qrWrapper: { padding: 15, backgroundColor: 'white', borderRadius: 16, borderWidth: 1, borderColor: '#F3F4F6' },
  shareBtn: { backgroundColor: '#007AFF', padding: 16, borderRadius: 16, width: '100%', marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  shareBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
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
  resTag: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, fontWeight: '800', overflow: 'hidden' },
  emptyText: { color: '#9CA3AF', fontStyle: 'italic' },
  closeModalBtn: { backgroundColor: '#111827', padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 40 }
});
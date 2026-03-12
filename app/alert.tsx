import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Scanner() {

  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <Text>Requesting permission...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Camera permission is required</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);

    try {
      const parsed = JSON.parse(data);

      router.push({
        pathname: "/info",
        params: { patient: JSON.stringify(parsed) }
      });

    } catch {
      alert("Invalid QR Code");
      setScanned(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      <View style={styles.overlay}>
        <Text style={styles.scanText}>Scan Patient QR</Text>
      </View>

      {scanned && (
        <Button title="Scan Again" onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  overlay: {
    position: "absolute",
    top: 70,
    alignSelf: "center",
  },

  scanText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Alert() {

  const { patient } = useLocalSearchParams();
  const data = JSON.parse(patient as string);

  const [message, setMessage] = useState(
    `🚑 Emergency Alert\n\n${data.name} has been injured and is being taken to hospital.\nPlease contact immediately.`
  );

  const sendSMS = async () => {

  try {

    const res = await fetch("http://192.168.26.1/send-alert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: data.phone,
        message
      })
    });

    const result = await res.json();

    alert(result.status);

  } catch (err) {

    console.log(err);
    alert("Cannot reach server. Make sure backend is running.");

  }

};

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Emergency Alert</Text>

      <Text style={styles.subtitle}>
        Send alert to family member
      </Text>

      <TextInput
        style={styles.message}
        multiline
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={sendSMS}>
        <Text style={styles.btnText}>Send SMS Alert</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#F4F6FA"
  },

  title:{
    fontSize:26,
    fontWeight:"700",
    marginBottom:10
  },

  subtitle:{
    color:"#6B7280",
    marginBottom:20
  },

  message:{
    backgroundColor:"white",
    borderRadius:12,
    padding:15,
    height:140,
    textAlignVertical:"top",
    marginBottom:20
  },

  button:{
    backgroundColor:"#EF4444",
    padding:16,
    borderRadius:14,
    alignItems:"center"
  },

  btnText:{
    color:"white",
    fontWeight:"700",
    fontSize:16
  }

});
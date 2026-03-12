import { StyleSheet, TextInput } from "react-native";

export default function InputField(props: any) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#94A3B8"
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({

  input:{
    backgroundColor:"#0F172A",
    borderRadius:14,
    paddingVertical:14,
    paddingHorizontal:16,
    marginTop:12,
    color:"white",
    fontSize:15,

    borderWidth:1,
    borderColor:"#1F2A40"
  }

});
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function ActionButton({ title, color, onPress }: any) {
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: color }]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  btn:{
    padding:18,
    borderRadius:16,
    marginVertical:10,
    elevation:5,
    shadowColor:"#000",
    shadowOpacity:0.25,
    shadowRadius:6,
    shadowOffset:{ width:0, height:3 }
  },

  content:{
    alignItems:"center",
    justifyContent:"center"
  },

  text:{
    color:"white",
    fontSize:16,
    fontWeight:"700",
    letterSpacing:0.5
  }

});
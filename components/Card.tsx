import { StyleSheet, View } from "react-native";

export default function Card({ children }: any) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({

  card:{
    backgroundColor:"#121C2E",
    borderRadius:20,
    padding:20,
    marginVertical:12,

    borderWidth:1,
    borderColor:"#1F2A40",

    shadowColor:"#000",
    shadowOpacity:0.15,
    shadowRadius:10,
    shadowOffset:{ width:0, height:4 },

    elevation:4
  }

});
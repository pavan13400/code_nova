import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
export default function Hospitals() {
  
  const { patient } = useLocalSearchParams();
  const router = useRouter();
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHospitals();
  }, []);

  // const fetchHospitals = async () => {



  //   const { status } = await Location.requestForegroundPermissionsAsync();

  //   if (status !== "granted") {
  //     alert("Location permission required");
  //     return;
  //   }

  //   const location = await Location.getCurrentPositionAsync({});

  //   const lat = location.coords.latitude;
  //   const lng = location.coords.longitude;

  //   const url =
  //     `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&key=YOUR_API_KEY`;

  //   const res = await fetch(url);
  //   const data = await res.json();

  //   setHospitals(data.results);
  // };

  // const fetchHospitals = async () => {

  // const { status } = await Location.requestForegroundPermissionsAsync();

  // if (status !== "granted") {
  //   alert("Location permission required");
  //   return;
  // }

  // await Location.getCurrentPositionAsync({});

  // // Demo hospitals
  //   setHospitals([
  //     {
  //       place_id: "1",
  //       name: "Apollo Hospital",
  //       vicinity: "Jubilee Hills, Hyderabad"
  //     },
  //     {
  //       place_id: "2",
  //       name: "Yashoda Hospital",
  //       vicinity: "Secunderabad"
  //     },
  //     {
  //       place_id: "3",
  //       name: "Care Hospital",
  //       vicinity: "Banjara Hills"
  //     },
  //     {
  //       place_id: "4",
  //       name: "AIG Hospital",
  //       vicinity: "Gachibowli"
  //     },
  //     {
  //       place_id: "5",
  //       name: "KIMS Hospital",
  //       vicinity: "Kondapur"
  //     }
  //   ]);
  // };

  //   const fetchHospitals = async () => {

  //   const { status } = await Location.requestForegroundPermissionsAsync();

  //   if (status !== "granted") {
  //     alert("Location permission required");
  //     return;
  //   }

  //   const location = await Location.getCurrentPositionAsync({});

  //   const lat = location.coords.latitude;
  //   const lng = location.coords.longitude;

  //   const url =
  //     `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&key=AIzaSyDWFrjiG32UW6JkScXWue7JaZKOgixdDfM`;

  //   const res = await fetch(url);
  //   const data = await res.json();

  //   setHospitals(data.results);
  // };
  // const fetchHospitals = async () => {

  // const { status } = await Location.requestForegroundPermissionsAsync();

  // if (status !== "granted") {
  //   alert("Location permission required");
  //   return;
  // }

  // const location = await Location.getCurrentPositionAsync({});

  // const lat = location.coords.latitude;
  // const lng = location.coords.longitude;

  // console.log("Location:", lat, lng);

  //   const url =
  // `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY}`;

  //   const res = await fetch(url);
  //   const data = await res.json();

  //   console.log("API DATA:", data);

  //   setHospitals(data.results || []);
  // };
  const fetchHospitals = async () => {

  // Demo hospital list
  const demoHospitals = [
      {
        place_id: "1",
        name: "Apollo Hospital",
        vicinity: "Jubilee Hills, Hyderabad"
      },
      {
        place_id: "2",
        name: "Yashoda Hospital",
        vicinity: "Secunderabad, Hyderabad"
      },
      {
        place_id: "3",
        name: "CARE Hospital",
        vicinity: "Banjara Hills, Hyderabad"
      },
      {
        place_id: "4",
        name: "AIG Hospital",
        vicinity: "Gachibowli, Hyderabad"
      },
      {
        place_id: "5",
        name: "KIMS Hospital",
        vicinity: "Kondapur, Hyderabad"
      },
      {
        place_id: "6",
        name: "Gandhi Hospital",
        vicinity: "Musheerabad, Hyderabad"
      },
      {
        place_id: "7",
        name: "Osmania General Hospital",
        vicinity: "Afzal Gunj, Hyderabad"
      },
      {
        place_id: "8",
        name: "Sunshine Hospital",
        vicinity: "Paradise, Secunderabad"
      }
    ];

    setHospitals(demoHospitals);
  };
  const filtered = hospitals.filter((h) =>
      h.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Nearby Hospitals</Text>

      <TextInput
        style={styles.search}
        placeholder="Search hospital..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.place_id}
        // renderItem={({ item }) => (

        //   <TouchableOpacity style={styles.card}>

        //     <Text style={styles.name}>{item.name}</Text>

        //     <Text style={styles.address}>
        //       {item.vicinity}
        //     </Text>

        //   </TouchableOpacity>

        // )}
        renderItem={({ item }) => (

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/report",
              params: { hospital: JSON.stringify(item),
                patient: patient
               }
            })
          }
        >

          <Text style={styles.name}>{item.name}</Text>

          <Text style={styles.address}>
            {item.vicinity}
          </Text>

        </TouchableOpacity>

    )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F6FA",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 16,
    color: "#111827",
  },

  search: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 4,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  address: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 14,
  },
});
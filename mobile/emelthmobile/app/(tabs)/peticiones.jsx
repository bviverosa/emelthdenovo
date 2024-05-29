import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Text,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import RadioGroup from "react-native-radio-buttons-group";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";

const socket = io("http://10.0.0.23:3001");

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [requests, setRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);
  const [patientData, setPatientData] = useState({
    Type: "request",
    Name: "",
    LastName: "",
    LastName2: "",
    Description: "",
    Age: "",
    Emergency: "",
    Sex: "",
  });

  const regex = /^[A-Z][a-z\s]*$/;

  useFocusEffect(
    useCallback(() => {
      checkLoginStatus();
    }, [])
  );

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem("token");

    console.log(token);
    if (token) {
      setIsLoggedIn(true);
      const objectToken = JSON.parse(token);
      axios
        .post("http://10.0.0.23:3000/api/websocket", { id: objectToken.email })
        .then((res) => {
          const websocketid = res.data.websocketid;
          console.log(websocketid);
          const rol = objectToken.name;
          socket.emit("client_id", {
            client_id: websocketid,
            rol: rol,
            id: objectToken.email,
          });
        });
    } else if (token == null) {
      setIsLoggedIn(true);
      console.log("no registrado");
    }
  };

  useEffect(() => {
    socket.on("server_requests", (data) => {
      setRequests(data);
    });
    return () => {
      socket.off("server_message");
    };
  }, []);

  const handleInputChange = (name, text) => {
    setPatientData({
      ...patientData,
      [name]: text,
    });
  };

  const handleSendData = async () => {
    const token = await AsyncStorage.getItem("token");
    const objectToken = JSON.parse(token);
    socket.emit("send_message", {
      message: patientData,
      session: objectToken.email,
    });
    setPatientData({
      Type: "request",
      Name: "",
      LastName: "",
      LastName2: "",
      Description: "",
      Age: "",
      Emergency: "",
      Sex: "",
    });
  };

  const emergencyButtons = useMemo(
    () => [
      {
        id: "1",
        label: "C1",
        value: "C1",
        borderColor: "#FFFFFF",
        color: "#FFFFFF",
      },
      {
        id: "2",
        label: "C2",
        value: "C2",
        borderColor: "#FFFFFF",
        color: "#FFFFFF",
      },
      {
        id: "3",
        label: "C3",
        value: "C3",
        borderColor: "#FFFFFF",
        color: "#FFFFFF",
      },
      {
        id: "4",
        label: "C4",
        value: "C4",
        borderColor: "#FFFFFF",
        color: "#FFFFFF",
      },
      {
        id: "5",
        label: "C5",
        value: "C5",
        borderColor: "#FFFFFF",
        color: "#FFFFFF",
      },
    ],
    []
  );

  const sexButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Femenino",
        value: "femenino",
        borderColor: "#FFFFFF",
        color: "#FFFFFF",
      },
      {
        id: "2",
        label: "Masculino",
        value: "Masculino",
        borderColor: "#FFFFFF",
        color: "#FFFFFF",
      },
    ],
    []
  );

  if (!isLoggedIn) {
    return (
      <ThemedView style={styles.centeredView}>
        <Text style={styles.message}>Aún no ha iniciado sesión</Text>
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={90} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.formContainer}>
        <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>
          Crear Folio
        </Text>
        <Text style={{ color: "white" }}>
          Selecciona el nivel de emergencia
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <RadioGroup
            radioButtons={emergencyButtons}
            onPress={(id) => handleInputChange("Emergency", String(id))}
            selectedId={patientData.Emergency}
            labelStyle={{ color: "white" }}
            layout="row"
          />
        </View>
        <Text style={{ color: "white" }}>Nombre paciente</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange("Name", text)}
          value={patientData.Name}
          placeholder="Nombre del paciente"
        />
        <Text style={{ color: "white" }}>Apellido Paterno</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange("LastName", text)}
          value={patientData.LastName}
          placeholder="Apellido Paterno"
        />
        <Text style={{ color: "white" }}>Apellido Materno</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange("LastName2", text)}
          value={patientData.LastName2}
          placeholder="Apellido Materno"
        />
        <Text style={{ color: "white" }}>Edad</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange("Age", text)}
          value={patientData.Age}
          placeholder="Edad"
          keyboardType="numeric"
        />
        <Text style={{ color: "white" }}>Sexo</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <RadioGroup
            radioButtons={sexButtons}
            onPress={(id) => handleInputChange("Sex", String(id))}
            selectedId={patientData.Sex}
            labelStyle={{ color: "white" }}
          />
        </View>
        <Text style={{ color: "white" }}>Padecimiento actual</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange("Description", text)}
          value={patientData.Description}
          placeholder="Padecimiento"
        />
        <Button title="Generar" onPress={handleSendData} color="#1F2937" />
        <Button
          title="Mostrar Peticiones"
          onPress={() => setShowRequests(!showRequests)}
          color="#1F2937"
        />
        {showRequests && (
          <ScrollView style={styles.tableContainer} horizontal>
            <View>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>ID</Text>
                <Text style={styles.tableHeaderText}>Nombre</Text>
                <Text style={styles.tableHeaderText}>Apellido Paterno</Text>
                <Text style={styles.tableHeaderText}>Apellido Materno</Text>
                <Text style={styles.tableHeaderText}>Padecimiento</Text>
                <Text style={styles.tableHeaderText}>Estado</Text>
                <Text style={styles.tableHeaderText}>ID res</Text>
              </View>
              {requests.map((request, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableRowText}>{index}</Text>
                  <Text style={styles.tableRowText}>{request.per_nombre}</Text>
                  <Text style={styles.tableRowText}>{request.per_appat}</Text>
                  <Text style={styles.tableRowText}>{request.per_apmat}</Text>
                  <Text style={styles.tableRowText}>
                    {request.pac_padecimiento}
                  </Text>
                  <Text style={styles.tableRowText}>{request.est_estado}</Text>
                  <Text style={styles.tableRowText}>{request.id_res}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#374151",
  },
  message: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
    color: "white",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#374151",
    padding: 20,
    paddingTop: 50,
  },
  tableContainer: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#D0D0D0",
    paddingVertical: 10,
  },
  tableHeaderText: {
    color: "#000",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableRowText: {
    color: "#FFF",
    flex: 1,
    textAlign: "center",
  },
});

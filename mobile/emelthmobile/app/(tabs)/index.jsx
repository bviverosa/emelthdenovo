import React, { useState,useEffect } from 'react';
import { Image, StyleSheet, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';

export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      
      console.log("Ha iniciado sesion")
    }else{
      console.log("no registrado")
    }
  };
  const handleLogout= async()=>{
    console.log("has cerrado sesion")
    await AsyncStorage.setItem('token','')
    Alert.alert("Loged out ")
  
    
  }
  const handleLogin = () => {
    axios.post('http://10.0.0.23:3000/api/connect', {
      username,
      password,
    })
    .then(res => {
      if (res.data) {
         AsyncStorage.setItem('token', JSON.stringify(res.data))
          .then(() => {
            console.log(res.data);
            Alert.alert('Inicio de sesión exitoso');
          })
          .catch(error => {
            console.error('Error storing token:', error);
            Alert.alert('Login Error', 'An error occurred while storing the token');
          });
      } else {
        Alert.alert('Login Failed', 'No response data');
      }
    })
    .catch(error => {
      console.error('Login Error:', error);
      Alert.alert('Login Error', 'An error occurred during login');
    });
  };
  
  

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Inicio de sesión</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Usuario</ThemedText>
        <TextInput
          placeholder='Usuario'
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Contraseña</ThemedText>
        <TextInput
          placeholder='Contraseña'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <Button title="Iniciar Sesión" onPress={handleLogin} />
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
      <Button title="Cerrar Sesión" onPress={handleLogout} />

      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
});

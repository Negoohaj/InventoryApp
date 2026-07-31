import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    // criar usuário padrão na primeira execução (se quiser, altere aqui)
    (async () => {
      const exists = await AsyncStorage.getItem("user:created");
      if (!exists) {
        await AsyncStorage.setItem("app:user", JSON.stringify({ username: "admin", password: "1234" }));
        await AsyncStorage.setItem("user:created", "true");
      }
    })();
  }, []);

  const tryLogin = async () => {
    const raw = await AsyncStorage.getItem("app:user");
    const u = raw ? JSON.parse(raw) : null;
    if (u && user === u.username && pass === u.password) {
      navigation.replace("Produtos");
    } else {
      Alert.alert("Erro", "Usuário ou senha inválidos. Usuário padrão: admin / 1234");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Entrar</Text>
      <Text>Usuário</Text>
      <TextInput value={user} onChangeText={setUser} style={{ borderWidth: 1, padding: 8, marginBottom: 12 }} />
      <Text>Senha</Text>
      <TextInput secureTextEntry value={pass} onChangeText={setPass} style={{ borderWidth: 1, padding: 8, marginBottom: 12 }} />
      <Button title="Entrar" onPress={tryLogin} />
      <View style={{ height: 12 }} />
      <Button title="Entrar como admin (teste)" onPress={() => { setUser("admin"); setPass("1234"); }} />
    </View>
  );
}

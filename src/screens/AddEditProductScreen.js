import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { addProduct, updateProduct, deleteProduct, getProducts } from "../db/database";

export default function AddEditProductScreen({ route, navigation }) {
  const editing = route.params?.product || null;
  const [nome, setNome] = useState(editing?.nome || "");
  const [categoria, setCategoria] = useState(editing?.categoria || "");
  const [quantidade, setQuantidade] = useState(String(editing?.quantidade ?? "0"));
  const [preco, setPreco] = useState(String(editing?.preco ?? "0"));

  const save = () => {
    if (!nome) return Alert.alert("Erro", "Nome é obrigatório");
    const data = { nome, categoria, quantidade: parseInt(quantidade || "0"), preco: parseFloat(preco || "0") };
    if (editing) {
      updateProduct({ id: editing.id, ...data }, (err) => {
        if (!err) navigation.goBack();
      });
    } else {
      addProduct(data, (err) => {
        if (!err) navigation.goBack();
      });
    }
  };

  const remove = () => {
    if (!editing) return;
    Alert.alert("Confirma", "Deseja remover este produto?", [
      { text: "Cancelar" },
      { text: "Sim", onPress: () => deleteProduct(editing.id, () => navigation.goBack()) },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <Text>Categoria</Text>
      <TextInput value={categoria} onChangeText={setCategoria} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <Text>Quantidade</Text>
      <TextInput keyboardType="number-pad" value={quantidade} onChangeText={setQuantidade} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <Text>Preço</Text>
      <TextInput keyboardType="decimal-pad" value={preco} onChangeText={setPreco} style={{ borderWidth: 1, padding: 8, marginBottom: 12 }} />
      <Button title={editing ? "Salvar" : "Adicionar"} onPress={save} />
      {editing && <View style={{ height: 8 }} />}
      {editing && <Button title="Remover produto" onPress={remove} color="#c00" />}
    </View>
  );
}

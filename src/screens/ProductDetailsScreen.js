import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";
import { getProducts, registerSale } from "../db/database";

export default function ProductDetailsScreen({ route, navigation }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [sellQty, setSellQty] = useState("1");

  const load = () => {
    getProducts((err, rows) => {
      if (!err) {
        const p = rows.find((r) => r.id === productId);
        setProduct(p);
      }
    });
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", load);
    load();
    return unsub;
  }, [navigation]);

  const sell = () => {
    const q = parseInt(sellQty || "0");
    if (!q || q <= 0) return Alert.alert("Erro", "Quantidade inválida");
    if (!product || product.quantidade < q) return Alert.alert("Erro", "Quantidade em estoque insuficiente");
    registerSale(productId, q, (err) => {
      if (!err) {
        Alert.alert("OK", "Venda registrada");
        load();
      }
    });
  };

  if (!product) return <View style={{ padding: 12 }}><Text>Carregando...</Text></View>;

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 20 }}>{product.nome}</Text>
      <Text>Categoria: {product.categoria}</Text>
      <Text>Estoque: {product.quantidade}</Text>
      <Text>Vendidos: {product.total_vendido || 0}</Text>
      <Text>Preço: R$ {product.preco}</Text>

      <View style={{ height: 12 }} />
      <Text>Registrar venda</Text>
      <TextInput value={sellQty} onChangeText={setSellQty} keyboardType="number-pad" style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <Button title="Vender" onPress={sell} />

      <View style={{ height: 12 }} />
      <Button title="Editar" onPress={() => navigation.navigate("Adicionar", { product })} />
    </View>
  );
}

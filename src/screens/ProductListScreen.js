import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, Alert } from "react-native";
import { getProducts } from "../db/database";

export default function ProductListScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);

  const load = () => {
    getProducts((err, rows) => {
      if (!err) setProdutos(rows);
    });
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", load);
    load();
    return unsub;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        <Button title="Adicionar" onPress={() => navigation.navigate("Adicionar")} />
        <Button title="Estatísticas" onPress={() => navigation.navigate("Estatísticas")} />
      </View>

      <FlatList
        data={produtos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Detalhes", { productId: item.id })}
            style={{ padding: 12, borderBottomWidth: 1 }}
          >
            <Text style={{ fontSize: 16 }}>{item.nome} ({item.quantidade})</Text>
            <Text>Vendidos: {item.total_vendido || 0} • R$ {item.preco ?? "0"}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Nenhum produto cadastrado.</Text>}
      />
    </View>
  );
}

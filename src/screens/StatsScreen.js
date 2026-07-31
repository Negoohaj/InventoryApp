import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { getStats } from "../db/database";
import { BarChart } from "react-native-chart-kit";

export default function StatsScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getStats((err, rows) => {
      if (!err) setData(rows);
    });
  }, []);

  const labels = data.slice(0, 6).map((d) => d.nome);
  const values = data.slice(0, 6).map((d) => d.total_vendido || 0);

  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Produtos mais vendidos</Text>
      {data.length === 0 ? <Text>Nenhuma venda registrada ainda.</Text> : (
        <BarChart
          data={{
            labels,
            datasets: [{ data: values }]
          }}
          width={screenWidth - 24}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
          }}
          verticalLabelRotation={30}
        />
      )}
    </ScrollView>
  );
}

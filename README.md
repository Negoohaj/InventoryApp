# 📦 InventoryApp

![Tela de estatísticas do app](./assets/screenshot.png)

Aplicativo mobile de controle de estoque, desenvolvido em **React Native + Expo**, criado para uso real em um pequeno negócio da família. Permite cadastrar produtos, registrar vendas com baixa automática no estoque e visualizar as estatísticas de produtos mais vendidos.

## ✨ Funcionalidades

- 🔐 **Login** simples para acesso ao sistema
- 📋 **Listagem de produtos** com nome, categoria, quantidade e preço
- ➕ **Cadastro e edição** de produtos (mesma tela reaproveitada para os dois casos)
- 💰 **Registro de vendas**, com baixa automática da quantidade em estoque e atualização do total vendido
- 📊 **Painel de estatísticas** com gráfico dos produtos mais vendidos
- 💾 Persistência local de dados com **SQLite** — funciona offline, sem depender de servidor externo

## 🛠️ Tecnologias

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/) (navegação)
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) (banco de dados local, API assíncrona)
- [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit) (gráficos)
- JavaScript / TypeScript

## 🗂️ Estrutura do projeto

```
src/
├── db/
│   └── database.js          # Camada de acesso ao banco SQLite (CRUD + vendas + estatísticas)
└── screens/
    ├── LoginScreen.js          # Autenticação local
    ├── ProductListScreen.js    # Lista de produtos cadastrados
    ├── AddEditProductScreen.js # Cadastro/edição de produto
    ├── ProductDetailsScreen.js # Detalhes + registro de venda
    └── StatsScreen.js          # Gráfico de produtos mais vendidos
```

## 🚀 Como rodar o projeto

Pré-requisito: [Node.js](https://nodejs.org/) instalado.

```bash
# Instala as dependências
npm install

# Roda no navegador (não precisa de celular)
npm run web

# Ou roda no Expo Go (celular Android/iOS)
npx expo start
```

## 🔑 Acesso de demonstração

```
Usuário: admin
Senha: 1234
```

> Login local simples, criado para fins de demonstração. Em uma versão de produção, seria substituído por autenticação real com backend.

## 💡 Decisões técnicas

- Cada tela recarrega os dados do banco sempre que ganha foco (`navigation.addListener("focus", ...)`), garantindo que o estoque exibido esteja sempre atualizado após qualquer alteração feita em outra tela.
- O registro de venda usa uma transação (`withTransactionAsync`), garantindo que o histórico de vendas e a atualização do estoque aconteçam de forma consistente — se uma falhar, a outra é revertida.

## 📌 Contexto

Este projeto nasceu de uma necessidade real: ajudar a controlar o estoque de um pequeno negócio da família, substituindo o controle manual por um app simples e funcional.
import * as SQLite from "expo-sqlite";

const dbPromise = SQLite.openDatabaseAsync("inventory.db");

export async function initDB() {
  const db = await dbPromise;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      categoria TEXT,
      quantidade INTEGER NOT NULL,
      preco REAL,
      total_vendido INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS vendas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produto_id INTEGER,
      quantidade INTEGER,
      data TEXT
    );
  `);
}

export async function getProducts(callback) {
  try {
    const db = await dbPromise;
    const rows = await db.getAllAsync("SELECT * FROM produtos ORDER BY nome;");
    callback(null, rows);
  } catch (error) {
    callback(error);
  }
}

export async function addProduct(
  { nome, categoria, quantidade, preco },
  callback,
) {
  try {
    const db = await dbPromise;
    const result = await db.runAsync(
      "INSERT INTO produtos (nome, categoria, quantidade, preco) VALUES (?, ?, ?, ?);",
      [nome, categoria || "", quantidade, preco || 0],
    );
    callback(null, result);
  } catch (error) {
    callback(error);
  }
}

export async function updateProduct(
  { id, nome, categoria, quantidade, preco },
  callback,
) {
  try {
    const db = await dbPromise;
    const result = await db.runAsync(
      "UPDATE produtos SET nome=?, categoria=?, quantidade=?, preco=? WHERE id=?;",
      [nome, categoria || "", quantidade, preco || 0, id],
    );
    callback(null, result);
  } catch (error) {
    callback(error);
  }
}

export async function deleteProduct(id, callback) {
  try {
    const db = await dbPromise;
    const result = await db.runAsync("DELETE FROM produtos WHERE id=?;", [id]);
    callback(null, result);
  } catch (error) {
    callback(error);
  }
}

export async function registerSale(produto_id, quantidade, callback) {
  const now = new Date().toISOString();
  try {
    const db = await dbPromise;
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        "INSERT INTO vendas (produto_id, quantidade, data) VALUES (?, ?, ?);",
        [produto_id, quantidade, now],
      );
      await db.runAsync(
        "UPDATE produtos SET quantidade = quantidade - ?, total_vendido = total_vendido + ? WHERE id = ?;",
        [quantidade, quantidade, produto_id],
      );
    });
    callback(null, { changes: 1 });
  } catch (error) {
    callback(error);
  }
}

export async function getStats(callback) {
  try {
    const db = await dbPromise;
    const rows = await db.getAllAsync(
      "SELECT id, nome, total_vendido FROM produtos ORDER BY total_vendido DESC;",
    );
    callback(null, rows);
  } catch (error) {
    callback(error);
  }
}

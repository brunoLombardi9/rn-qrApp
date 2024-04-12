import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("urls");

export async function createHistoryTable() {
  return new Promise((resolve, reject) => {
    database.transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS visited_urls (id INTEGER PRIMARY KEY AUTOINCREMENT, link TEXT, timestamp DATETIME DEFAULT (datetime('now', 'localtime')))"
        );
      },
      reject,
      resolve()
    );
  });
}

export async function getUrls() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM visited_urls ORDER BY timestamp DESC",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        }
      );
    });
  });
}

export async function saveUrl(url) {
  return new Promise((resolve) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM visited_urls WHERE link = ?",
        [url],
        (_, { rows }) => {
          const existingUrls = rows._array;

          if (existingUrls.length === 0) {
            tx.executeSql(
              "INSERT INTO visited_urls (link, timestamp) VALUES (?, datetime('now', 'localtime'))",
              [url],
              (_, { rows }) => {
                resolve(rows._array);
              }
            );
          } else {
            tx.executeSql(
              "UPDATE visited_urls SET timestamp = datetime('now', 'localtime') WHERE link = ?",
              [url],
              (_, { rows }) => {
                resolve(existingUrls);
              }
            );
          }
        }
      );
    });
  });
}

export async function deleteAllUrls() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql("DELETE FROM visited_urls", [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export async function deleteUrl(id) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM visited_urls WHERE id = ?",
        [id],
        (_, { rows }) => {
          resolve(rows._array);
        }
      );
    });
  });
}

export async function dropTable() {
  return new Promise((resolve, reject) => {
    database.transaction(
      (tx) => {
        tx.executeSql("DROP TABLE IF EXISTS visited_urls");
      },
      (error) => {
        reject(error);
      },
      () => {
        resolve();
      }
    );
  });
}

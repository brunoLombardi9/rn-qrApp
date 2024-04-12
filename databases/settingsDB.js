import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("settings");

export async function createSettingsTable() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, language TEXT DEFAULT 'english', saveOnGenerate BOOL DEFAULT 1, saveOnScan BOOL DEFAULT 1, openOnScan BOOL DEFAULT 0, themeColor TEXT DEFAULT '#00ed83')",
        [],
        (_, createResult) => {
          tx.executeSql("SELECT * FROM settings", [], (_, { rows }) => {
            const rowCount = rows.length;

            if (rowCount === 0) {
              tx.executeSql(
                "INSERT INTO settings (language, saveOnGenerate, saveOnScan, openOnScan, themeColor) VALUES (?, ?, ?, ?, ?)",
                ["english", 1, 1, 0, "#00ed83"],
                (_, insertResult) => {
                  resolve();
                },
                (_, insertError) => {
                  reject(insertError);
                }
              );
            } else {
              resolve();
            }
          });
        },
        (_, createError) => {
          reject(createError);
        }
      );
    });
  });
}

export async function getSettings() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM settings WHERE id = 1",
        [],
        (_, { rows }) => {
          const data = rows._array;
          resolve(data);
        }
      );
    });
  });
}

export async function updateLanguageSetting(newLanguage) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE settings SET language = ? WHERE id = 1",
        [newLanguage],
        (_, updateResult) => {
          resolve();
        },
        (_, updateError) => {
          reject(updateError);
        }
      );
    });
  });
}

export async function updateSaveOnScan(newValue) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE settings SET saveOnScan = ? WHERE id = 1",
        [newValue],
        (_, updateResult) => {
          resolve();
        },
        (_, updateError) => {
          reject(updateError);
        }
      );
    });
  });
}

export async function updateSaveOnGenerate(newValue) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE settings SET saveOnGenerate = ? WHERE id = 1",
        [newValue],
        (_, updateResult) => {
          resolve();
        },
        (_, updateError) => {
          reject(updateError);
        }
      );
    });
  });
}

export async function updateOpenOnScan(newValue) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE settings SET openOnScan = ? WHERE id = 1",
        [newValue],
        (_, updateResult) => {
          resolve();
        },
        (_, updateError) => {
          reject(updateError);
        }
      );
    });
  });
}

export async function updateThemeColor(newValue) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      console.log(newValue);
      tx.executeSql(
        "UPDATE settings SET themeColor = ? WHERE id = 1",
        [newValue],
        (_, updateResult) => {
          resolve();
        },
        (_, updateError) => {
          reject(updateError);
        }
      );
    });
  });
}

export async function dropTaSettingsTable() {
  return new Promise((resolve, reject) => {
    database.transaction(
      (tx) => {
        tx.executeSql("DROP TABLE IF EXISTS settings", [], (_, result) => {});
      },
      (_, error) => {
        reject(error);
      },
      () => {
        resolve();
      }
    );
  });
}

export const openDatabase = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open("UserDatabase", 1);

        request.onupgradeneeded = function () {
            const db = request.result;
            if (!db.objectStoreNames.contains("users")) {
                db.createObjectStore("users", { keyPath: "email" }); 
              }
        };

        request.onsuccess = function () {
            resolve(request.result);
        };

        request.onerror = function () {
            reject("Error al abrir la base de datos.");
        };
    });
};
export const checkIfUserExists = async (email: string): Promise<boolean> => {
    if (!email) {
      console.error("El email proporcionado es inválido.");
      return false;
    }
  
    const db = await openDatabase();
  
    return new Promise<boolean>((resolve, reject) => {
      const transaction = db.transaction("users", "readonly");
      const store = transaction.objectStore("users");
  
      const request = store.get(email);
  
      request.onsuccess = function () {
        resolve(!!request.result); // Devuelve true si el usuario existe
      };
  
      request.onerror = function () {
        reject("Error al verificar si el usuario existe.");
      };
    });
  };
    export const loginUser = async (email: string, password: string) => {
        const db = await openDatabase();
    
        return new Promise<string>((resolve, reject) => {
        const transaction = db.transaction("users", "readonly");
        const store = transaction.objectStore("users");
    
        const request = store.get(email);
    
        request.onsuccess = function () {
            const user = request.result;
            if (user && user.password === password) {
            console.log("Login exitoso");
            resolve(email); 
            } else {
            resolve("");
            }
        };
    
        request.onerror = function () {
            reject("Error al verificar las credenciales.");
        };
        });
    };
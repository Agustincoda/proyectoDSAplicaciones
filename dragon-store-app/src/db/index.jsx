import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase("mundogeek.db")

// createSessionsTable() tiene que correr una vez al arrancar la app
// (se llama desde App.jsx) antes de usar insertSession/fetchSession:
// si la tabla no existe todavía, esas dos funciones fallan con un
// error de SQL ("no such table: sessions") que solo se ve en la consola.
export const createSessionsTable = () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL  ) '
        db.transaction(tx=>tx.executeSql(query,[],(_,result)=>resolved(result),(_,result)=>rejected(result)))
    })
    return promise
}

export const insertSession = ({email, localId, token}) => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'INSERT INTO sessions (email, localId, token) VALUES (?,?,?)'
        db.transaction(tx=>tx.executeSql(query,[email,localId, token],(_,result)=>resolved(result),(_,result)=>rejected(result)))
    })
    return promise
}

export const fetchSession = () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'SELECT * FROM sessions'
        db.transaction(tx=>tx.executeSql(query,[],(_,result)=>resolved(result.rows._array),(_,result)=>rejected(result)))
    })
    return promise
}

//FUNCION PELIGROSA:
export const clearSessions= () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = "DELETE FROM sessions"
        db.transaction(tx=>{tx.executeSql(query,[],(_, result)=>resolved(result),(_,error)=>rejected(error))})
    })
    return promise
}

// Fila única (id fijo en 1) para guardar preferencias de UI que tienen
// que sobrevivir a que se cierre la app, como el tema claro/oscuro.
export const createPreferencesTable = () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'CREATE TABLE IF NOT EXISTS preferences (id INTEGER PRIMARY KEY CHECK (id = 1), isDark INTEGER NOT NULL)'
        db.transaction(tx=>tx.executeSql(query,[],(_,result)=>resolved(result),(_,result)=>rejected(result)))
    })
    return promise
}

export const saveThemePreference = (isDark) => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'INSERT OR REPLACE INTO preferences (id, isDark) VALUES (1, ?)'
        db.transaction(tx=>tx.executeSql(query,[isDark ? 1 : 0],(_,result)=>resolved(result),(_,result)=>rejected(result)))
    })
    return promise
}

export const fetchThemePreference = () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'SELECT * FROM preferences WHERE id = 1'
        db.transaction(tx=>tx.executeSql(query,[],(_,result)=>resolved(result.rows._array),(_,result)=>rejected(result)))
    })
    return promise
}
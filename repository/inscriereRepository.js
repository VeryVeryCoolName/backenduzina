import sqlite3 from "sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = new sqlite3.Database(
    path.join(__dirname,"..","inscrieri.db")
);

export function adaugaInscriere(date) {
    return new Promise((resolve,reject)=> {
        const sql = `
        INSERT INTO inscrieri
        (nume, prenume, email, zile, facultate, an, sursa)
        VALUES (?,?,?,?,?,?,?)`;
        const valori = [
            date.nume,
            date.prenume,
            date.email,
            JSON.stringify(date.zile),
            JSON.stringify(date.facultate),
            date.an,
            date.sursa
        ];
        db.run(sql, valori, function(eroare){
            if(eroare) {
                return reject(eroare);
            }
            resolve(this.lastID);
        });
    });
}
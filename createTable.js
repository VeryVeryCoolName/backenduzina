import path from "node:path";
import { fileURLToPath } from "node:url";
import sqlite3 from "sqlite3";
import { execute } from "./sql.js";

const main = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const db = new sqlite3.Database(path.join(__dirname,"inscrieri.db"));
    try {
        await execute(
            db,
            ` CREATE TABLE IF NOT EXISTS inscrieri (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nume TEXT NOT NULL,
                    prenume TEXT NOT NULL,
                    email TEXT NOT NULL,
                    zile TEXT NOT NULL,
                    facultate TEXT NOT NULL,
                    an INTEGER NOT NULL,
                    sursa TEXT,
                    data_inscrierii TEXT DEFAULT CURRENT_TIMESTAMP
                )`
        );
        console.log("Created table.");
    } catch (err) {
        console.log(err);
    } finally {
        db.close();
    }

};

main();
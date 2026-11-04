import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import inscriereRoutes from "./routes/inscriereRoutes.js";

const app = express();
const PORT = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

app.use("/api/inscriere",inscriereRoutes);

app.listen(PORT,() => {
    console.log(`Server online: http://localhost:${PORT}`);

});
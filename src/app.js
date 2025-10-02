import express from "express";
import cors from "cors";
import LoginRoutes from "./app/routes/LoginRoutes.js";

const app = express();
const port = 4005;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/auth", LoginRoutes);

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));

export default app; // ✅ export default
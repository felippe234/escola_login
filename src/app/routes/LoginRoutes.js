import express from "express";
import LoginController from "../controllers/LoginController.js";

const router = express.Router();

// 🔹 Rotas de login e senha
router.post("/login", (req, res) => LoginController.login(req, res));
router.post("/alterar-senha", (req, res) => LoginController.alterarSenha(req, res));
router.post("/solicitar-recuperacao", (req, res) => LoginController.solicitarRecuperacao(req, res));
router.post("/redefinir-senha", (req, res) => LoginController.redefinirSenha(req, res));

export default router;
// src/repositories/LoginRepository.js
import db from "../database/conexao.js";

class LoginRepository {
  // 🔹 Buscar login pelo email
  async buscarPorEmail(email) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM login WHERE email = ? LIMIT 1",
        [email]
      );
      return rows[0] || null;
    } catch (err) {
      console.error("Erro ao buscar usuário por email:", err);
      throw err;
    }
  }

  // 🔹 Atualizar senha
  async atualizarSenha(usuario_id, novaSenha) {
    try {
      const [result] = await db.query(
        "UPDATE login SET senha = ? WHERE usuario_id = ?",
        [novaSenha, usuario_id]
      );
      return result.affectedRows; // retorna quantas linhas foram alteradas
    } catch (err) {
      console.error("Erro ao atualizar senha:", err);
      throw err;
    }
  }

  // 🔹 Definir token de recuperação
  async setResetToken(usuario_id, token) {
    try {
      await db.query(
        `UPDATE login 
         SET reset_token = ?, reset_token_expira = DATE_ADD(NOW(), INTERVAL 1 HOUR) 
         WHERE usuario_id = ?`,
        [token, usuario_id]
      );
    } catch (err) {
      console.error("Erro ao salvar reset token:", err);
      throw err;
    }
  }

  // 🔹 Buscar usuário pelo token de recuperação válido
  async buscarPorResetToken(token) {
    try {
      const [rows] = await db.query(
        `SELECT * FROM login 
         WHERE reset_token = ? 
           AND reset_token_expira > NOW() 
         LIMIT 1`,
        [token]
      );
      return rows[0] || null;
    } catch (err) {
      console.error("Erro ao buscar por reset token:", err);
      throw err;
    }
  }

  // 🔹 Limpar token após redefinir senha
  async limparResetToken(usuario_id) {
    try {
      await db.query(
        "UPDATE login SET reset_token = NULL, reset_token_expira = NULL WHERE usuario_id = ?",
        [usuario_id]
      );
    } catch (err) {
      console.error("Erro ao limpar reset token:", err);
      throw err;
    }
  }
}

export default new LoginRepository();

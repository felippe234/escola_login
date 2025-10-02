import crypto from "crypto";
import LoginRepository from "../repositories/LoginRepository.js";
import sendEmail from "../utils/sendEmail.js";

class LoginController {
  // 🔹 Login
  async login(req, res) {
    const { email, senha } = req.body;
    try {
      const loginUser = await LoginRepository.buscarPorEmail(email);
      if (!loginUser) return res.status(404).json({ erro: "Usuário não encontrado" });

      console.log("Senha digitada:", senha);
      console.log("Senha no banco:", loginUser.senha);

      // Comparação direta
      const senhaCorreta = senha === loginUser.senha;

      if (!senhaCorreta) return res.status(401).json({ erro: "Senha incorreta" });

      res.status(200).json({
        msg: "Login bem-sucedido",
        usuario: {
          usuario_id: loginUser.usuario_id,
          email: loginUser.email,
          tipo_usuario: loginUser.tipo_usuario,
          primeira_senha: loginUser.primeira_senha
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao processar login" });
    }
  }

  // 🔹 Alterar senha
  async alterarSenha(req, res) {
    const { usuario_id, nova_senha } = req.body;
    if (!nova_senha || nova_senha.length < 4) {
      return res.status(400).json({ erro: "Nova senha inválida" });
    }

    try {
      // Aqui salva a senha em texto puro
      const linhas = await LoginRepository.atualizarSenha(usuario_id, nova_senha, 0);
      if (linhas === 0) return res.status(404).json({ erro: "Usuário não encontrado" });

      res.status(200).json({ msg: "Senha alterada com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao alterar senha" });
    }
  }

  // 🔹 Solicitar recuperação de senha
  async solicitarRecuperacao(req, res) {
    const { email } = req.body;
    try {
      const loginUser = await LoginRepository.buscarPorEmail(email);
      if (!loginUser) return res.status(404).json({ erro: "Usuário não encontrado" });

      const token = crypto.randomBytes(20).toString("hex");
      await LoginRepository.setResetToken(loginUser.usuario_id, token);

      const link = `http://localhost:3000/recuperar-senha/${token}`;
      await sendEmail(email, "Recuperação de senha", `Clique aqui: ${link}`);

      res.status(200).json({ msg: "Email de recuperação enviado" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao solicitar recuperação" });
    }
  }

  // 🔹 Redefinir senha via token
  async redefinirSenha(req, res) {
    const { token, nova_senha } = req.body;
    if (!nova_senha || nova_senha.length < 4) {
      return res.status(400).json({ erro: "Nova senha inválida" });
    }

    try {
      const loginUser = await LoginRepository.buscarPorResetToken(token);
      if (!loginUser) return res.status(404).json({ erro: "Token inválido ou expirado" });

      // Salva senha em texto puro
      await LoginRepository.atualizarSenha(loginUser.usuario_id, nova_senha, 0);
      await LoginRepository.limparResetToken(loginUser.usuario_id);

      res.status(200).json({ msg: "Senha redefinida com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao redefinir senha" });
    }
  }
}

export default new LoginController();

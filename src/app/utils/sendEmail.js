import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // ou outro provedor (ex: smtp.office365.com)
  port: 587,
  secure: false,
  auth: {
    user: "seu_email@gmail.com",
    pass: "sua_senha_app" // use senha de app, não a do Gmail direto
  },
});

async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: '"Suporte" <seu_email@gmail.com>',
      to,
      subject,
      text,
    });
    console.log("📧 Email enviado para:", to);
  } catch (err) {
    console.error("❌ Erro ao enviar email:", err);
    throw err;
  }
}

export default sendEmail;

const nodemailer = require("nodemailer");

const setupEmailDevelopment = (testAccount) => ({
  host: "smtp.ethereal.email",
  auth: testAccount,
});

const setupEmailProduction = {
  host: process.env.HOST_EMAIL,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
  secure: true,
};

async function createSetupEmail() {
  if (process.env.NODE_ENV === "production") {
    return setupEmailProduction;
  } else {
    const testAccount = await nodemailer.createTestAccount();
    return setupEmailDevelopment(testAccount);
  }
}

class Email {
  async sendEmail() {
    const setupEmail = await createSetupEmail();
    const transporter = nodemailer.createTransport(setupEmail);

    const info = await transporter.sendMail(this);

    if (process.env.NODE_ENV !== "production") {
      console.log(nodemailer.getTestMessageUrl(info));
    }
  }
}

class EmailVerification extends Email {
  constructor(user) {
    super();
    this.from = '"Imovel Finder - ShinodaLabs <noreply@shinodalabs.com.br>"';
    this.to = user.email;
    this.subject = "Email Verification";
    this.text = `Olá,${user.full_name.split(" ")[0]}!

    Sua conta no(a) Imóvel Finder está quase pronta. Abaixo está o código para ativar a sua conta.
    
    Código: ${user.code_verification}
    
    Sua conta não será ativada até que seu email seja confirmado.
    
    Se você não se cadastrou no(a) Imóvel Finder recentemente, por favor ignore este email.`;

    this.html = `<h1>Olá,<b>${user.full_name.split(" ")[0]}</b>!</h1>

    Sua conta no(a) Imóvel Finder está quase pronta. Abaixo está o código para ativar a sua conta.
    
    <h3>Código: ${user.code_verification}</h3>
    
    Sua conta não será ativada até que seu email seja confirmado.<br><br>
    
    <i>Se você não se cadastrou no(a) Imóvel Finder recentemente, por favor ignore este email.</i>`;
  }
}

module.exports = { EmailVerification };

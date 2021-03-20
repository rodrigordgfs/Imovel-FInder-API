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
  constructor(user, urlAddress) {
    super();
    this.from = '"Imovel Finder - ShinodaLabs <noreply@shinodalabs.com.br>"';
    this.to = user.email;
    this.subject = "Email Verification";
    this.text = `Olá! Verifique seu e-mail aqui: ${urlAddress}`;
    this.html = `<h1>Olá!</h1> Verifique seu e-mail aqui: <a href="${urlAddress}">${urlAddress}</a>`;
  }
}

module.exports = { EmailVerification };

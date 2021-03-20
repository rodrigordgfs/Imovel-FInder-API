const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio")(accountSid, authToken);

class SMS {
  async sendSMS() {
    await twilio.messages.create(this);
  }
}

class SMSVerification extends SMS {
  constructor(user) {
    super();
    this.body = `Your Imovel Finder verification code is ${user.code_verification}`;
    this.from = process.env.TWILIO_PHONE_NUMBER;
    this.to = "+5551996236798";
  }
}

module.exports = { SMSVerification };

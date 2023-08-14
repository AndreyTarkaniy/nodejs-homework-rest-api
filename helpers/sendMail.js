import sgMail from "@sendgrid/mail";
import "dotenv/config";

const { SGRID_API_KEY } = process.env;
sgMail.setApiKey(SGRID_API_KEY);

const sendMail = async data => {
  const mail = { ...data, from: "endrubass@gmail.com" };
  await sgMail.send(mail);
  return true;
};
export default sendMail;

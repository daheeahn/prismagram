import { adjectives, nouns } from "./words";

import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import sgTransport from "nodemailer-sendgrid-transport";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export const generateSecret = () => {
  const randomNum = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNum]} ${nouns[randomNum]}`;
};

console.log(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

const sendMail = email => {
  // 이 안에서만 쓰이므로 not export
  // email만 오는게 아니라 필요한게 다 온다
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  // 이메일 주소 상관없이. 이메일 형식 상관없이 보낼 수 있어.
  const email = {
    from: "nico@prismagram.com",
    to: address,
    subject: "🔑 Login Secret for Prismagram",
    html: `Hello! Your login secret it ${secret}.<br/>Copy paste on the app/website to log in`
  };
  return sendMail(email);
};

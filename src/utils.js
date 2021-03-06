import "./env";

import { adjectives, nouns } from "./words";

import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

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
  console.log('🦊 sendMail', email)
  const client = nodemailer.createTransport(sgTransport(options));
  console.log('🦊 2')
  const result = client.sendMail(email)
  console.log('🦊 3', result)
  return result;
};

export const sendSecretMail = (address, secret) => {
  // 이메일 주소 상관없이. 이메일 형식 상관없이 보낼 수 있어.
  console.log('🐭 sendSecretMail', `[${address}]`, secret)
  const email = {
    from: "nico@prismagram.com",
    to: address,
    subject: "🔑 Login Secret for Prismagram",
    html: `Hello! Your login secret is <b>${secret}</b>.<br/>Copy paste on the app/website to log in`
  };
  const result = sendMail(email)
  console.log('🐭', result)

  return result;
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET); // 암호화, 해독 같은 암호키 사용 한다.

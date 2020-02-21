import { adjectives, nouns } from "./words";

export const generateSecret = () => {
  const randomNum = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNum]} ${nouns[randomNum]}`;
};

/*
** Constants
*/
const BASE_URL_BING = 'https://www.bing.com/search?q=';
const BASE_URL_GOOGLE = 'https://www.google.com/search?q=';
const NB_CHAR_BEFORE_PHONE = 9;
const LENGTH_SPLIT = 14; // 10 digits of phone number + 4 space characters: XX_XX_XX_XX_XX
const NUM_REGEX = /0[0-9]{9}/;

const NB_CHAR_BEFORE_PHONE_GOOGLE = 2;

// Token used to split html code. Those token are css class used in Google html
const TOKEN1 = 'G3iptb jfp3ef';
const TOKEN2 = 'ZINbbc xpd O9g5cc uUPGi';
const TOKEN3 = 'BNeawe tAd8D AP7Wnd';

module.exports = {
  BASE_URL_BING,
  BASE_URL_GOOGLE,
  NB_CHAR_BEFORE_PHONE,
  LENGTH_SPLIT,
  NUM_REGEX,
  TOKEN1,
  TOKEN2,
  TOKEN3,
  NB_CHAR_BEFORE_PHONE_GOOGLE,
};

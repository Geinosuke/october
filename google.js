/*
** Internal depedencies
*/

const {
  BASE_URL_GOOGLE,
  NUM_REGEX,
  TOKEN1,
  TOKEN2,
  TOKEN3,
  LENGTH_SPLIT,
  NB_CHAR_BEFORE_PHONE_GOOGLE,
} = require('./constants');

const {
  getHtmlSource,
} = require('./httpClient');

/**
 * Extract aside section from html coming from Google. In this section we can find the phone number.
 * @function
 * @param {string} data - Google html page.
 * @returns {string}
 */
const extractAsideFromGoogle = data => data.split(TOKEN1)
  .pop()
  .split(TOKEN2)
  .shift()
  .split(TOKEN3)
  .pop();

/**
 * Extract phone number from aside section of html coming from Google.
 * @function
 * @param {string} asideData - aside extracted from Bing html page.
 * @returns {string} phone number
 */
const getPhoneNumberFromGoogleHtml = (asideData) => {
  const phoneNumber = asideData.slice(NB_CHAR_BEFORE_PHONE_GOOGLE,
    NB_CHAR_BEFORE_PHONE_GOOGLE + LENGTH_SPLIT);
  return phoneNumber.split(' ').join('').match(NUM_REGEX) ? phoneNumber : '';
};

/**
 * Function that wrap the call and treatments to Google page to retrieve phone number.
 * @function
 * @param {string} url_params - data used to find phone number.
 * @returns {string} phone number
 */
const getPhoneNumberFromGoogle = async (urlParams) => {
  const data = await getHtmlSource(BASE_URL_GOOGLE, urlParams);
  const aside = extractAsideFromGoogle(data);
  return getPhoneNumberFromGoogleHtml(aside);
};

module.exports = {
  getPhoneNumberFromGoogle,
};

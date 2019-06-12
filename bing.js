/*
** Internal depedencies
*/

const {
  BASE_URL_BING,
  NB_CHAR_BEFORE_PHONE,
  LENGTH_SPLIT,
  NUM_REGEX,
} = require('./constants');

const {
  getHtmlSource,
} = require('./httpClient');

/**
 * Extract aside section from html coming from bing. In this section we can find the phone number.
 * @function
 * @param {string} data - Bing html page.
 * @returns {string}
 */
const extractAsideFromBing = data => data.split('<aside').pop().split('</aside>').shift();

/**
 * Extract phone number from aside section of html coming from bing.
 * @function
 * @param {string} asideData - aside extracted from Bing html page.
 * @returns {string} phone number
 */
const getPhoneNumberFromBingHtml = (asideData) => {
  const phoneNumber = asideData.split('phone').pop().slice(NB_CHAR_BEFORE_PHONE, NB_CHAR_BEFORE_PHONE + LENGTH_SPLIT);
  return phoneNumber.split(' ').join('').match(NUM_REGEX) ? phoneNumber : '';
};

/**
 * Function that wrap the call and treatments to Bing page to retrieve phone number.
 * @function
 * @param {string} url_params - data used to find phone number.
 * @returns {string} phone number
 */
const getPhoneNumberFromBing = async (urlParams) => {
  const data = await getHtmlSource(BASE_URL_BING, urlParams);
  const aside = extractAsideFromBing(data);
  return getPhoneNumberFromBingHtml(aside);
};

module.exports = {
  extractAsideFromBing,
  getPhoneNumberFromBingHtml,
  getPhoneNumberFromBing,
};

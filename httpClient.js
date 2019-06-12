/*
** Npm depedencies
*/
const axios = require('axios'); // Axios is the package I use to make HTTP calls.

/**
 * Retrieve html page from website
 * @function
 * @param {string} url - url of scrapped website.
 * @param {string} name - name + input data.
 * @returns {string}
 */
const getHtmlSource = async (url, name) => {
  const res = await axios.get(url + name, {});
  return res.data;
};

module.exports = {
  getHtmlSource,
};

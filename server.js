/*
** Npm depedencies
*/
const express = require('express');

/*
** Internal depedencies
*/
const { getPhoneNumberFromBing } = require('./bing');
const { getPhoneNumberFromGoogle } = require('./google');

const app = express();

app.get('/tel/:name', async (req, res) => {
  const promises = [];

  // Retrieve needed data
  let inputParams = req.params.name;
  inputParams += req.query.siren ? `+${req.query.siren}` : '';
  inputParams += req.query.address ? `+${req.query.address}` : '';

  // Parallelized call to google and bing to retrieve two numbers and compare them
  promises.push(getPhoneNumberFromBing(inputParams));
  promises.push(getPhoneNumberFromGoogle(inputParams));
  const phoneNumbers = await Promise.all(promises);
  const phoneNumbersNotEmpty = phoneNumbers.filter(el => el !== '');

  /*
  ** I get one number from Bing ther other from google:
  **    - If they're different, i don't send any phone number
  **    - If one of them is empty i send the other.
  **    - If both are equal i send the phone number.
  */
  if (phoneNumbersNotEmpty.every(el => el === phoneNumbersNotEmpty[0])) {
    const phoneNumber = phoneNumbersNotEmpty[0];
    res.send({ phoneNumber });
  } else {
    res.send({
      number: 0,
      message: 'No Number Found',
    });
  }
});

app.get('*', (req, res) => {
  const response = {
    error: 'Not Found',
    message: 'The only available route is /tel/:name',
  };
  res.status(404);
  res.send(response);
});

app.listen(3000);

const axios = require("axios");

const getRandomCountry = (countries) => {
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
}

const getOptions = (correctOption, countries) => {
  let options = [correctOption];
  let availableCountries = countries.filter(country => country.capital !== correctOption.text);

  while (options.length < 3) {
    const randomCountry = availableCountries[Math.floor(Math.random() * availableCountries.length)];
    options.push({ text: randomCountry.capital, correct: false });
    availableCountries = availableCountries.filter(country => country.capital !== randomCountry.capital);
  }
  return options.sort(() => Math.random() - 0.5);
}

const getQuestion = async (event) => {
  try {
    const response = await axios.get('https://countriesnow.space/api/v0.1/countries/capital', {
        timeout: 5000
      }
    )
    const countries = response.data.data;
    const country = getRandomCountry(countries);
    const correctOption = { text: country.capital, correct: true };
    const options = getOptions(correctOption, countries);

    const question = {
      question: `What is the capital of ${country.name}?`,
      options: options,
    }

    return {
      statusCode: 200,
      body: JSON.stringify(question)
    }

  } catch (error) {
    console.error("Error fetching countries: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch countries'})
    }
  }
};

module.exports = {
  getQuestion
}
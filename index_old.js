

const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors())

app.get('/', (req, res) => {
	res.json('real mofukkaz')
})

app.get('/convert', (req, res) => {
	
	const toCurrency = req.query.to_currency
	const fromCurrency = req.query.from_currency
	
	console.log('toCurrency', toCurrency)
	console.log('fromCurrency', fromCurrency)
	
	const options = {
  method: 'GET',
  //	url: 'https://alpha-vantage.p.rapidapi.com/query',
  url: 'https://www.alphavantage.co/query?',
  //	params: {from_currency: fromCurrency/* chosenPrimaryCurrency */, function: 'CURRENCY_EXCHANGE_RATE', to_currency: toCurrency/* chosenSecondaryCurrency */},
  //	experiment:
  params: {
	  function: 'CURRENCY_EXCHANGE_RATE',
	  from_currency: fromCurrency,
	  to_currency: toCurrency,
	  apikey='1bedd33a7bmsh412773e47664cc3p19bb9djsn252c65851c22'
	  },
  
  headers: {
    'X-RapidAPI-Key': '1bedd33a7bmsh412773e47664cc3p19bb9djsn252c65851c22',
    'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
  }
  
};

axios.request(options).then((response) => {
	res.json(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
	/* console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
	//	setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']) */
	/* setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount) */
	//	setPrimaryCurrencyExchanged(chosenPrimaryCurrency)
	//	setSecondaryCurrencyExchanged(chosenSecondaryCurrency)
	/*
	setExchangedData({
			primaryCurrency: chosenPrimaryCurrency,
		secondaryCurrency: chosenSecondaryCurrency,
		exchangeRate: response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
	})	*/
}).catch((error) => {
	console.error(error);
});
})


app.get('/news', (req, res) => {
	/*	res.json('real mofukkaz')	*/
	const options = {
  method: 'GET',
  url: 'https://crypto-news-live3.p.rapidapi.com/news/cryptonews.com',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'crypto-news-live3.p.rapidapi.com'
  }
};

axios.request(options).then((response) => {
	/* console.log(response.data);
	setArticles(response.data) */
	res.json(response.data)
	
}).catch((error) => {
	console.error(error);
});
})


app.listen(8000, () => console.log(`Server is running on port ${PORT}`))

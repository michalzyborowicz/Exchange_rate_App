const currencyOne = document.querySelector('#currency-one')
const amountOne = document.querySelector('.amount-one')
const currencyTwo = document.querySelector('#currency-two')
const amountTwo = document.querySelector('.amount-two')
const swapBtn = document.querySelector('.swap')
const rateInfo = document.querySelector('.rate-info')

//fetch(https://api.exchangerate.host/latest?base=${currencyOne.value}&symbols=${currencyTwo.value})

const calculate = params => {
	fetch(`https://api.exchangerate.host/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`)
		.then(res => res.json())
		.then(data => {
			const currency1 = currencyOne.value
			const currency2 = currencyTwo.value

			const rate = data.rates[currency2]
			rateInfo.textContent = `1 ${currency1} = ${rate.toFixed(2)}${currency2}`

			amountTwo.value = (amountOne.value * rate).toFixed(2)
		})
}
const currencySwap = () => {
	const swapCurrency = currencyOne.value
	currencyOne.value = currencyTwo.value
	currencyTwo.value = swapCurrency
    calculate()
}

currencyOne.addEventListener('change', calculate)
currencyTwo.addEventListener('change', calculate)
amountOne.addEventListener('input', calculate)

swapBtn.addEventListener('click', currencySwap)
calculate()

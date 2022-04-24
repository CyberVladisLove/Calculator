const percentInput = document.querySelector('#percent-input');
const percentRange = document.querySelector('#percent-range');
const periodInput = document.querySelector('#period-input');
const periodRange = document.querySelector('#period-range');
const depositInput = document.querySelector('#deposit-input');
const depositRange = document.querySelector('#deposit-range');
const inputs = document.querySelectorAll('input');

const radioType = document.querySelectorAll('input[name="type"]');

const totalIncomeElement = document.querySelector('#total-income');
const clearIncomeElement = document.querySelector('#clear-income');


percentRange.addEventListener('input', function () {
	percentInput.value = percentRange.value;
});
percentInput.addEventListener('input', function () {
	percentRange.value = percentInput.value;
});

periodRange.addEventListener('input', function () {
	periodInput.value = periodRange.value;
});
periodInput.addEventListener('input', function () {
	periodRange.value = periodInput.value;
});

depositRange.addEventListener('input', function () {
	depositInput.value = depositRange.value;
});
depositInput.addEventListener('input', function () {
	depositRange.value = depositInput.value;
});


function calculate() {
	const percentPerMonth = parseInt(percentInput.value) / 1200; 
	const period = parseInt(periodInput.value); 
	const deposit = parseInt(depositInput.value);
	let type;
	for (const radio of radioType) {
		if (radio.checked) {
			type = radio.value; 
		}
	}
	let totalIncome = deposit;
	if(type==="replenishes"){
		for(let i = 0; i < period; i++){
			totalIncome += totalIncome*percentPerMonth
		}
	}
	else totalIncome += deposit * percentPerMonth * period;
	
	totalIncome = totalIncome.toFixed(2);
	
	const formatter = new Intl.NumberFormat('ru');
	totalIncomeElement.innerText = formatter.format(totalIncome);
	clearIncomeElement.innerText = formatter.format(totalIncome - deposit);
}

calculate();

for (const input of inputs) {
	input.addEventListener('input', function () {
		calculate();
	});
}

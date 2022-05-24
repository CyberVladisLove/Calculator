const percentInput = document.querySelector('#percent-input');
const percentRange = document.querySelector('#percent-range');
const depositInput = document.querySelector('#deposit-input');
const depositRange = document.querySelector('#deposit-range');
const inputs = document.querySelectorAll('input');
const startDateInput = document.querySelector('#startDate-input');
const endDateInput = document.querySelector('#endDate-input');
const radioType = document.querySelectorAll('input[name="type"]');

const totalIncomeElement = document.querySelector('#total-income');
const clearIncomeElement = document.querySelector('#clear-income');

startDateInput.defaultValue = getCurrentDate(0)+"";
endDateInput.defaultValue = getCurrentDate(3)+"";


percentRange.addEventListener('input', function () {
	percentInput.value = percentRange.value;
});
percentInput.addEventListener('input', function () {
	percentRange.value = percentInput.value;
});



depositRange.addEventListener('input', function () {
	depositInput.value = depositRange.value;
});
depositInput.addEventListener('input', function () {
	depositRange.value = depositInput.value;
});


function calculate() {
	const percentPerDay = parseInt(percentInput.value) / 36500; 
	const countDays = getCountOfDays(startDateInput.value, endDateInput.value);
	const deposit = parseInt(depositInput.value);
	let type;

	for (const radio of radioType) {
		if (radio.checked) {
			type = radio.value; 
		}
	}

	let totalIncome = deposit;
	if(type==="replenishes"){
		for(let i = 0; i < countDays; i++){
			totalIncome += totalIncome*percentPerDay
		}
	}
	else totalIncome += deposit * percentPerDay * countDays;
	
	totalIncome = totalIncome.toFixed(2);
	
	const formatter = new Intl.NumberFormat('ru');
	totalIncomeElement.innerText = formatter.format(totalIncome) + " Florens";
	clearIncomeElement.innerText = formatter.format(totalIncome - deposit) + " Florens";
	
}

calculate();

for (const input of inputs) {
	
	input.addEventListener('input', function () {
		
		if(getCountOfDays(startDateInput.value,endDateInput.value) > 0 ){
			calculate();
		}else{
			totalIncomeElement.innerText = "Choose correct date";
			clearIncomeElement.innerText = "Choose correct date";
		}
	});
	
}

function getCurrentDate(months) {
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1 + months; //January is 0!
    var yyyy = today.getFullYear();
	
	
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 

    today = yyyy+'-'+mm+'-'+dd;
	return today;                
    
}

function getCountOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}

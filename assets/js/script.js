function formatNumber(number) {
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(number);
}

const inputContainer = document.querySelectorAll('.input-container');

const inputElements = document.querySelectorAll('input');

function focusInputs(){
  for (const inputElement of inputElements) {
    inputElement.addEventListener('focus', function() {
      this.closest('div').classList.add('focused');
  });
  
  inputElement.addEventListener('blur', function() {
    this.closest('div').classList.remove('focused');
  });
  }
}

function writeAmountInput(){
  amountInputContainer.classList.remove('required');
  // alttaki kısmı chatGPT'den aldım
  const inputValue = this.value.replace(/,/g, '');
  const numericValue = parseFloat(inputValue);

  if (!isNaN(numericValue)) { 
      this.value = formatNumber(numericValue); 
  }
}

function writeTermInput(){
  termInputContainer.classList.remove('required');
}

function writeInterestInput(){
  interestInputContainer.classList.remove('required');
}

const allDivs = document.querySelectorAll('.select-type-item');


function showResults(){
  let hasChecked = false;
  for (const div of allDivs) {
    if(div.classList.contains('checked')){
        hasChecked = true;
        break;
    }
  }
  if(amountInput.value === '' || termInput.value === '' || interestInput.value === '' || !hasChecked){
    if(amountInput.value === ''){
      amountInputContainer.classList.add('required');
    }
    if(termInput.value === ''){
      termInputContainer.classList.add('required');
    }
    if(interestInput.value === ''){
      interestInputContainer.classList.add('required');
    } 
    if (!hasChecked) {
      selectTypeAlert.innerText = 'This field is required';
    } else {
      selectTypeAlert.innerText = '';
    }
    document.body.classList.remove('show-results');
  } else{
    let amountValue = amountInput.value.replace(/,/g, '');
    let amount = Number(parseFloat(amountValue));
    let year = Number(termInput.value);
    let interest = Number(interestInput.value);
    let totalInterest = (amount * interest / 100) * year;
    let totalPayment = totalInterest + amount;
    let monthlyPayment = totalPayment / (year * 12);
    document.body.classList.add('show-results');
    monthlyRepaymentTxt.innerText = `£${formatNumber(monthlyPayment)}`;
    totalRepaymentTxt.innerText = `£${formatNumber(totalPayment)}`;
  }
}

const radios = document.querySelectorAll('input[type="radio"]');

for (const radio of radios) {
  radio.addEventListener('input', selectType);
}

function selectType(){
  for (const div of allDivs) {
    div.classList.remove('checked');
  }
  if(this.checked){
    this.closest('div').classList.add('checked');
    selectTypeAlert.innerText = '';
  }
}

function clearAll(){
  document.body.classList.remove('show-results');
  amountInput.value = '';
  termInput.value = '';
  interestInput.value = '';
  selectTypeAlert.innerText = '';
  amountInputContainer.classList.remove('required');
  termInputContainer.classList.remove('required');
  interestInputContainer.classList.remove('required');
  for (const div of allDivs) {
    div.classList.remove('checked');
  }
  for (const radio of radios) {
    radio.checked = false;
  }
}


focusInputs();
calculateBtn.addEventListener('click', showResults);
amountInput.addEventListener('input', writeAmountInput);
termInput.addEventListener('input', writeTermInput);
interestInput.addEventListener('input', writeInterestInput);
clearAllBtn.addEventListener('click', clearAll);

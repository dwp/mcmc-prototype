const incomeIds = [
  'f-incomeEmployment',
  'f-incomeSelfEmployment',
  'f-incomePensionEmployment',
];
console.log('javascript');

const incomeChanged = () => {
  let newTotal = 0;

  incomeIds.forEach((input) => {
    const element = document.getElementById(input);
    if (element.value.match(/^[0-9]+(\.[0-9]{2})?$/)) {
      newTotal += Number(document.getElementById(input).value);
    }
  });
  document.getElementById('f-total').value = newTotal.toFixed(2);
  //console.log()
};

window.onload = () => {
  incomeChanged();
  for (let i = 0; i < incomeIds.length; i++) {
    document
      .getElementById(incomeIds[i])
      .addEventListener('change', incomeChanged);
  }
};

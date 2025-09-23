window.onload = function () {
  document
    .getElementById('howMuchIncomeSubmit')
    .addEventListener('click', function () {
      var typeOfIncome = document.querySelector(
        'input[name="type-of-income"]:checked'
      ).value;
      if (typeOfIncome === undefined) {
        //error
      }
    });
};


// Listen for submit

document.querySelector('#loan-form').addEventListener('submit', function(e){
  //Hide results
  document.getElementById('results').style.display = 'none';
  
  // Show Loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);
  
  e.preventDefault();
});

// Calculate resulsts
function calculateResults(){
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');
  
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;


  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1); 

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
    
    
  } else {
    showError('Please check your numbers');
  }
}

function showError(error) {
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';

  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  // Insert err above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3s
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
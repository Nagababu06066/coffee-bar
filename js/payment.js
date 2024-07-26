
document.addEventListener("DOMContentLoaded", function() {
    // Select the form element
    const form = document.querySelector('form');

    // Add an event listener for form submission
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Validate the form inputs
        if (validateForm()) {
            // If the form is valid, proceed with payment
            alert('Payment successful!');
            // Add code here to submit the form data to your server
        } else {
            // If the form is not valid, display an error message
            alert('Please fill out all required fields.');
        }
    });

    // Function to validate form inputs
    function validateForm() {
        // Get the selected payment method
        const selectedPaymentMethod = document.querySelector('input[name="pay"]:checked').id;

        // Get the input elements based on the selected payment method
        let inputs;
        if (selectedPaymentMethod === 'bc3') {
            inputs = document.querySelectorAll('#debitCardFields input');
        } else if (selectedPaymentMethod === 'bc4') {
            inputs = document.querySelectorAll('#upiFields input');
        } else {
            inputs = document.querySelectorAll('.input_group .input_box input');
        }

        // Initialize a variable to track form validity
        let isValid = true;

        // Loop through each input and check its validity
        inputs.forEach(input => {
            // Check if the input is required and empty
            if (input.hasAttribute('required') && input.value.trim() === '') {
                // If a required field is empty, set isValid to false
                isValid = false;
            }
        });

        // Return the overall form validity
        return isValid;
    }

    // Display the total value from local storage
    document.addEventListener('DOMContentLoaded', function() {
        const totalValue = localStorage.getItem('cartTotal');
        if (totalValue) {
          document.getElementById('display-total').textContent = totalValue;
        } else {
          console.error('Total value not found in local storage.');
        }
    });

    // Show/hide payment option fields based on selected payment method
    const paymentMethodRadios = document.querySelectorAll('input[name="pay"]');
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const selectedPaymentMethod = this.id;
            const paymentFields = document.querySelectorAll('.input_group .input_box');
            paymentFields.forEach(field => {
                field.style.display = 'none';
            });
            if (selectedPaymentMethod === 'bc3') {
                document.getElementById('debitCardFields').style.display = 'block';
            } else if (selectedPaymentMethod === 'bc4') {
                document.getElementById('upiFields').style.display = 'block';
            } else if (selectedPaymentMethod === 'bc2') {
                document.getElementById('QR Code').style.display = 'block';
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Get the submit button and hide it initially
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.style.display = 'none';
    
        // Get all payment method radio buttons
        const paymentMethodRadios = document.querySelectorAll('input[name="pay"]');
    
        // Add an event listener to each radio button
        paymentMethodRadios.forEach(function(radio) {
            radio.addEventListener('change', function() {
                // Check if any payment method is selected
                const isPaymentMethodSelected = Array.from(paymentMethodRadios).some(function(radio) {
                    return radio.checked;
                });
    
                // If a payment method is selected, show the submit button
                if (isPaymentMethodSelected) {
                    submitButton.style.display = 'block';
                } else {
                    submitButton.style.display = 'none';
                }
            });
        });
    });

});

document.addEventListener('DOMContentLoaded', function() {
    const totalValue = localStorage.getItem('cartTotal');
    if (totalValue) {
      document.getElementById('display-total').textContent = totalValue;
    } else {
      console.error('Total value not found in local storage.');
    }
});




  
  function submitForm() {
    var paymentType = document.querySelector('input[name="pay"]:checked').id;

    if (paymentType === "bc1" || paymentType === "bc2" || paymentType === "bc3" || paymentType === "bc4") {
        var requiredFields = document.querySelectorAll('input[required]');
        var isValid = true;

        requiredFields.forEach(function(field) {
            if (!field.value.trim()) {
                isValid = false;
            }
        });

        if (isValid) {
            document.getElementById('paymentForm').submit();
        } else {
            alert('Please fill in all required fields.');
        }
    } else {
        alert('This payment method is not supported.');
    }
}

  // Function to validate the form before submitting
  function validateForm() {
    var isValid = true;
    var requiredFields = document.querySelectorAll('input[required]');

    requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
            isValid = false;
        }
    });

    return isValid;
}

// Add event listener to the "PAY NOW" button
document.getElementById("payNowBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission

    // Check if the form is valid
    if (validateForm()) {
        // Simulate payment process (you can replace this with your actual payment process)
        // Here, we just show the payment success popup
        showPaymentSuccessPopup();
    } else {
        alert("Please fill in all required fields.");
    }
});

// Function to update total amount based on selected payment method
function updateTotalAmount() {
    let total = 0;
    // Add logic to calculate total amount based on items in cart or selected options
    // Example:
    // const cartTotal = parseFloat(localStorage.getItem('cartTotal'));
    // total += cartTotal;

    // Display the total amount
    document.getElementById('display-total').textContent = total.toFixed(2);
}

// Function to show/hide payment method fields based on selection
function togglePaymentFields() {
    const paymentMethod = document.querySelector('input[name="pay"]:checked').id;

    // Hide all payment fields first
    document.getElementById('debitCardFields').style.display = 'none';
    document.getElementById('QRCode').style.display = 'none';
    document.getElementById('upiFields').style.display = 'none';

    // Show fields based on selected payment method
    switch (paymentMethod) {
        case 'bc1':
            document.getElementById('debitCardFields').style.display = 'block';
            break;
        case 'bc2':
            document.getElementById('QRCode').style.display = 'block';
            break;
        case 'bc3':
            document.getElementById('debitCardFields').style.display = 'block'; // Adjust for Debit Card specific fields
            break;
        case 'bc4':
            document.getElementById('upiFields').style.display = 'block';
            break;
        default:
            break;
    }
}

// Add event listeners for payment method change and initial total update
document.querySelectorAll('input[name="pay"]').forEach(radio => {
    radio.addEventListener('change', function() {
        togglePaymentFields();
        updateTotalAmount();
    });
});

// Add event listeners for card number validation (you can use a library or implement Luhn algorithm)
document.getElementById('cardNumber').addEventListener('input', function() {
    // Implement card number validation logic
});

// Function to simulate payment process
function simulatePayment() {
    // Simulate a payment process (e.g., show a loading animation, then show success message)
    setTimeout(function() {
        showPaymentSuccessPopup();
    }, 2000); // Simulate a delay for the payment process
}

// Update "PAY NOW" button click event to validate form and simulate payment
document.getElementById("payNowBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission

    // Check if the form is valid
    if (validateForm()) {
        // Simulate payment process (replace with actual payment integration)
        simulatePayment();
    } else {
        alert("Please fill in all required fields.");
    }
});

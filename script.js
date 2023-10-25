//-------------------------------------------------------------Reg Page JS--------------------------------------------------------------------------------
function showHidePassword(){
    var password = document.getElementById('password');
    var rePassword = document.getElementById('re-password');
    var eyebtn = document.getElementById('togglepassword');
    if (password.type == 'password') {
        password.type = 'text';
        rePassword.type = 'text';
        eyebtn.innerText = 'Hide Password';
    } 
    else {
        password.type = 'password';
        rePassword.type = 'password';
        eyebtn.innerText = 'Show Password';
    }
}
//-------------------------------------------------------------Order Page JS--------------------------------------------------------------------------------
var total = 0;

function showCatalogue(){ //This function will take you from login form to catalogue page to browse for items
    document.getElementById('login-container').style.display="none";
    document.getElementById('profile').innerText="Guest";
    document.getElementById('main-catalogue').style.display="block"; 
}
function showCakeCatalogue(){ //This function will switch between tabs, from ice creams to cakes
    document.getElementById('ice-catalogue').style.display="none";
    document.getElementById('cake-catalogue').style.display="block";
}
function showIceCatalogue(){ //This function will switch between tabs, from cakes to ice creams
    document.getElementById('cake-catalogue').style.display="none";
    document.getElementById('ice-catalogue').style.display="block";
}
function showCart(){ //This function will open your cart
    document.getElementById('my-cart-container').style.display="block";
    document.getElementsByTagName('header')[0].style.display="none";
    document.getElementsByClassName('catalogue')[0].style.display="none";
    document.getElementsByClassName('catalogue')[1].style.display="none";
    document.getElementById('subnav').style.display="none";
    document.getElementsByTagName('footer')[0].style.display="none";
}
function hideCart(){ //This function will close your cart
    document.getElementById('my-cart-container').style.display="none";
    document.getElementsByTagName('header')[0].style.display="block";
    document.getElementsByClassName('catalogue')[0].style.display="block";
    document.getElementsByClassName('catalogue')[1].style.display="none";
    document.getElementById('subnav').style.display="block";
    document.getElementsByTagName('footer')[0].style.display="block";
}

//This function will add items to your cart and calculate total, item details are passed in as parameters by individual 'a' element
function addToCart(productName, price) {
    var cartTable = document.getElementById("cartTable");

    var rows = cartTable.rows;
    for (var i = 1; i < rows.length; i++) {                                     // Start from 1 to skip header row
        var productNameCell = rows[i].cells[0];
        if (productNameCell.innerHTML == productName) {                         // Product already exists, increase quantity
            var quantityInput = rows[i].querySelector('.quantityValue');
            var currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;

            var price = parseFloat(rows[i].cells[1].textContent.replace('$', ''));
            updateSubtotal(price, quantityInput);

            updateTotal();
            return;                                                             // Exit function after increasing quantity
        }
    }

    var newRow = cartTable.insertRow();         //inserts a new row
    var productNameCell = newRow.insertCell(0); //inserts a new cell for product name in that just created row
    var priceCell = newRow.insertCell(1);       //inserts a new cell for product price in that just created row
    var quantityCell = newRow.insertCell(2);    //inserts a new cell for product quantity in that just created row
    var subTotalCell = newRow.insertCell(3);    //inserts a new cell for sub total in that just created row
    productNameCell.innerHTML = productName;

    priceCell.innerHTML = "$" + price.toFixed(2);

    quantityCell.innerHTML =
        `<button class="decbtn" onclick="decreaseQuantity(this)">-</button>
        <input class="quantityValue" type="number" value="1" min="1">
        <button class="incbtn" onclick="increaseQuantity(this)">+</button>`; 

    var quantityValue = 1;                                                      // Since we are adding 1 item to the cart
    var subTotal = price * quantityValue;
    subTotalCell.innerHTML = "$" + subTotal.toFixed(2);

    updateTotal();
    var rowCount = countCartTableRows();
    for (i=0 ; i < rowCount ; i++) {
        document.getElementsByClassName("cart-items")[i].innerHTML = rowCount; // Count rows to find out number of different products in cart
    }
}

function countCartTableRows() {
    var table = document.getElementById("cartTable");
    var rowCount = table.rows.length;
    return rowCount - 1;                                                       // Subtract 1 to exclude the header row
}
function decreaseQuantity(button){
    // Use 'button' parameter to reference the specific button that was clicked
    var quantityInput = button.nextElementSibling;                            //the input is next to the decrease button
    var currentValue = parseInt(quantityInput.value);                         // Gets the current value of a quantity input field and convert it to an integer
    
    var price = parseFloat(button.parentElement.parentElement.cells[1].textContent.replace('$', ''));// Gets the price from the second cell of the parent element of the parent element of the button. It then converts the price string to a floating-point number.

    var currentValue = parseInt(quantityInput.value);

    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        updateSubtotal(price, quantityInput);
        updateTotal();                                                       // Update total after decreasing quantity
    }
}
function increaseQuantity(button) {
    var quantityInput = button.previousElementSibling;
    var price = parseFloat(button.parentElement.parentElement.cells[1].textContent.replace('$', ''));
    var currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
    updateSubtotal(price, quantityInput);
    updateTotal();                                                          // Update total after increasing quantity
}
function updateSubtotal(price, quantityInput) {
    var quantity = parseInt(quantityInput.value);
    var subtotal = price * quantity;
    var subtotalCell = quantityInput.parentElement.nextElementSibling;
    subtotalCell.innerText = "$" + subtotal.toFixed(2);
}
function updateTotal() {
    total = 0;
    var subtotalCells = document.querySelectorAll('#cartTable td:nth-child(4)');
    
    subtotalCells.forEach(function(cell) {
        total += parseFloat(cell.textContent.replace('$', ''));// Adds the numerical value extracted from the cell's text content with '$' symbol removed to the current value of the 'total' variable.
    });

    var totalElement = document.getElementById('total');
    totalElement.textContent = "Total: $" + total.toFixed(2);
}
function calculateTax() {
    var taxRate = 0.04;                                                                 //Fixed Tax Rate
    var taxAmount = total * taxRate;                                                    // Calculates the tax amount
    var grandtotal = total + 5;                                                         //Add Fixed Shipment Charges

    document.getElementById('price-total').innerText = "$" + total.toFixed(2);
    document.getElementById('tax').innerText = "$" +  taxAmount.toFixed(2);             // Display the tax amount
    document.getElementById('grand-total').innerText = "$" + grandtotal.toFixed(2);     // Display Final Total amount
    return;
}
function openCheckout(){
    calculateTax();
    document.getElementById('MAIN').style.display="none";
    document.getElementsByTagName('footer')[0].style.display="none";
    document.getElementsByTagName('header')[0].style.display="none";
    document.getElementsByTagName('body')[0].style.backgroundColor = '#fae3ea';
    document.getElementsByTagName('body')[0].style.display="grid";
    document.getElementsByTagName('body')[0].style.alignItems="center";
    document.getElementsByTagName('body')[0].style.justifyItems="center";
    document.getElementById('checkout').style.display="block";
}
function fillAddress() {
    // Get elements to copy and elements to fill
    var fieldsToCopy = document.getElementsByClassName('field-to-copy');
    var fieldsToFill = document.getElementsByClassName('field-to-fill');
    var errMsg = document.getElementById('if-all-fields');
    
    // Checks if 'fill-address' checkbox is checked
    if (document.getElementById('fill-address').checked) {
        // Check if any field is empty
        for (var i=0; i < fieldsToCopy.length; i++){
            if(fieldsToCopy[i].value == ""){
                errMsg.innerText = "Please enter your delivery address first";
                errMsg.style.color="red";
                return;
            }
        }
        // Clears error message if all fields are filled
        for (var i=0; i < fieldsToCopy.length; i++){
            if(fieldsToCopy[i].value != ""){
                errMsg.innerText = "";
            }
        }
        // Copy values and disable fields
        for (var i = 0; i < fieldsToCopy.length; i++) {
            fieldsToFill[i].value = fieldsToCopy[i].value;
            fieldsToFill[i].disabled = true;
        }
    }
    else{
        // Reset and enable fields
        for (var i = 0; i < fieldsToFill.length; i++) {
            fieldsToFill[i].value = "";
            fieldsToFill[i].disabled = false;
        }
    }
}
function updateCardLength(length) {
    var creditCardInput = document.getElementById('cardnum');
    creditCardInput.value = "";
    creditCardInput.maxLength = length;
}
function deliveryBtn(){
    document.getElementById('email-container').style.display="block";
    document.getElementById('del-address').style.display="block";
    document.getElementById('bill-address').style.display="block";
    document.getElementById('payment-method').style.display="block";
    document.getElementById('card-details').style.display="block";
    document.getElementById('buy-btn').style.display="block";
    document.getElementById('pick-up-options').style.display="none";
    document.getElementById('name-container').style.display="none";
    document.getElementsByClassName('sameAsDelAddress')[0].style.display='inline-block';
    document.getElementsByClassName('sameAsDelAddress')[1].style.display='inline-block';
}
function pickUpBtn(){
    document.getElementById('pick-up-options').style.display="flex";
    document.getElementById('del-address').style.display="none";
    document.getElementById('bill-address').style.display="none";
    document.getElementById('payment-method').style.display="none";
    document.getElementById('card-details').style.display="none";
    document.getElementById('email-container').style.display="none";
    document.getElementById('name-container').style.display="none";
    document.getElementById('buy-btn').style.display="none";
    document.getElementsByClassName('sameAsDelAddress')[0].style.display='none';
    document.getElementsByClassName('sameAsDelAddress')[1].style.display='none';
}
function choosePayNow(){
    document.getElementById('del-address').style.display="none";
    document.getElementById('bill-address').style.display="none";
    document.getElementById('payment-method').style.display="block";
    document.getElementById('card-details').style.display="block";
    document.getElementById('pick-up-options').style.display="flex";
    document.getElementById('name-container').style.display="none";
    document.getElementById('email-container').style.display="block";
    document.getElementById('buy-btn').style.display="block";
}
function choosePayLater(){
    document.getElementById('name-container').style.display="block";
    document.getElementById('payment-method').style.display="none";
    document.getElementById('card-details').style.display="none";
    document.getElementById('pick-up-options').style.display="flex";
    document.getElementById('email-container').style.display="none";
    document.getElementById('buy-btn').style.display="block";
    document.getElementById('del-address').style.display="none";
    document.getElementById('bill-address').style.display="none";
}
//-------------------------------------------------Registration Page Validation JS---------------------------------------------
function validate() {
    var name = document.getElementById('fname').value;
    var email = document.getElementById('email').value;
    var mobile = document.getElementById('mobile').value;
    var date = document.getElementById('date').value;
    var gender = document.querySelector('input[name="Gender"]:checked');
    var address = document.getElementById('address').value;
    var country = document.getElementById('country').value;
    var postCode = document.getElementById('postal-code').value;
    var uName = document.getElementById('uname').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('re-password').value;

    var errors = '';

    var nameRegex = /^[a-zA-Z\s]+$/;                // Matches a string with one or more alphabetic characters, upper or lower case
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Matches a valid email address format
    var mobileRegex = /^\d{10,11}$/;                // Matches a string with exactly 10 or 11 digits
    var uNameRegex = /^[A-Za-z0-9]+$/;              // Matches a string with alphanumeric characters only upper or lower case, and digits

    if (name == '') {
        errors += 'Full name is required\n';
    } 
    else if (!nameRegex.test(name)) {
        errors += 'Full name should only contain letters\n';
    }

    if (email == '') {
        errors += 'Email is required\n';
    } 
    else if (!emailRegex.test(email)) {
        errors += 'Invalid email format\n';
    }

    if (mobile == '') {
        errors += 'Mobile number is required\n';
    } 
    else if (!mobileRegex.test(mobile)) {
        errors += 'Invalid mobile number\n';
    }

    if (date == '') {
        errors += 'Date of birth is required\n';
    }

    if (!gender) {
        errors += 'Gender is required\n';
    }

    if (address == '') {
        errors += 'Address is required\n';
    }

    if (country == '') {
        errors += 'Country is required\n';
    }

    if (postCode == '') {
        errors += 'Postal code is required\n';
    } 
    if (postCode.length != 4) {
        errors += 'Postal code must be 4 digits\n';
    }

    if (uName == '') {
        errors += 'Username is required\n';
    } 
    else if (!uNameRegex.test(uName)) {
        errors += 'Username can only contain letters and numbers\n';
    }

    if (password == '') {
        errors += 'Password is required\n';
    } 
    else if (password.length < 9) {
        errors += 'Password must be at least 9 characters long\n';
    } 
    else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[@$!%*?&_]/.test(password)) {
        errors += 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character\n';
    }

    if (confirmPassword == '') {
        errors += 'Confirm password is required\n';
    } 
    else if (confirmPassword != password) {
        errors += 'Passwords do not match\n';
    }
    if (errors != "") {
		alert (errors);
		return false;
	} 
	return true;
}
//-----------------------------------------------CheckOut Form Validation---------------------------------------------------------
function validateCheckOutForm(){
    var pickUpName = document.getElementById('forReceipt');
    var buyerEmail = document.getElementById('email-for-online-payment');
    var deliveryAddress = document.getElementsByClassName('field-to-copy');
    var billingAddress = document.getElementsByClassName('field-to-fill');
    var paymentMethods = document.getElementsByName('payment-method');
    var paymentMethodIsChecked = false;
    var cardDetails = document.getElementsByClassName('card-details');
    
    var nameContainer = document.getElementById('name-container');
    var buyerEmailContainer = document.getElementById('email-container');
    var addressContainer = document.getElementById('del-address');
    var paymentContainer = document.getElementById('payment-method');
    var cardContainer = document.getElementById('card-details');
    var errors = '';
    var nameRegex = /^[A-Za-z\s]+$/;                // Matches a string with one or more alphabetic characters, upper or lower case
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Matches a valid email address format
    var expDateRegex = /^\d{2}\/\d{2}$/;            // Matches a valid Card Expiration Date Format (MM/YY)

    // Checks if Buyer's Name and Buyer's Email Address are filled
    if (nameContainer.style.display == 'block'){
        if (pickUpName.value == '') {
            errors += 'Please fill in your name\n';
        }
        if (!nameRegex.test(pickUpName.value)) {
            errors += 'Name can only contain alphabets\n';
        }
    }
    if (buyerEmailContainer.style.display == 'block'){
        if (buyerEmail.value == '') {
            errors += 'Please fill in your email\n';
        }
        if (!emailRegex.test(buyerEmail.value)) {
            errors += 'Invalid Email\n';
        }
    }

    // Checks if delivery address and billing address is filled
    if (addressContainer.style.display == 'block'){ //if delivery address container is open then billing would be open too
        for (var i = 0; i < deliveryAddress.length; i++) {
            if (deliveryAddress[i].value == '') {
                errors += 'Please fill in all fields for delivery address\n';
                break;
            }
        }
        for (var i = 0; i < billingAddress.length; i++) {
            if (billingAddress[i].value == '') {
                errors += 'Please fill in all fields for billing address\n';
                break;
            }
        } 
        if (deliveryAddress[3].value.length != 4 || billingAddress[3].value.length != 4){
            errors += 'Invalid Postal Code\n';
        }
    }

    // checks if any payment method / radio btn was selected, if none was selected show error
    if (paymentContainer.style.display == 'block'){
        for (var i = 0; i < paymentMethods.length; i++) {
            if (paymentMethods[i].checked) {
                paymentMethodIsChecked = true;
                break;
            }
        }
        if (!paymentMethodIsChecked) { //if none were selected
            errors += "Please select a payment method\n";
        }
    }
    
    // Check if cardDetails container is open and fields are not empty
    if (cardContainer.style.display == 'block'){
        for (var i = 0; i < cardDetails.length; i++) {
            if (cardDetails[i].value == '') {
                errors += 'Please fill in all fields for card details\n';
                break;
            }
        }
        //Checks if card number has a proper length
        if (cardDetails[1].value.length < cardDetails[1].maxLength) { // maximum length is enforced by function updateCardLength(length)
            errors += 'Please enter a valid credit card number\n';
        }
        // Check if card expiration date is filled and has a proper format
        if (cardDetails[2].value != '' && !expDateRegex.test(cardDetails[2].value)){
            errors += 'Invalid expiration date. Please enter in MM/YY format\n';
        }
        if (cardDetails[3].value != '' && cardDetails[3].value.length < 3){
            errors += 'Invalid Security Code\n';
        }
    }    
    // Display errors if any
    if (errors != '') {
        alert (errors);
        return false;
    }
    return true;
}
function openCloseSubMobileMenu (){
    if (document.getElementById('sub-mobile-menu').style.display == "block") {
        document.getElementById('sub-mobile-menu').style.display = "none";
    }
    else{
        document.getElementById('sub-mobile-menu').style.display = "block";
    }
    
}
function init() {
    var mobileMenuBtn = document.getElementById('mobile-menu');
    var closeSubMenuBtn = document.getElementById('close-sub-menu');
    mobileMenuBtn.onclick = openCloseSubMobileMenu;
    closeSubMenuBtn.onclick = openCloseSubMobileMenu;
    if (window.location.href.indexOf('registration') > -1) {
        var regForm = document.getElementById('regform');
        var eyebtn = document.getElementById('togglepassword');
        eyebtn.onclick = showHidePassword;
        regForm.onsubmit = validate;
    } 
    if(window.location.href.indexOf('order') > -1){
        var showDelivery = document.getElementsByClassName('del-or-pick')[0];
        var showPickUp = document.getElementsByClassName('del-or-pick')[1];
        var payNowBtn = document.getElementsByClassName('paybtns')[0];
        var payLaterBtn = document.getElementsByClassName('paybtns')[1];
        var checkOutForm = document.getElementById('checkout-form');
        showDelivery.onclick = deliveryBtn;
        showPickUp.onclick = pickUpBtn;
        payNowBtn.onclick = choosePayNow;
        payLaterBtn.onclick = choosePayLater;
        checkOutForm.onsubmit = validateCheckOutForm;
    }
}
window.onload = init;
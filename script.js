// on submit
// if data is not valid, warn the user AND do not submit the data
const formNode = document.querySelector("#form_user");

// all forms can emit a "submit" event when their submit input is clicked OR "enter" is
// pressed while on that form's input
formNode.addEventListener("submit", eventObject => {
    // submit has a default behaviour of creating a new page request and attaching all input data to it
    // by default it requests the current page
    // invoking preventDefault stops any default behaviour for that event
    eventObject.preventDefault();
    
    const isValid = validateForm();

    if(isValid) {
        formNode.submit();
    }
});

function validateForm() {
    // look at all inputs and return if they are all valid
    let isValid = true;

    // remove all pre-existing error messages
    const errorMessageNodes = document.querySelectorAll(".error-message");
    errorMessageNodes.forEach(e => {
        e.remove();
    });

    // ensure username has at least 3 characters and no spaces
    const userNameInputNode = document.querySelector("#field_username");
    const userNameValue = escapeHTML(userNameInputNode.value);

    // contains no spaces
    // blacklist pattern: excludes values we don't want
    if(userNameValue.includes(" ")) {
        isValid = false;
        showInputError(userNameInputNode, "Usernames cannot include spaces");
    }
    
    // has more than three characters
    if(userNameValue.trim().length < 4) {
        isValid = false;
        showInputError(userNameInputNode, 
            "Usernames must be at least 4 characters in length"
        );
    }

    // EMAIL VALIDATION (whitelist)
    // whitelist identifies what is a valid pattern, and excludes all else
    const emailInputNode = document.querySelector("#field_email");
    const emailInputValue = escapeHTML(emailInputNode.value);
    
    // regex pattern
    // used from RRC Software Dev Module 4 notes
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    /**
     * ^: start of pattern (any values before this pattern are invalid)
     * 
     * [A-Z0-9._%+-]+ : one or more characters that are letters (A-Z), numbers (0-9),
     * or . _ % + -
     * 
     * @: literal '@' symbol
     * 
     * \.: literal '.' symbol
     * 
     * [A-Z]{2,}: two or more alphabetic characters
     * 
     * $: end of pattern
     */

    // regex.test() returns true if the argument matches that regex pattern
    if(!emailPattern.test(emailInputValue)) {
        showInputError(emailInputNode, "Please enter a valid email address.");
        isValid = false;
    }

    return isValid;
}

function showInputError(inputElement, message) {
    // select the first ancestor of an element with the argument selector
    const inputContainer = inputElement.closest(".input-container");
    
    // add error text to the end of the element
    // since there is no semantic alert tag, we'll add the ARIA role for it
    const errorText = document.createElement("div");
    errorText.innerText = message;
    errorText.classList.add("error-message");
    errorText.setAttribute("role", "alert");

    // append message to element
    inputContainer.appendChild(errorText);
}

// replace special characters with corresponding HTML entities
// <table>
// return: &lt;table&gt; 
// this prevents any characters from being entered that could be interpreted as HTML elements
function escapeHTML(input) {
    // simple recipe from course notes that sanitizes HTML inputs
    // sanitizing: creating a "safe" string that cannot be intepreted as code/markup
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
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
    const userNameValue = userNameInputNode.value;

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
    const emailInputValue = emailInputNode.value;
    
    // regex pattern
    const simpleEmailPattern = /.+@.+\..+/;
    /**
     * "One of more of any character, followed by @, 
     * followed by one or more of any character,
     * followed by ., followed by one or more of any character"
     * 
     * .+: one or more of any character, except line breaks
     * @: Literal "@" symbol
     * \.: literal "." symbol
     */

    // regex.test() returns true if the argument matches that regex pattern
    if(!simpleEmailPattern.test(emailInputValue)) {
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
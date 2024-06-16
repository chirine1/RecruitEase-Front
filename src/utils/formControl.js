export function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

   
 export  const validatePhoneNumber = (value) => {
    // Define the regex pattern for a phone number with exactly 11 digits starting with '+'
    const phoneNumberPattern = /^\+\d{11}$/;
  
    // Check if the value matches the regex pattern
    if (phoneNumberPattern.test(value)) {
      return true; // Valid phone number
    } else {
      return false; // Invalid phone number
    }
  };
  
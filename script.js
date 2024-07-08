"use strict"; 

//Variables
//* Input fields */
const YEAR = document.getElementById("year");
const MONTH = document.getElementById("month");
const DAY = document.getElementById("day");
//* Error messages div */
const dayError = document.querySelector(".day-error");
const monthError = document.querySelector(".month-error");
const yearError = document.querySelector(".year-error");
//* Fnal results div */
const dayResult = document.querySelector(".day-result");
const monthResult = document.querySelector(".month-result");
const yearResult = document.querySelector(".year-result");

//* Arrow button */
const arrowEl = document.querySelector(".arrow");
const arrowImg = document.querySelector(".arrow img");

//Today date variable
const todayDate = new Date();




//Check Day value validity
const checkDayValidity = () => {
  const dayValue = DAY.value;
  const getDayNum = new Date(YEAR.value, MONTH.value, 0).getDate();
  if (!dayValue) {
    errorStatus(DAY,dayError,"The field is required")
    return false;
  } else if (dayValue < 1 || dayValue > 31) {
    errorStatus(DAY,dayError,"Must be a valid day");
    return false;
  } else if (dayValue > getDayNum) {
    errorStatus(DAY,dayError,"Must be a valid date");
    return false;
  } else {
    verifiedStatus(DAY,dayError);
  }
  return dayValue;
};

//Check Month Value validity
const checkMonthValidity = () => {
  const monthValue = MONTH.value;
  if (!monthValue) {
    errorStatus(MONTH,monthError,"The field is required")
    return false;
  } else if (monthValue < 1 || monthValue > 12) {
    errorStatus(MONTH,monthError,"Must be a valid month");
    return false;
  } else {
   verifiedStatus(MONTH,monthError);
  }
  return monthValue;
};

//Check Year Value validity
const checkYearValidity = () => {
  const yearValue = YEAR.value;
  if (!yearValue) {
  errorStatus(YEAR,yearError,"The field is required");
    return false;
  } else if (yearValue > todayDate.getFullYear()) {
    errorStatus(YEAR,yearError,"Must be in the past")
    return false;
  } else {
    verifiedStatus(YEAR,yearError)
  }
  return yearValue;
};

//Errors handling functions
//*Function to style the input field when it returns false*/
const errorStatus = (inputField, messageElem,errorMessage) => {
  inputField.classList.remove("border");
  inputField.style.border = "2px solid hsl(0, 100%, 67%)";
  inputField.previousElementSibling.style.color = "hsl(0, 100%, 67%)";
  messageElem.innerHTML = errorMessage;
};

//*Function to style the input field when it returns true */
const verifiedStatus = (inputField,messageElem) => {
    messageElem.innerHTML = "";
    inputField.classList.add("border");
    inputField.previousElementSibling.style.color = "hsl(0, 1%, 44%)";

}


//Function to calulate the age in years,months and days
const calculateAge = (y, m, d) => {
  const birthDate = new Date(y, m - 1, d);
  let yearsDifference = todayDate.getFullYear() - birthDate.getFullYear();
  let monthsDifference = todayDate.getMonth() - birthDate.getMonth();
  let daysDifference = todayDate.getDate() - birthDate.getDate();

  if (monthsDifference < 0 || (monthsDifference == 0 && daysDifference < 0)) {
    yearsDifference--;
    monthsDifference += 12;
  }
  if (daysDifference < 0) {
    daysDifference += new Date(todayDate.getFullYear(), todayDate.getMonth(), 0).getDate();
    monthsDifference--;
  }

  yearResult.innerHTML = yearsDifference;
  monthResult.innerHTML = monthsDifference;
  dayResult.innerHTML = daysDifference;
  
  yearResult.classList.add('animate__animated', 'animate__fadeInUpBig');
  monthResult.classList.add('animate__animated', 'animate__fadeInUpBig');
 dayResult.classList.add('animate__animated', 'animate__fadeInUpBig');
};



// Event handlers for changing arrow button background color
arrowEl.addEventListener("touchstart", (e) => {
  e.target.style.backgroundColor = "hsl(0, 0%, 8%)";
  arrowImg.style.backgroundColor = "hsl(0, 0%, 8%)";
});

arrowEl.addEventListener("touchend", (e) => {
  e.target.style.backgroundColor = "hsl(259, 100%, 65%)";
  arrowImg.style.backgroundColor = "hsl(259, 100%, 65%)";
});

arrowImg.addEventListener("touchstart", (e) => {
  e.target.style.backgroundColor = "hsl(0, 0%, 8%)";
  arrowEl.style.backgroundColor = "hsl(0, 0%, 8%)";
});

arrowImg.addEventListener("touchend", (e) => {
  e.target.style.backgroundColor = "hsl(259, 100%, 65%)";
  arrowEl.style.backgroundColor = "hsl(259, 100%, 65%)";
});


//Event handlers functions for input value length
const inputLength = (fieldName,maxLength)=>{
fieldName.addEventListener("input",()=>{
  if (fieldName.value.length > maxLength) {
    fieldName.value = fieldName.value.slice(0, maxLength);
  }
})
}

const focusingInStyle = (elem,elemError)=>{
  elem.addEventListener('focusin',()=>{
    verifiedStatus(elem,elemError)
  })
}

const focusingOutStyle = (elem,elemError)=>{
  elem.addEventListener('focusout',()=>{
    verifiedStatus(elem,elemError)
  })
}
//Submitting input event to callback calculate function
arrowEl.addEventListener("click", () => {
  const day = checkDayValidity();
  const month = checkMonthValidity();
  const year = checkYearValidity();
  if (day && month && year) {
    calculateAge(year, month, day);

  }
});

//Calling input function
inputLength(DAY,2);
inputLength(MONTH,2);
inputLength(YEAR,4);

//Calling focusin function
focusingInStyle(DAY,dayError);
focusingInStyle(MONTH,monthError);
focusingInStyle(YEAR,yearError);


//Calling focusout function
focusingOutStyle(DAY,dayError);
focusingOutStyle(MONTH,monthError);
focusingOutStyle(YEAR,yearError);

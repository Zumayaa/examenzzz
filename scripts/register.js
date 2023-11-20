const userInfo = document.querySelectorAll('.form-inputs input');
const registerButton = document.querySelector('.btn-inicia')
const registeredUsers = getRegisteredUsers();
registerButton.addEventListener('click', () => {
  const userDataArray = Array.from(userInfo);
  const formatedData = formatArray(userDataArray)
  const conditionalsForRegister = registerNewUser(formatedData);
  const {arePasswordCorrect, isNotEmpty, isNotRegisteredEmail} = conditionalsForRegister;
  if (arePasswordCorrect && isNotEmpty && isNotRegisteredEmail){
    window.location.href = "./index.html";
  }else{
    const errorMessage = generateErrorMessage(conditionalsForRegister);
    alert(errorMessage)
  }
})
function formatArray(array){
  let userDataFormated = {};
  
  for (const inputField of array) {
    colorizeInputs(array)
    if (inputField.value){
      const fieldName = inputField.id;
      const value = inputField.value;
      userDataFormated[[fieldName]] = value
    }else{
      return {};
    }
  }
  return userDataFormated;
}
function colorizeInputs(array){
  array.map((inputField) => {
    if (!inputField.value) inputField.style.backgroundColor = "lightpink";
    else inputField.style.backgroundColor = "white";
  })
}
function arePasswordEqual(user){
  return user.password === user.repeat_password;
}
function isEmailRegistered(userDataObject,storagedUsers){
  if (storagedUsers.length !== 0){
    for (const userData of storagedUsers) {
      if (userData.email === userDataObject.email){
        return true;
      }
    }
  }
  return false;
}
function isObjectEmpty(objectName){
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
}
function registerNewUser(userDataObject){
  const filters = {
    arePasswordCorrect: arePasswordEqual(userDataObject),
    isNotEmpty: !isObjectEmpty(userDataObject),
    isNotRegisteredEmail: !isEmailRegistered(userDataObject,registeredUsers)
  };
  const {arePasswordCorrect, isNotEmpty, isNotRegisteredEmail} = filters;

  if(arePasswordCorrect && isNotEmpty && isNotRegisteredEmail) {
    delete userDataObject.repeat_password;
    registeredUsers.push(userDataObject);
    localStorage.removeItem('users')
    localStorage.setItem('users', JSON.stringify(registeredUsers))
  }
  return filters;
}
function getRegisteredUsers(){
  if (localStorage.getItem('users') === null) localStorage.setItem('users','[]');
  return JSON.parse(localStorage.getItem('users'));
}
function generateErrorMessage(filters){
  const {arePasswordCorrect, isNotEmpty, isNotRegisteredEmail} = filters;
  console.log(filters)
  let message = "";
  console.log()
  message += (!arePasswordCorrect) ? "Las contraseñas no coinciden\n" : ""
  console.log(message)
  message += (!isNotEmpty) ? "Rellene todos los campos\n" : ""
  console.log(message)
  message += (!isNotRegisteredEmail) ? "Ese correo ya se encuentra registrado\n" : ""
  console.log(message)
  return message;
}

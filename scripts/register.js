const userInfo = document.querySelectorAll('.form-inputs input');
const registerButton = document.querySelector('.btn-inicia')
const registeredUsers = getRegisteredUsers()
registerButton.addEventListener('click', () => {
  const userDataArray = Array.from(userInfo);
  const formatedData = formatArray(userDataArray)
  if (registerNewUser(formatedData)){
    window.location.href = "../index.html";
  }else{
    alert("El correo electrónico ya se encuentra en uso, las contraseñas no coinciden o rellene todos los campos")
  }
})
function formatArray(array){
  let userDataFormated = {};
  for (const inputField of array) {
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
  if(arePasswordEqual(userDataObject) 
    && !isObjectEmpty(userDataObject)
    && !isEmailRegistered(userDataObject,registeredUsers)) {
    delete userDataObject.repeat_password;
    registeredUsers.push(userDataObject);
    localStorage.removeItem('users')
    localStorage.setItem('users', JSON.stringify(registeredUsers))
    return true;
  }else {
    return false;
  }
}
function getRegisteredUsers(){
  const registeredUsers = localStorage.getItem('users')
  return (registeredUsers) ? JSON.parse(registeredUsers) : localStorage.setItem('users','[]') 
}

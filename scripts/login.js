const userInfo = document.querySelectorAll('.form-inputs input');
const logInButton = document.querySelector('.btn-inicia')
const registeredUsers = localStorage.getItem('users') 

logInButton.addEventListener('click', () => {
  const userDataArray = Array.from(userInfo);
  const formatedData = formatArray(userDataArray)
  if (!isObjectEmpty(formatedData)){
    if (credentialsAuthentication(formatedData,getRegisteredUsers()) ){
        window.location.href = "./index.html";
      }else {
        alert("Correo ó contraseña incorrecto/s verifique su marcación")
      }
  }else{
    alert("Rellene todos los campos")
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
function credentialsAuthentication(userDataObject,storagedUsers){
  if (storagedUsers.length !== 0){
    for (const user of storagedUsers) {
      if (validateEmailAndPassword(userDataObject,user)) return true;
    }
  }else{
    alert("No hay ningun usuario registrado, registrate!!!!")
  }
}
function validateEmailAndPassword(userToLogIn, userRegistered){
  if(userToLogIn.email === userRegistered.email
    && userToLogIn.password === userRegistered.password){
    return true; 
  }else{
    return false;
  }
}
function isObjectEmpty(objectName){
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
}
function getRegisteredUsers(){
  if (localStorage.getItem('users') === null) localStorage.setItem('users','[]');
  return JSON.parse(localStorage.getItem('users'));
}

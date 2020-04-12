
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
var id = 0;
const users = JSON.parse(localStorage.getItem('users')) || [];

const salvarUser =  ({nome,email}) =>{
 
  if(nome == '' && email == ''){
    return "Dados vazios"
  }else{
      users.push({id:++id,nome,email});
      localStorage.setItem('users',JSON.stringify(users))
    return "FOi"
  }
}
module.exports = salvarUser;
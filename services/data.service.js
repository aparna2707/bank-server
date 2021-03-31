let accountDetails = {

  1000: { acno: 1000, balance: 10000, username: "anvika", password: "testuser" },
  1001: { acno: 1001, balance: 20000, username: "ayaan", password: "testuser1" },
  1002: { acno: 1002, balance: 25000, username: "aparna", password: "testuser2" }

}

let currentUser;
const register = (acno, username, password) => {
  console.log("register called")

  if (acno in accountDetails) {

    return {
      status: false,
      statusCode: 422,
      message: "user already exists . please login!"

    }
  }
  //this.saveDetails();
  accountDetails[acno] = {
    acno,
    balance: 0,
    username,
    password
  }


  console.log(this.accountDetails);
  return {
    status: true,
    statusCode: 200,
    message: "registeration successfull"
  }
}
const login = (req, accno, pwd) => {
  let dataset = accountDetails;
  if (accno in dataset) {
    var pswd1 = dataset[accno].password
    if (pswd1 == pwd) {
      req.session.currentUser = dataset[accno];
      //this.saveDetails();
      return {
        status: true,
        statusCode: 200,
        message: "login successfull"
      }
    }
    else {
      return {
        status: false,
        statusCode: 422,
        message: "incorrect password"
      }
    }
  }
  else {

    return {
      status: false,
      statusCode: 422,
      message: "no user exist with this account number"
    }
  }
}

const deposit = (accno, pwd, amount) => { 
  var amt = parseInt(amount);
  let dataset = accountDetails;
  if (accno in dataset) {
    var pswd1 = dataset[accno].password
    if (pswd1 == pwd) {
      dataset[accno].balance += amt
      //this.saveDetails();
      return {
        status: true,
        statusCode: 200,
        message: "your account is credited ",
        balance: dataset[accno].balance
      }
    }
    else {

      return {
        status: false,
        statusCode: 422,
        message: "incorrect credentials"
      }
    }
  }
  else {
    return {
      status: false,
      statusCode: 422,
      message: "incorrect credentials"
    }

  }
}

 const withdrawal=( accno, pwd, amount)=>{
  
  var amt=parseInt(amount);
  let dataset = accountDetails;
  if (accno in dataset) {
    var pswd1 = dataset[accno].password
    if (pswd1 == pwd) {
      if(dataset[accno].balance>=amt){
        dataset[accno].balance-=amt
       // this.saveDetails();
       return {
        status: true,
        statusCode: 200,
        message: "your account is debited with amount:",
        balance: dataset[accno].balance
      }
      
      }
    
    else {
      return {
        status: false,
        statusCode: 422,
        message: "low balance"
      }
    }
    }
  }
  else{
    return {
      status: false,
      statusCode: 422,
      message: "invalid"
    }
  }
}

module.exports = {
  register,
  login,
  deposit,
withdrawal
}
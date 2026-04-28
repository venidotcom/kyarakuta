document.addEventListener('DOMContentLoaded', function () {

  console.log("password is: lasagna");
});

const login = document.getElementById('login-button');

login.addEventListener('click', function (event) {
  console.log('clicked');


  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  console.log("username + pwd:", username + ", " + password);

  if (password === 'lasagna') {
    console.log('user is authenticated');
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
    sessionStorage.setItem('isAuthN', 'true');

    window.location.assign("../index.html");
  }
  if (password != 'lasagna') {
    console.log('user is NOT authenticated');
    sessionStorage.setItem('isAuthN', 'false');
  }


  console.log('session username:', username);
  console.log('session password:', password);
  console.log('session authN', sessionStorage.getItem('isAuthN'));

});



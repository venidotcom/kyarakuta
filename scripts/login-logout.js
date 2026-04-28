
document.addEventListener('DOMContentLoaded', () => {

  const userGreeting = document.getElementById('userGreeting');
  const searchClass = document.getElementsByClassName('searchClass');
  userGreeting.textContent = '';

  const authStatus = isAuthN();
  console.log('isAuthN?', authStatus);

  const cards = document.querySelectorAll('.protected');

  showSignInOut();

  if (authStatus === true) {
    userGreeting.textContent = `hello, ${sessionStorage.getItem('username')}`;

    Object.keys(searchClass).forEach(key => {
      searchClass[key].removeAttribute('disabled');
    });

    cards.forEach(card => card.classList.remove('d-none')); // 👈 SHOW cards

    loadVideoContent();
  } else {
    cards.forEach(card => card.classList.add('d-none')); // 👈 HIDE cards
  }


  document.getElementById('btnLogout').addEventListener('click', () => {
    showLogoutToast();
    sessionStorage.clear();
    console.log('isAuthN?', sessionStorage.getItem('isAuthN'));
    showSignInOut();
    userGreeting.textContent = '';

    Object.keys(searchClass).forEach(key => {
      searchClass[key].disabled = true;
      searchClass[key].value = '';
    });

    unloadVideoContent();
  });

});


function isAuthN() {
  return sessionStorage.getItem('isAuthN') === 'true';
}

function showSignInOut() {
  if (isAuthN()) {

    const btnLogout = document.getElementById('btnLogout');
    btnLogout.classList.remove('d-none');

    const btnLogin = document.getElementById('btnLogin');
    btnLogin.classList.add('d-none');
  }
  else if (!isAuthN()) {

    const btnLogout = document.getElementById('btnLogout');
    btnLogout.classList.add('d-none');

    const btnLogin = document.getElementById('btnLogin');
    btnLogin.classList.remove('d-none');
  }

}

function showLogoutToast() {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast align-items-center text-bg-success border-0 show';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        You have been logged out.
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

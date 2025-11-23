
// Simple frontend login component (no backend).
// Default credentials: admin / 1234
// On success: sets localStorage 'logged_in' flag and redirects to 'index.html' (change as needed).

(function(){
  const form = document.getElementById('loginForm');
  const msg = document.getElementById('msg');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const AUTH_KEY = 'logged_in';

  function show(text, color){ msg.style.color = color || '#111'; msg.textContent = text; }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const u = username.value.trim();
    const p = password.value;
    if(!u || !p){ show('Enter both fields', 'red'); return; }
    if(u === 'admin' && p === '1234'){
      localStorage.setItem(AUTH_KEY, '1');
      show('Login successful. Closing...', 'green');
      setTimeout(()=>{ 
        // default redirect — friend can change to desired page
        if(window.opener && window.opener !== window){
          // if opened as popup, close it
          window.close();
        } else {
          // otherwise, try to go to index.html (if exists)
          window.location.href = './Home/home.html';
        }
      }, 600);
    } else {
      show('Invalid credentials', 'red');
    }
  });

  // expose a logout helper for integrators
  window.loginComponent = {
    isLoggedIn: () => localStorage.getItem(AUTH_KEY) === '1',
    logout: () => { localStorage.removeItem(AUTH_KEY); }
  };
}
)();

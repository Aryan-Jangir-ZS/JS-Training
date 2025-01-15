document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userDetails = document.getElementById('userDetails');
    const greeting = document.getElementById('greeting');
    const setThemeBtn = document.getElementById('setThemeBtn');
    const saveGreetingBtn = document.getElementById('saveGreetingBtn');
    const sessionGreetingInput = document.getElementById('sessionGreeting');

    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    if (storedName && storedEmail) {
        userDetails.innerHTML = `<p>Name: ${storedName}</p><p>Email: ${storedEmail}</p>`;
    }


    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);

        userDetails.innerHTML = `<p>Name: ${name}</p><p>Email: ${email}</p>`;
        greeting.innerText = `Hello, ${name}! Welcome back!`;
    });


    const sessionGreeting = sessionStorage.getItem('greeting');
    if (sessionGreeting) {
        greeting.innerText = sessionGreeting; 
    } else {
        sessionStorage.setItem('greeting', 'Welcome back!'); 
        greeting.innerText = 'Welcome back!'; 
    }

    saveGreetingBtn.addEventListener('click', () => {
        const customGreeting = sessionGreetingInput.value.trim();
        if (customGreeting) {
            sessionStorage.setItem('greeting', customGreeting);
            greeting.innerText = customGreeting;
        }
    });

    const theme = getCookie('theme');
    applyTheme(theme);

    setThemeBtn.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
        setCookie('theme', currentTheme, 7);
        applyTheme(currentTheme);
    });

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    }

    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(`${name}=`)) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }
    function applyTheme(theme) {
        const body = document.body;
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
        } else {
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
        }
    }
});

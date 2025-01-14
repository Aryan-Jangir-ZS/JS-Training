document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const greeting = document.getElementById('greeting');
    const setThemeBtn = document.getElementById('setThemeBtn');


    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    if (storedName && storedEmail) {
        greeting.innerText = `Hello, ${storedName}! Your email is ${storedEmail}.`;
    }


    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);

        greeting.innerText = `Hello, ${name}! Your email is ${email}.`;
    });


    const sessionGreeting = sessionStorage.getItem('greeting');
    if (!sessionGreeting) {
        sessionStorage.setItem('greeting', 'Welcome back!');
    }
    console.log(sessionStorage.getItem('greeting')); 

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
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
    }
});

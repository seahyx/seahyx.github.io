const toggleSwitch = document.querySelector('.theme-switch');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

if (currentTheme && currentTheme === 'dark') {
	toggleSwitch.checked = true;
}

toggleSwitch.addEventListener('change', switchTheme, false);
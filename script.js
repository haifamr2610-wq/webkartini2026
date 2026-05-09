// User database (menggunakan localStorage)
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

// Toggle antara form login dan registrasi
function toggleForms() {
    const loginForm = document.querySelector('.form-container:not(#registerContainer)');
    const registerForm = document.getElementById('registerContainer');
    
    if (registerForm.style.display === 'none') {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    }
}

// Event listener untuk form login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Cari user dengan email dan password yang sesuai
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showMainApp();
    } else {
        alert('Email atau password salah!');
    }
});

// Event listener untuk form registrasi
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    // Validasi
    if (password !== confirmPassword) {
        alert('Kata sandi dan konfirmasi kata sandi tidak sesuai!');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        alert('Email sudah terdaftar!');
        return;
    }
    
    // Tambah user baru
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Akun berhasil dibuat! Silakan login.');
    toggleForms();
    document.getElementById('registerForm').reset();
    document.getElementById('loginForm').reset();
});

// Tampilkan main app
function showMainApp() {
    document.getElementById('loginBody').style.display = 'none';
    document.getElementById('mainBody').style.display = 'block';
    showPage('home');
}

// Fungsi untuk menampilkan halaman
function showPage(pageName) {
    // Sembunyikan semua halaman
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    
    // Tampilkan halaman yang dipilih
    const page = document.getElementById(pageName);
    if (page) {
        page.style.display = 'block';
        // Scroll ke atas
        window.scrollTo(0, 0);
    }
}

// Fungsi logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('loginBody').style.display = 'flex';
    document.getElementById('mainBody').style.display = 'none';
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
    document.getElementById('registerContainer').style.display = 'none';
    
    // Update link registrasi
    const loginContainer = document.querySelector('.form-container:not(#registerContainer)');
    loginContainer.style.display = 'block';
}

// Check apakah user sudah login
window.addEventListener('load', function() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
    }
});
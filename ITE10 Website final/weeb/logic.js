/* --- LOGIN PAGE LOGIC --- */
function initLogin() {
    // 1. Check if user is already logged in
    if (sessionStorage.getItem("isLoggedIn") === "true") {
        window.location.href = "homepage.html";
        return;
    }

    // 2. Check for Logout Flag in URL (to show confirmation message)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'loggedout') {
        const msgDiv = document.getElementById('logout-message');
        if (msgDiv) {
            msgDiv.style.display = "block";
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    // 3. Form Submission
    const form = document.getElementById("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const username = document.getElementById("username-input").value.trim();
            const password = document.getElementById("password-input").value.trim();
            const errorDiv = document.getElementById("error-message");
            const btn = document.getElementById("submit-btn");

            errorDiv.textContent = "";

            if (username === "" || password === "") {
                errorDiv.textContent = "Please fill in both fields.";
                return;
            }

            // Simulate loading
            btn.textContent = "Verifying...";
            btn.disabled = true;

            setTimeout(() => {
                // Hardcoded Credentials
                if (username === "admin" && password === "12345") {
                    // SET SESSION
                    sessionStorage.setItem("isLoggedIn", "true");
                    window.location.href = "homepage.html";
                } else {
                    errorDiv.textContent = "Invalid username or password.";
                    btn.textContent = "Log In";
                    btn.disabled = false;
                }
            }, 1000); // 1 second delay for realism
        });
    }
}

/* --- DASHBOARD LOGIC --- */
function initDashboard() {
    // 1. Auth Guard: Redirect to login if session is missing
    if (sessionStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "log-in-page.html";
    }
}

// 2. Logout Function
function logout() {
    if (confirm("Are you sure you want to log out?")) {
        sessionStorage.removeItem("isLoggedIn");
        // Redirect to login page with status param
        window.location.href = "log-in-page.html?status=loggedout";
    }
}

// 3. Tab Switching for SPA feel
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    // Remove active class from nav
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    // Show target
    document.getElementById(sectionId).classList.add('active');
    
    // Highlight button
    // Note: detailed selection logic omitted for brevity, but simple click works
    event.target.classList.add('active');
}
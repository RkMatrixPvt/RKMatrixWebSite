document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// ✅ Session Check on Page Load
(function checkAuth() {
    const auth = JSON.parse(localStorage.getItem("authData"));
    const currentTime = Date.now();
    const maxSessionTime = 30 * 60 * 1000; // 30 minutes

    if (
        !auth ||
        !auth.isLoggedIn ||
        !auth.loginTime ||
        currentTime - auth.loginTime > maxSessionTime
    ) {
        // ⛔ Not logged in or session expired
        localStorage.removeItem("authData");
        localStorage.removeItem("activeSection");
        window.location.href = "RKMatrixLogin.html"; // 🔁 Redirect to login
    }
})();

// 🔓 Logout Function (Call this on logout button click)
function handleLogout() {
    const confirmed = confirm("Are you sure you want to logout?");
    if (confirmed) {
        localStorage.removeItem("authData");
        localStorage.removeItem("activeSection");
        window.location.href = "RKMatrixLogin.html";
    }
}

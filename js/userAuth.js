document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

function authenticateUser(username, password) {
    return fetch("https://www.rkmatrix.co.in/userData.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch JSON file.");
            return response.json();
        })
        .then(users => {
            const matchedUser = users.find(u => u.username === username && u.password === password);
            return matchedUser;
        })
        .catch(error => {
            console.error("❌ Fetch or parsing error:", error);
            return null;
        });
}


async function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const matchedUser = await authenticateUser(user, pass);
    if (matchedUser) {
        try {
            const loginData = {
                ...matchedUser,
                isLoggedIn: true,
                loginTime: Date.now()
            };

            const jsonData = JSON.stringify(loginData); // This may fail if matchedUser is not safe
            localStorage.setItem("authData", jsonData);
            window.location.href = "RKMatrixZeroDBInvoice.html";
        } catch (err) {
            console.error("❌ Failed to save login:", err);
            alert("Error saving login info. Please try again.");
        }
    } else {
        alert("❌ Invalid credentials! Try again.");
    }
}


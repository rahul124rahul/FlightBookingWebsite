function loadPage(page) {
    fetch(`pages/${page}`)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById('main-content');
            container.innerHTML = data;

            // Extract and evaluate scripts manually
            const scripts = container.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.body.appendChild(newScript);
                script.remove(); // Optional: remove the original script tag
            });
            sessionStorage.setItem("lastPage",page);
        })
        .catch(err => {
            document.getElementById('main-content').innerHTML =
                '<p class="text-danger">Failed to load content.</p>';
            console.error(err);
        });

}



function decodeJWT(token) {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null; const payload = parts[1];
    // Base64URL decode
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));

    try {
        return JSON.parse(decodedPayload);
    } catch (e) {
        console.error("Invalid JWT payload:", e); return null;
    }
}

function getUserId() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "login.html";
    const decoded = decodeJWT(token);
    return decoded.userId;
}

function getUserName() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "login.html";
    const decoded = decodeJWT(token);
    return decoded.name;
}

function getUserEmail() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "login.html";;
    const decoded = decodeJWT(token);
    return decoded.email;
}

function getUserPhone() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "login.html";;
    const decoded = decodeJWT(token);
    return decoded.phone;
}

function getPassportNumber() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "login.html";;
    const decoded = decodeJWT(token);
    return decoded.passPort;
}

function getUserType() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "login.html";
    const decoded = decodeJWT(token);
	 if(getPassportNumber()!=null)return "USER";
    return "ADMIN";
}

function getAuthorization() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "login.html";
    const decoded = decodeJWT(token);
    return `Bearer ${token}`;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.clear();
    window.location.href = "login.html";
}

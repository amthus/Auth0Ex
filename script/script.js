document.addEventListener("DOMContentLoaded", async function () {
    const auth0 = await createAuth0Client({
        domain:"dev-f4mip1ghvqydxcij.us.auth0.com",
        client_id:"ZtWJg3ZbGtrRKkZNSvTkn1syfAbuq00T",
        redirect_uri:"https://vercel.com/amthus-s-projects/auth0/EJyRbjZ6UuKzxqDL9TT8g9zfReZk"
    });

    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const userInfo = document.getElementById("user-info");
    const userName = document.getElementById("user-name");
    const userPic = document.getElementById("user-pic");

    async function updateUI() {
        const isAuthenticated = await auth0.isAuthenticated();
        
        if (isAuthenticated) {
            const user = await auth0.getUser();
            userName.textContent = user.name;
            userPic.src = user.picture;
            loginBtn.style.display = "none";
            logoutBtn.style.display = "inline-block";
            userInfo.style.display = "block";
        } else {
            loginBtn.style.display = "inline-block";
            logoutBtn.style.display = "none";
            userInfo.style.display = "none";
        }
    }

    loginBtn.addEventListener("click", async () => {
        await auth0.loginWithRedirect();
    });

    logoutBtn.addEventListener("click", async () => {
        await auth0.logout({ returnTo: window.location.origin });
    });

    if (window.location.search.includes("code=")) {
        await auth0.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/");
    }

    updateUI();
});

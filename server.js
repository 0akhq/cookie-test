const express = require("express");
const session = require("express-session");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: "sessionId",
    secret: "egitim-icin-gizli-anahtar",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 60 * 60 * 1000
    }
}));

app.use(express.static("public"));

app.post("/login", (req, res) => {
    req.session.user = {
        username: "Fatih"
    };

    res.redirect("/panel");
});

app.get("/panel", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Oturum yok. <a href='/'>Giriş yap</a>");
    }

    res.send(`
        <h1>Panel</h1>
        <p>Hoş geldin, ${req.session.user.username}</p>

        <form method="POST" action="/logout">
            <button>Çıkış Yap</button>
        </form>
    `);
});

app.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
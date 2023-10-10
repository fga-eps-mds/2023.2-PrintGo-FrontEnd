const express = require("express");
const app = express();

app.get("/", (req,res) => { 
    res.send("Parabéns, você subiu o ambiente!"); // envia uma mensagem para mostrar que o ambiente subiu, apagar depois
});

app.listen(3000, () => { 
    console.log("Server running on port 3000");
});

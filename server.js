import app from "./app.js";

app.listen(process.env.APP_Port || 3000,()=>{
    console.log("Server up and running on port " + process.env.APP_Port);
});

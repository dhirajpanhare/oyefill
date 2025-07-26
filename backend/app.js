import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';


const app= express();

import UserRouter from './routers/user.router.js';
import CategoryRouter from './routers/category.router.js';
import ContactRouter from './routers/contact.router.js';
import AlertRouter from './routers/alerts.router.js';
import FormRouter from './routers/form.router.js';


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(fileUpload())


app.use(
  cors({
    origin: "https://oyefill.vercel.app/",
    Credential: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["content-type", "Authorization"],
  })
);
app.use("/user",UserRouter);
app.use("/contact",ContactRouter);
app.use("/category", CategoryRouter);
app.use("/alert",AlertRouter);
app.use("/forms",FormRouter);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server invoked at port ${PORT}`);
});
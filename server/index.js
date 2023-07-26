import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { register } from './controllers/auth.js';

dotenv.config();

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan("common"));
app.use(express.json({ limit: "30mb",extended: true }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/assets");
    },
    filename: function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage});

// ROUTES WITH FILES
app.get("/",(req,res)=>{
  res.status(201).json({message: "Social Media"});
})


app.post("/auth/register",upload.single("picture"),register);


// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
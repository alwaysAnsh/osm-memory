import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import bcrypt from 'bcrypt'
//securty packges
import helmet from "helmet";
import dbConnection from './dbConfig/db.js'
import errorMiddleware from './middleware/error.middleware.js'
import userRoutes from './routes/user.route.js'
import adminRoutes from './routes/admin.route.js'
import categoryRoutes from './routes/category.route.js'
import flashcardRoutes from './routes/flashcardProgress.route.js'
import Admin from './models/admin.model.js'

dotenv.config();



const __dirname = path.resolve(path.dirname(""));

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "views/build")));


const PORT = process.env.PORT || 8000;

// dbConnection();

app.use(helmet());

//LOGIC FOR SEEDING THE ADMIN CREDENTIALS

const seedAdmin = async () => {
    try {
      const existingAdmin = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
      if (existingAdmin) {
        console.log('Admin already exists');
        return;
      }
  
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  
      const newAdmin = new Admin({
        username: process.env.ADMIN_USERNAME,
        password: hashedPassword,
      });
  
      await newAdmin.save();
      console.log('Admin seeded successfully');
    } catch (error) {
      console.error('Error seeding admin:', error.message);
    }
};
dbConnection();

seedAdmin();

// Define a list of allowed origins
const allowedOrigins = [
  "http://127.0.0.1:5173", // Vite frontend
  "http://localhost:5173", // Alternative localhost frontend
//   "https://take-me-with-ab1weo33i-yuvrajsinghjadons-projects.vercel.app",
//   "https://take-me-with-c4678vcl0-yuvrajsinghjadons-projects.vercel.app", // Add other Vercel deployment URLs as needed
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        origin.endsWith("vercel.app")
      ) {
        // Allow all Vercel subdomains or explicitly allowed origins
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    }, // Vercel frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allows cookies, authentication, etc.
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));


//error middleware
app.use(errorMiddleware);

app.use('/api/v2', userRoutes)
app.use('/api/v2', adminRoutes)
app.use('/api/v2', categoryRoutes)
app.use('/api/v2', flashcardRoutes)





app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouters = require('./routers/Auth_Route');
const GroupRouters = require('./routers/Group_Route');
const WorkRouters = require('./routers/Work_Route');
const ReportRouters = require('./routers/Report_Route');
const RequrmentRouters = require('./routers/Requrment_Route');
const NotificationRouters = require('./routers/Notification_Route');
const FacilitiesRouters = require('./routers/Facilities_Router');
const FAQRouters = require('./routers/FAQ_Route');
const BlogNewsRouters = require('./routers/BlogNews_Route');
const AttendanceRouters = require('./routers/Attendance_Route');
const PhotoRoutes = require("./routers/Photo_Route");

require("dotenv").config();
const path = require("path");

const app = express();
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://tech-exp-oms.vercel.app"
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Auth-Token', 'Origin'],
    optionsSuccessStatus: 200
};
// app.use(cors(corsOptions));
const cors = require("cors");

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://tech-exp-oms.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// IMPORTANT: handle preflight
app.options("*", cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: false }));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.log("DB error", err));

app.use(authRouters);

app.use(GroupRouters);

app.use(WorkRouters);

app.use(ReportRouters);

app.use(RequrmentRouters);

app.use(NotificationRouters);

app.use(FacilitiesRouters);

app.use(FAQRouters);

app.use(BlogNewsRouters);

app.use(AttendanceRouters);

app.use(PhotoRoutes);


app.get("/", (req, res) => {
    res.json(" Hello from TechExp Server ! ")
})

app.listen(process.env.PORT || 3001, () => {
    console.log("TechExp Server is runing on port number : 3001");
})
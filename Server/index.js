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
app.use(cors({
    origin: function (origin, callback) {
        if (
            !origin ||
            origin === "http://localhost:5173" ||
            origin === "https://tech-exp-oms.vercel.app"
        ) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: false }));

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("TechExp Database connected"))
.catch((err) => console.log("DB connection error:", err));

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
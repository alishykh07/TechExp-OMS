// import { Outlet } from "react-router-dom";
// import Header from "./Components/Header/Header.jsx";
// import Footer from "./Components/Footer/Footer.jsx";
// import Sidebar from "./Components/Header/Sidebar.jsx";
// import {useEffect, useState} from "react";
// import {loggedUser} from "./Services/AuthService.js";
// import {Toaster} from "react-hot-toast";

// function App() {

//     const [loggedin, setLoggedin] = useState(null);

//     useEffect(() => {
//         const logged = async () => {
//             try {
//                 setLoggedin(await loggedUser());
//             } catch (e) {
//                 console.log(e.message);
//                 setLoggedin(null);
//             }
//         }
//         logged();
//     }, [])

//     return (
//         <>
//             <div className={`${loggedin?.role === "Manager" ? "flex" : "block"} min-h-screen w-full bg-white`}>
//                 {loggedin?.role === "Manager" ? <Sidebar /> : <Header />}
//                 <main className="flex-1">
//                     <Toaster />
//                     <Outlet />
//                 </main>
//             </div>
//             <Footer />
//         </>
//     );
// }

// export default App;



import { Outlet, useLocation, Navigate } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Sidebar from "./Components/Header/Sidebar.jsx";
import { useEffect, useState } from "react";
import { loggedUser } from "./Services/AuthService.js";
import { Toaster } from "react-hot-toast";

function App() {
    const [loggedin, setLoggedin] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        const logged = async () => {
            try {
                const user = await loggedUser();
                setLoggedin(user);
            } catch (e) {
                console.log(e.message);
                setLoggedin(null);
            } finally {
                setLoading(false);
            }
        };

        logged();
    }, []);

    const protectedRoutes = [
        "/notification",
        "/show-all-tasks",
        "/all-reports",
        "/submit-report",
        "/Show-all-project",
        "/submit-requrment",
        "/profile",
        "/attendance",
        "/polices",
        "/privacy-polices",
        "/faq",
        "/show-requirement",
    ];
    
    const managerRoutes = [
        "/adduser",
        "/add-group",
        "/add-work",
        "/all-staff",
        "/add-notification",
        "/dashboard",
        "/add-facility",
        "/addblognews",
        "/add-faq",
        "/daily-attendance",
    ];

    const currentPath = location.pathname;

    const protectedDynamicRoutes = [
    "/view-details/",
    "/group-details/",
];

const managerDynamicRoutes = [
    "/user-details/",
];

    if (
    !loading &&
    !loggedin &&
    (
        protectedRoutes.includes(currentPath) ||
        managerRoutes.includes(currentPath) ||
        protectedDynamicRoutes.some((route) =>
            currentPath.startsWith(route)
        ) ||
        managerDynamicRoutes.some((route) =>
            currentPath.startsWith(route)
        )
    )
) {
    return <Navigate to="/login" />;
}

   if (
    !loading &&
    loggedin &&
    loggedin.role !== "Manager" &&
    (
        managerRoutes.includes(currentPath) ||
        managerDynamicRoutes.some((route) =>
            currentPath.startsWith(route)
        )
    )
) {
    return <Navigate to="/" />;
}

    return (
        <>
            <div
                className={`${
                    loggedin?.role === "Manager" ? "flex" : "block"
                } min-h-screen w-full bg-white`}
            >
                {loggedin?.role === "Manager" ? (
                    <Sidebar />
                ) : (
                    <Header />
                )}

                <main className="flex-1">
                    <Toaster />
                    <Outlet />
                </main>
            </div>

            <Footer />
        </>
    );
}

export default App;
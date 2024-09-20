import {
    createBrowserRouter,
    RouterProvider,
    Route,
    //Link,
    createRoutesFromElements,
    Outlet,
} from "react-router-dom";
import Home from "./Pages/Home";
import MainLayout from "./Layout/MainLayout";
import Genre from "./Pages/Genre";
import Country from "./Pages/Country";
import Movies from "./Pages/Movies";
import Series from "./Pages/Series";
import Animation from "./Pages/Animation";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import AuthLayout from "./Layout/AuthLayout";
import { AuthProvider } from "./Context/AuthContext";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route
                path="/"
                element={
                    <>
                        <AuthProvider>
                            <Outlet />
                        </AuthProvider>
                    </>
                }
            >
                <Route element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="genre" element={<Genre />} />
                    <Route path="country" element={<Country />} />
                    <Route path="movies" element={<Movies />} />
                    <Route path="series" element={<Series />} />
                    <Route path="animation" element={<Animation />} />
                    <Route path="signup" element={<SignUp />} />
                </Route>

                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
                {/* <Route path="contact" element={<Contact />} />
                <Route
                    path="dashboard"
                    element={<Dashboard />}
                    loader={({ request }) =>
                        fetch("/api/dashboard.json", {
                            signal: request.signal,
                        })
                    }
                />
                <Route element={<AuthLayout />}>
                    <Route
                        path="login"
                        element={<Login />}
                        loader={redirectIfUser}
                    />
                    <Route path="logout" action={logoutUser} />
                </Route> */}
            </Route>
        )
    );
    return <RouterProvider router={router} />;

    // return router (
    //     <BrowserRouter>
    //         <Routes>
    //             <Route path="/">
    //                 <Route index element={<Home />} />
    //                 {/* <Route path="registrar" element={<Registrar />} />
    //                 <Route
    //                     path="olvide-password"
    //                     element={<OlvideContraseña />}
    //                 />
    //                 <Route
    //                     path="olvide-password/:token"
    //                     element={<NuevaContraseña />}
    //                 />
    //                 <Route path="confirmar/:id" element={<ConfirmarCuenta />} /> */}
    //             </Route>
    //             {/* <Route path="/proyectos" element={<RutaProtegida />}>
    //                 <Route index element={<Proyectos />} />
    //                 <Route path="crear-proyecto" element={<NuevoProyecto />} />
    //                 <Route path=":id" element={<Proyecto />} />
    //                 <Route path="editar/:id" element={<EditarProyecto />} />
    //                 <Route
    //                     path="nuevo-colaborador/:id"
    //                     element={<NuevoColaborador />}
    //                 />
    //             </Route> */}
    //         </Routes>
    //     </BrowserRouter>
    // );
}

export default App;

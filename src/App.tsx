import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
    Outlet,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MoviesProvider } from "./context/MoviesContext";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Genre from "./pages/Genre";
import Country from "./pages/Country";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Signup from "./pages/SignUp";
import AuthLayout from "./layout/AuthLayout";
import Animation from "./pages/Animation";
import Login from "./pages/Login";
import { SeriesProvider } from "./context/SeriesContext";
import { AnimationProvider } from "./context/AnimationContext";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route
                path="/"
                element={
                    <AuthProvider>
                        <MoviesProvider>
                            <SeriesProvider>
                                <AnimationProvider>
                                    <Outlet />
                                </AnimationProvider>
                            </SeriesProvider>
                        </MoviesProvider>
                    </AuthProvider>
                }
            >
                <Route element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="genre" element={<Genre />} />
                    <Route path="country" element={<Country />} />
                    <Route path="movies" element={<Movies />} />
                    <Route path="series" element={<Series />} />
                    <Route path="animation" element={<Animation />} />
                    <Route path="signup" element={<Signup />} />
                </Route>

                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
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

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    //Link,
    createRoutesFromElements,
    Outlet,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import Genre from "./pages/Genre.tsx";
import Country from "./pages/Country.tsx";
import Movies from "./pages/Movies.tsx";
import Series from "./pages/Series.tsx";
import Animation from "./pages/Animation.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import AuthLayout from "./layout/AuthLayout.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { MoviesProvider } from "./context/MoviesContext.tsx";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route
                path="/"
                element={
                    <>
                        <AuthProvider>
                            <MoviesProvider>
                                <Outlet />
                            </MoviesProvider>
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

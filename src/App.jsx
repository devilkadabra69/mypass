import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";
import "./App.css";
import Auth from "./appwrite/Auth";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getuser = async () => {
      await Auth.getCurrentUser()
        .then((data) => {
          console.log("data is :: ", data);
        })
        .catch((error) => {
          console.log("error is :: ", error);
          console.log("no User is logged in");
        })
        .finally(() => setLoading(false));
    };

    getuser();
  }, []);

  return !loading ? (
    <>
      <section className="flex flex-col min-h-screen w-full">
        <Header />
        <main className="w-full h-full flex-grow">
          <Outlet />
        </main>
        <Footer />
      </section>
    </>
  ) : null;
}

export default App;

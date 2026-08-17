import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="w-full flex-1">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Layout;
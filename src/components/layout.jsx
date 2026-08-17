import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ padding: "40px 20px", minHeight: "80vh" }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;

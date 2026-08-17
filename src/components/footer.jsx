const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#0f3d2e",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <p>© {new Date().getFullYear()} AMELTAN </p>
      <p>Email: ameltanaks.org@gmail.com | Phone: 08067488551</p>
    </footer>
  );
};

export default Footer;

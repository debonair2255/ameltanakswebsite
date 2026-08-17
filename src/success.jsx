import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <section style={{ textAlign: "center" }}>
      <h1>🎉 Registration Successful!</h1>
      <p>Welcome to AMELTAN Akwa Ibom State</p>

      <button onClick={() => navigate("/")}>Back to Home</button>
    </section>
  );
};

export default Success;

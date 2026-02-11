import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="section">
      <div className="container text-center">
        <div className="glass cta-box">
          <h2>Start Now</h2>
          <button
            className="primary-btn"
            onClick={() => navigate("/")}
          >
            Create Your Space
          </button>
        </div>
      </div>
    </section>
  );
}
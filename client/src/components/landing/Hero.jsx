import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/landing.css";

export default function Hero() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomInput, setRoomInput] = useState("");

  function handleJoin() {
    if (!roomInput.trim()) return;
    navigate(`/room/${roomInput.trim()}`);
  }

  return (
    <section className="hero-section">

      <div className="hero-content">
        <h1>
          Communication.
          <br />
          Reimagined.
        </h1>

        <p>
          A refined space for conversations that matter.
          Private. Seamless. Beautiful.
        </p>

        <div className="hero-buttons">

          <button
            className="glass primary-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Start a Meeting
          </button>

          {/* 🔥 GitHub Embedded */}
          <a
            href="https://github.com/sairajp88/streammeet"
            target="_blank"
            rel="noopener noreferrer"
            className="glass secondary-btn"
          >
            Discover More
          </a>

        </div>
      </div>

      <div className="hero-mockup glass"></div>

      {isModalOpen && (
        <div className="join-overlay">
          <div className="join-box glass">
            <h3>Enter Room ID</h3>

            <input
              type="text"
              placeholder="Room ID"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
            />

            <div className="join-actions">
              <button
                className="secondary-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>

              <button
                className="primary-btn"
                onClick={handleJoin}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
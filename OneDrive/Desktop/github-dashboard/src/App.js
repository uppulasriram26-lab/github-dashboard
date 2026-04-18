import React, { useState, useEffect } from "react";
import { getUser, getRepos } from "./github";

function App() {
  const [username, setUsername] = useState("octocat");
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetchData(username);
  }, [username]);

  const fetchData = async (name) => {
    try {
      const userData = await getUser(name);
      const repoData = await getRepos(name);

      setUser(userData);
      setRepos(repoData);
    } catch (error) {
      console.log("Error:", error);
      setUser(null);
      setRepos([]);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "30px", background: "#f5f7fb", minHeight: "100vh" }}>
      
      <h1 style={{ textAlign: "center" }}>🚀 GitHub Analytics Dashboard</h1>

      {/* Search Box */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <input
          type="text"
          value={input}
          placeholder="Enter GitHub username"
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />
        <button
          onClick={() => setUsername(input)}
          style={{
            padding: "10px 15px",
            marginLeft: "10px",
            borderRadius: "6px",
            background: "#24292e",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      {/* User Card */}
      {!user ? (
        <h2 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h2>
      ) : (
        <div style={{
          marginTop: "30px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "300px",
          margin: "30px auto",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          <img
            src={user.avatar_url}
            width="100"
            style={{ borderRadius: "50%" }}
            alt="avatar"
          />
          <h2>{user.name}</h2>
          <p>{user.bio}</p>

          <p>⭐ Followers: {user.followers}</p>
          <p>📦 Repos: {user.public_repos}</p>
        </div>
      )}

      {/* Repo List */}
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h3>📁 Repositories</h3>

        {repos.map((repo) => (
          <div key={repo.id} style={{
            background: "white",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between"
          }}>
            <span>{repo.name}</span>
            <span>⭐ {repo.stargazers_count}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
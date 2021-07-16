import React, { useState } from "react";
import "./reset.css";
import "./index.css";
import { Header } from "./components/Header";
import { CreatePost } from "./components/CreatPostSection";
import { Feeds } from "./components/Feeds";

function App() {
  return (
    <div className="App">
      <header className="main-header">
        <Header />
      </header>
      <main className="wrapper">
        <section className="create-post-section">
          <CreatePost />
        </section>
        <section className="feed">
          <Feeds />
        </section>
      </main>
    </div>
  );
}

export default App;

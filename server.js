const express = require("express");
const { ExpressPeerServer } = require("peer");
const path = require("path");

const app = express();
app.enable("trust proxy");

const PORT = process.env.PORT || 9000;

// Create HTTP server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🟢 PeerJS server listening on http://localhost:${PORT}/`);
});

// PeerJS server
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/",
});

app.use("/peerjs", peerServer); // PeerJS server hosted at /peerjs

// Serve static files (your frontend HTML, JS, CSS) from /public
app.use(express.static(path.join(__dirname, "public")));

// Optional: fallback for unknown routes
app.use((req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;

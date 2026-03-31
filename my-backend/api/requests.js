// api/requests.js
let requests = []; // in-memory storage

export default function handler(req, res) {
  if (req.method === "POST") {
    const { requestor, email, type, priority, description } = req.body;
    if (!requestor || !email || !type || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newRequest = { 
      id: requests.length + 1, 
      requestor, 
      email, 
      type, 
      priority: priority || "Medium", 
      description,
      createdAt: new Date().toISOString()
    };
    requests.push(newRequest);
    res.status(201).json(newRequest);
  } else if (req.method === "GET") {
    res.status(200).json(requests);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

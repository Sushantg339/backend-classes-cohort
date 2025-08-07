require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");

const generateResponse = require('./src/services/ai.service')

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // or your frontend URL
    methods: ["GET", "POST"]
  }
});

const connectToDB = require("./src/db/db");

const chatHistory = []

connectToDB();

io.on("connection", (socket) => { // on - event listen krna 
    console.log("A user connected");

    socket.on("disconnect", () => { // on - event listen krna 
        console.log("user disconnected");
    });

    socket.on("ai-message" ,async (data)=>{

        chatHistory.push({
            role : "user" , 
            parts :[{text : data}] 
        })

        const response = await generateResponse(chatHistory)

        chatHistory.push({
            role : "model" , 
            parts : [{text : response}]
        })
        
        socket.emit('ai-message-response' , response)
    })
});

httpServer.listen(3000, () => {
    console.log("server is running on port 3000");
});

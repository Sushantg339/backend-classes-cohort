require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");

const generateResponse = require('./src/services/ai.service')

const httpServer = createServer(app);
const io = new Server(httpServer);

const connectToDB = require("./src/db/db");
const { resolveSoa } = require("dns");
const { sourceMapsEnabled } = require("process");

connectToDB();

io.on("connection", (socket) => {
    // ...
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("message", async (data) => {
        console.log('recieved ai message' , data.prompt)
        const response = await generateResponse(data.prompt)
        console.log("AI Response : ",response)
        socket.emit('ai-message-response' , {response})
    });
});

httpServer.listen(3000, () => {
    console.log("server is running on port 3000");
});

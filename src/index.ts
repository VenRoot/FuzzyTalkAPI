import express from "express";
import fs from "fs";
import websocket from "ws";
import SocketRequest, {SendHelloRequest, SendMessageRequest} from "./interface/SocketRequest";

const app = express();

const wss = new websocket.Server({ port: 3006 });

let interval: NodeJS.Timeout;

let counter = 100;

wss.on("connection", socket => {
    socket.on("message", message => {

        console.log("Received message => ", message.toString());
        const jsonMessage = JSON.parse(message.toString()) as SocketRequest;
        if(!jsonMessage.type) return socket.send(JSON.stringify({ status: "error", error: "No type specified" }));

        switch(jsonMessage.type)
        {
            case "newMessage":
                handleNewMessage(jsonMessage, socket);
            break;

            case "hello":
                socket.send(JSON.stringify({ status: "success", message: "Hello, client!" }));
            break;
        }


        // socket.send("Roger that! " + message);

        // interval = setInterval(() => {
        //     if(fs.existsSync("./src/stest"))
        //     {
        //         socket.send(`Hello, client! It is currently ${new Date().toLocaleTimeString()}`);
        //     }
        // }, 1000)
    });
});

wss.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected");
})

wss.on("listening", () => {
    console.log("Listening on port 3006");
});

app.get("/randomImage", (req, res) => {
    const randomImage = Math.floor(Math.random() * 103);
    const pic = fs.readFileSync(`./src/Assets/pics/new/${randomImage}.jpg`, { encoding: "binary" });
    res.writeHead(200, { "Content-Type": "image/jpg" });
    res.end(pic, "binary");
});

app.get("/randomImage/:id", (req, res) => {
    const randomImage = req.params.id;
    const pic = fs.readFileSync(`./src/Assets/pics/new/${randomImage}.jpg`, { encoding: "binary" });
    res.writeHead(200, { "Content-Type": "image/jpg" });
    res.end(pic, "binary");
});


app.listen(3005, () =>  {
    console.log("Listening on port 3005");
});



function handleNewMessage({message}: SendMessageRequest, socket: websocket)
{
    message.status = "sent";
    message.message_id = counter++;
    message.date = Math.floor(Date.now() / 1000);
    message.verified_from_backend = true;
    socket.send(JSON.stringify(message));

}
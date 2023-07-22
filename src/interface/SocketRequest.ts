import { Message } from "./Message"

export default SocketRequest;

type SocketRequest = 
SendHelloRequest |
SendMessageRequest

export interface SendHelloRequest {
    type: "hello",
    message: string,
}

export interface SendMessageRequest {
    type: "newMessage",
    message: Message
}
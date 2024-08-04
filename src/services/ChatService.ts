import { Metadata } from "grpc-web";
import { ChatClient } from "../generated/ChatServiceClientPb";
import { SERVICE_HOST, TENANT } from "./constants";
import { ChatMessage } from "../generated/chat_pb";


var chatClient = new ChatClient(SERVICE_HOST);

const authToken = localStorage.getItem('token');
const metadata: Metadata = { 'Authorization': `Bearer ${authToken}` };

async function SendChatMessage(message: string): Promise<string> {
    var req = new ChatMessage();
    req.setMessage(message);
    req.setTenant(TENANT);
    req.setChatid("1");

    var res = await chatClient.reply(req, metadata);
    return res.getReply();
}

export { SendChatMessage }
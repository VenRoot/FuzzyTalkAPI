import { User } from "./User";

export namespace Chat
{
    interface AbstractChat {
        type: string;
        id: number;
    }
    
    
    
    // HELPERS
    /** Internal type holding properties that those chats with user names share. */
    interface UserNameChat {
        /** Username, for private chats, supergroups and channels if available */
        username?: string;
    }
    /** Internal type holding properties that those chats with titles share. */
    interface TitleChat {
        /** Title, for supergroups, channels and group chats */
        title: string;
    }
    
    export interface PrivateChat extends AbstractChat, UserNameChat {
        type: 'private';
        first_name: string;
        last_name?: string;
        user: User;
    }
    
    export interface GroupChat extends AbstractChat, TitleChat {
        type: 'group';
    }
    
    export interface SupergroupChat extends AbstractChat, TitleChat, UserNameChat {
        type: 'supergroup';
    }
}
export type PrivateChat = Chat.PrivateChat;
export type GroupChat = Chat.GroupChat;
export type SupergroupChat = Chat.SupergroupChat;


/** This object represents a chat. */
export type Chat =
  | Chat.PrivateChat
  | Chat.GroupChat
  | Chat.SupergroupChat;
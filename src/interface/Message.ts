import { Chat } from "./Chat";
import { User } from "./User";

type MsgWith<P extends keyof Message> = Record<P, NonNullable<Message[P]>>;


export default class cMessage implements Message {
  message_id: number;
  from: User;
  date: number;
  chat: Chat;
  status: "sending" | "sent" | "delivered" | "read" | "deleted" | "failed";
  text?: string;
  entities?: MessageEntity[];
  animation?: Animation;
  audio?: Audio;
  document?: Document;
  photo?: PhotoSize[];
  sticker?: Sticker;
  video?: Video;
  voice?: Voice;
  new_chat_members?: User[];
  left_chat_member?: User;
  new_chat_title?: string;
  new_chat_photo?: PhotoSize[];
  delete_chat_photo?: true;
  group_chat_created?: true;
  supergroup_chat_created?: true;

  constructor(
      message_id: number,
      from: User,
      date: number,
      chat: Chat,
      status: "sending" | "sent" | "delivered" | "read" | "deleted" | "failed",
      text?: string,
      entities?: MessageEntity[],
      animation?: Animation,
      audio?: Audio,
      document?: Document,
      photo?: PhotoSize[],
      sticker?: Sticker,
      video?: Video,
      voice?: Voice,
      new_chat_members?: User[],
      left_chat_member?: User,
      new_chat_title?: string,
      new_chat_photo?: PhotoSize[],
      delete_chat_photo?: true,
      group_chat_created?: true,
      supergroup_chat_created?: true
  ) {
      this.message_id = message_id;
      this.from = from;
      this.date = date;
      this.chat = chat;
      this.status = status;
      this.text = text;
      this.entities = entities;
      this.animation = animation;
      this.audio = audio;
      this.document = document;
      this.photo = photo;
      this.sticker = sticker;
      this.video = video;
      this.voice = voice;
      this.new_chat_members = new_chat_members;
      this.left_chat_member = left_chat_member;
      this.new_chat_title = new_chat_title;
      this.new_chat_photo = new_chat_photo;
      this.delete_chat_photo = delete_chat_photo;
      this.group_chat_created = group_chat_created;
      this.supergroup_chat_created = supergroup_chat_created;
  }
}

export namespace Message {
    interface ServiceMessage {
        message_id: number;
        from: User;
        /** Date the message was sent in Unix time */
        date: number;
        chat: Chat;
        status: "sending" | "sent" | "delivered" | "read" | "deleted" | "failed";
    }
    
    interface CommonMessage extends ServiceMessage {
        forward_from?: User;
        forward_from_chat?: Chat;
        /** Date of the message last edited in Unix time */
        edit_date?: number;
    }
    /** Captionable message. Means you can send media with caption/text in the message */
    export interface CaptionableMessage extends CommonMessage {
        caption?: string;
        caption_entities?: MessageEntity[];
    }
    export interface MediaMessage extends CaptionableMessage {
        /** The unique identifier of a media message group this message belongs to */
        media_group_id?: string;
    }

    export type TextMessage = CommonMessage & MsgWith<"text">;
    export type PhotoMessage = MediaMessage & MsgWith<"photo">;
    export type VideoMessage = MediaMessage & MsgWith<"video">;
    export type AnimationMessage = DocumentMessage & MsgWith<"animation">;
    export type DocumentMessage = CaptionableMessage & MsgWith<"document">;
    export type AudioMessage = CaptionableMessage & MsgWith<"audio">;
    export type VoiceMessage = CaptionableMessage & MsgWith<"voice">;
    export type StickerMessage = CommonMessage & MsgWith<"sticker">;

    export type NewChatMembersMessage = & ServiceMessage & MsgWith<"new_chat_members">;
    export type LeftChatMemberMessage = & ServiceMessage & MsgWith<"left_chat_member">;
    export type NewChatTitleMessage = & ServiceMessage & MsgWith<"new_chat_title">;
}


export interface Message extends Message.MediaMessage {
    text?: string;
    entities?: MessageEntity[];
    animation?: Animation;
    audio?: Audio;
    document?: Document;
    photo?: PhotoSize[];
    sticker?: Sticker;
    video?: Video;
    voice?: Voice;
    new_chat_members?: User[];
    left_chat_member?: User;
    new_chat_title?: string;
    new_chat_photo?: PhotoSize[];
    delete_chat_photo?: true;
    group_chat_created?: true;
    supergroup_chat_created?: true;
    verified_from_backend?: boolean;
}

export interface TemporaryMessage extends Message {
  requestId: string;
}

export interface MessageId {
    message_id: number;
}

export namespace MessageEntity {
    interface AbstractMessageEntity {
      /** Type of the entity. Currently, can be “mention” (@username), “hashtag” (#hashtag), “cashtag” ($USD), “bot_command” (/start@jobs_bot), “url” (https://telegram.org), “email” (do-not-reply@telegram.org), “phone_number” (+1-212-555-0123), “bold” (bold text), “italic” (italic text), “underline” (underlined text), “strikethrough” (strikethrough text), “spoiler” (spoiler message), “code” (monowidth string), “pre” (monowidth block), “text_link” (for clickable text URLs), “text_mention” (for users without usernames) */
      type: string;
      /** Offset in UTF-16 code units to the start of the entity */
      offset: number;
      /** Length of the entity in UTF-16 code units */
      length: number;
    }
    export interface CommonMessageEntity extends AbstractMessageEntity {
      type:
        | "mention"
        | "hashtag"
        | "cashtag"
        | "bot_command"
        | "url"
        | "email"
        | "phone_number"
        | "bold"
        | "italic"
        | "underline"
        | "strikethrough"
        | "spoiler"
        | "code";
    }
    export interface TextLinkMessageEntity extends AbstractMessageEntity {
      type: "text_link";
      /** For “text_link” only, url that will be opened after user taps on the text */
      url: string;
    }
    export interface TextMentionMessageEntity extends AbstractMessageEntity {
      type: "text_mention";
      /** For “text_mention” only, the mentioned user */
      user: User;
    }
    export interface PreMessageEntity extends AbstractMessageEntity {
      type: "pre";
      /** For “pre” only, the programming language of the entity text */
      language?: string;
    }
  }
  
  /** This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc. */
  export type MessageEntity =
    | MessageEntity.CommonMessageEntity
    | MessageEntity.PreMessageEntity
    | MessageEntity.TextLinkMessageEntity
    | MessageEntity.TextMentionMessageEntity;

/** This object represents one size of a photo or a file / sticker thumbnail. */
export interface PhotoSize {
    /** Identifier for this file, which can be used to download or reuse the file */
    file_id: string;
    /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
    file_unique_id: string;
    /** Photo width */
    width: number;
    /** Photo height */
    height: number;
    /** File size in bytes */
    file_size?: number;
  }
  
  /** This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound). */
  export interface Animation {
    /** Identifier for this file, which can be used to download or reuse the file */
    file_id: string;
    /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
    file_unique_id: string;
    /** Video width as defined by sender */
    width: number;
    /** Video height as defined by sender */
    height: number;
    /** Duration of the video in seconds as defined by sender */
    duration: number;
    /** Animation thumbnail as defined by sender */
    thumb?: PhotoSize;
    /** Original animation filename as defined by sender */
    file_name?: string;
    /** MIME type of the file as defined by sender */
    mime_type?: string;
    /** File size in bytes */
    file_size?: number;
  }
  
  /** This object represents an audio file to be treated as music by the Telegram clients. */
  export interface Audio {
    /** Identifier for this file, which can be used to download or reuse the file */
    file_id: string;
    /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
    file_unique_id: string;
    /** Duration of the audio in seconds as defined by sender */
    duration: number;
    /** Performer of the audio as defined by sender or by audio tags */
    performer?: string;
    /** Title of the audio as defined by sender or by audio tags */
    title?: string;
    /** Original filename as defined by sender */
    file_name?: string;
    /** MIME type of the file as defined by sender */
    mime_type?: string;
    /** File size in bytes */
    file_size?: number;
    /** Thumbnail of the album cover to which the music file belongs */
    thumb?: PhotoSize;
  }
  
  /** This object represents a general file (as opposed to photos, voice messages and audio files). */
  export interface Document {
    /** Identifier for this file, which can be used to download or reuse the file */
    file_id: string;
    /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
    file_unique_id: string;
    /** Document thumbnail as defined by sender */
    thumb?: PhotoSize;
    /** Original filename as defined by sender */
    file_name?: string;
    /** MIME type of the file as defined by sender */
    mime_type?: string;
    /** File size in bytes */
    file_size?: number;
  }
  
  /** This object represents a video file. */
  export interface Video {
    /** Identifier for this file, which can be used to download or reuse the file */
    file_id: string;
    /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
    file_unique_id: string;
    /** Video width as defined by sender */
    width: number;
    /** Video height as defined by sender */
    height: number;
    /** Duration of the video in seconds as defined by sender */
    duration: number;
    /** Video thumbnail */
    thumb?: PhotoSize;
    /** Original filename as defined by sender */
    file_name?: string;
    /** Mime type of a file as defined by sender */
    mime_type?: string;
    /** File size in bytes */
    file_size?: number;
}

/** This object represents a voice note. */
export interface Voice {
    /** Identifier for this file, which can be used to download or reuse the file */
    file_id: string;
    /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
    file_unique_id: string;
    /** Duration of the audio in seconds as defined by sender */
    duration: number;
    /** MIME type of the file as defined by sender */
    mime_type?: string;
    /** File size in bytes */
    file_size?: number;
}

/** This object represents a sticker. */
export interface Sticker {
    /** Identifier for this file, which can be used to download or reuse the file */
    file_id: string;
    /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
    file_unique_id: string;
    /** Sticker width */
    width: number;
    /** Sticker height */
    height: number;
    /** True, if the sticker is animated */
    is_animated: boolean;
    /** True, if the sticker is a video sticker */
    is_video: boolean;
    /** Sticker thumbnail in the .WEBP or .JPG format */
    thumb?: PhotoSize;
    /** Emoji associated with the sticker */
    emoji?: string;
    /** Name of the sticker set to which the sticker belongs */
    set_name?: string;
    /** For mask stickers, the position where the mask should be placed */
    mask_position?: MaskPosition;
    /** File size in bytes */
    file_size?: number;
}

/** This object describes the position on faces where a mask should be placed by default. */
export interface MaskPosition {
    /** The part of the face relative to which the mask should be placed. One of “forehead”, “eyes”, “mouth”, or “chin”. */
    point: "forehead" | "eyes" | "mouth" | "chin";
    /** Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position. */
    x_shift: number;
    /** Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position. */
    y_shift: number;
    /** Mask scaling coefficient. For example, 2.0 means double size. */
    scale: number;
}


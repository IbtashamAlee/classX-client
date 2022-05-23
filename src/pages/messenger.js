import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {useState} from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Search,
  ConversationList,
  Avatar,
  Conversation,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  EllipsisButton,
  TypingIndicator,
  MessageSeparator
} from "@chatscope/chat-ui-kit-react";
import placeholder from '../Sample_User_Icon.png'
import {Header} from '../components/header'
export default function Messenger() {
  const [messageInputValue, setMessageInputValue] = useState("");

  return (
    <div className="">
      <Header/>
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." />
          <ConversationList>
            <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
              <Avatar src={placeholder} name="Lilly" st="available" />
            </Conversation>

            <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
              <Avatar src={placeholder} name="Joe" st="dnd" />
            </Conversation>

            <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you">
              <Avatar src={placeholder} name="Emily" />
            </Conversation>

            <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you">
              <Avatar src={placeholder} name="Kai" st="unavailable" />
            </Conversation>

            <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you">
              <Avatar src={placeholder} name="Akane" st="eager" />
            </Conversation>

            <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you">
              <Avatar src={placeholder} name="Eliot" st="away" />
            </Conversation>

            <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you">
              <Avatar src={placeholder} name="Zoe" st="dnd" />
            </Conversation>

            <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
              <Avatar src={placeholder} name="Patrik" st="invisible" />
            </Conversation>
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={placeholder} name="Zoe" />
            <ConversationHeader.Content userName="Zoe" info="Active 10 mins ago" />

          </ConversationHeader>
          <MessageList>
            <MessageSeparator content="Saturday, 30 November 2019" />
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "single"
            }}>
              <Avatar src={placeholder} name="Zoe" />
            </Message>
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Patrik",
              direction: "outgoing",
              position: "single"
            }} avatarSpacer />
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "first"
            }} avatarSpacer />
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "normal"
            }} avatarSpacer />
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "normal"
            }} avatarSpacer />
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "last"
            }}>
              <Avatar src={placeholder} name="Zoe" />
            </Message>
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Patrik",
              direction: "outgoing",
              position: "first"
            }} />
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Patrik",
              direction: "outgoing",
              position: "normal"
            }} />
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Patrik",
              direction: "outgoing",
              position: "normal"
            }} />
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Patrik",
              direction: "outgoing",
              position: "last"
            }} />

            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "first"
            }} avatarSpacer />
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "last"
            }}>
              <Avatar src={placeholder} name="Zoe" />
            </Message>
          </MessageList>
          <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} />
        </ChatContainer>
      </MainContainer>
    </div>
  )}
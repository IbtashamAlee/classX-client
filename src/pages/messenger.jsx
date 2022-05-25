import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {useState,useEffect} from "react";
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
  MessageSeparator
} from "@chatscope/chat-ui-kit-react";
import placeholder from '../Sample_User_Icon.png'
import {Header} from '../components/header'
import {IconButton} from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
export default function Messenger() {

  const [selectedUser,setSelectedUser] = useState(null)
  const [conversations,setConversations] = useState([
    {
      "chatId": 1,
      "userName": {
        "id": 2,
        "chatId": 1,
        "participantId": 1,
        "removedAt": null,
        "user": {
          "name": "admin",
          "imageUrl": null
        }
      },
      "lastMessage": "latest message"
    },
    {
      "chatId": 2,
      "userName": {
        "id": 2,
        "chatId": 1,
        "participantId": 1,
        "removedAt": null,
        "user": {
          "name": "ibtasham",
          "imageUrl": null
        }
      },
      "lastMessage": "hello There"
    },
    {
      "chatId": 2,
      "userName": {
        "id": 2,
        "chatId": 1,
        "participantId": 1,
        "removedAt": null,
        "user": {
          "name": "faseeh",
          "imageUrl": null
        }
      },
      "lastMessage": "hello There"
    }
  ])

  const [messages,setMessages] = useState([
    {
      message: "Hello my friend",
      direction: "incoming",
      position: "single",
      time: "May 12,22 12:04"
    },
    {
      message: "Hello my friend",
      direction: "incoming",
      position: "single",
      time: "May 12,22 12:04"
    },
    {
      message: "Hello my friend",
      direction: "incoming",
      position: "single",
      time: "May 12,22 12:04"
    }
  ])
  const [messageInputValue, setMessageInputValue] = useState("");

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
      <Header style={{flex:1}}/>
      <MainContainer responsive style={{flex:9,height:'80vh'}}>
        <Sidebar position="left" scrollable={false}>
          <div className="flex flex-row-reverse">
          <IconButton variant="contained" style={{margin:"2px 10px 0 10px"}}>
            <AddCommentIcon/>
          </IconButton>
          <Search placeholder="Search..." />
          </div>
          <ConversationList style={{minHeight:"80vh"}}>
            { conversations &&
              conversations.map(c => {
                return (
                  <Conversation key={c.chatId} name={c.userName.user.name} info={c.lastMessage} onClick={()=>{
                    setSelectedUser(c)
                  }}>
                    <Avatar src={c.userName.user.imageUrl?? `https://picsum.photos/${Math.floor(Math.random()*200)}`} name={c.userName.user.name} />
                  </Conversation>
                )
              })
            }

          </ConversationList>
        </Sidebar>
        {
          !selectedUser &&
          <div className="flex justify-center items-center min-h-80vh w-full">
            <h1 className="font-semibold">Select a Chat to continue Chatting</h1>
          </div>
        }
        {selectedUser &&
          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back/>
              <Avatar
                src={selectedUser.userName.user.imageUrl ?? `https://picsum.photos/${Math.floor(Math.random() * 200)}`}
                name="Zoe"/>
              <ConversationHeader.Content userName={selectedUser.userName.user.name}/>

            </ConversationHeader>
            <MessageList style={{
              minHeight: '80vh',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              {
                messages.map(m => {
                  return (
                    <Message style={{marginTop: "1rem"}} model={{
                      message: m.message,
                      direction: m.direction,
                      position: m.position
                    }}>
                      <Message.Footer sentTime={m.time}/>
                    </Message>
                  )
                })
              }
            </MessageList>
            <MessageInput placeholder="Type message here" value={messageInputValue}
                          onChange={val => setMessageInputValue(val)} onSend={() => {
              setMessages([...messages, {
                message: `${messageInputValue}`,
                direction: "outgoing",
                position: "single",
                time: "May 12,22 12:04"
              }])
              setMessageInputValue("")
            }}/>
          </ChatContainer>
        }
      </MainContainer>
    </div>
  )}
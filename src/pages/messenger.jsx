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
import Api from "../generic-services/api";
import {useSelector} from "react-redux";
export default function Messenger() {

  const [selectedUser,setSelectedUser] = useState(null)
  const [conversations,setConversations] = useState([])

  const [messages,setMessages] = useState([])
  const [messageInputValue, setMessageInputValue] = useState("");
  const [files, setFiles] = useState([]);

  let user = useSelector((state => state.user.user))

  function getChats() {
    Api.execute("/chat/conversations", "get").then((res) => {
      console.log(res);
      setConversations(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  function getMessages() {
    if(selectedUser === null) return;
    Api.execute("/chat/" + selectedUser.chatId, "get").then((res) => {
      console.log(res);
      setMessages(res.data.chatmessage);
    }).catch(err => {
      console.log(err);
    })
  }

  function sendMessage() {
    if(selectedUser === null) return;
    Api.execute("/chat/" + selectedUser.chatId + "/message", "post", {
      message: messageInputValue,
      files: files
    }).then((res) => {
      console.log(res);
      getMessages();
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getMessages();
  }, [selectedUser]);

  useEffect(() => {
    getChats();
  }, [])

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
                    setSelectedUser(c);
                  }}>
                    <Avatar src={c.userName.user.imageUrl ?? placeholder} name={c.userName.user.name} />
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
                src={selectedUser.userName.user.imageUrl ?? placeholder}
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
                      message: m.body,
                      direction: (user && user.id && m.senderId == user.id) ? 'outgoing':"incoming",
                      //     () => {
                      //   if (user && user.id && m.senderId == user.id) {
                      //     return "outgoing"
                      //   } else {
                      //     return "incoming"
                      //   }
                      // },
                      position: m.position
                    }}>
                      <Message.Footer sentTime={m.time}/>
                    </Message>
                  )
                })
              }
            </MessageList>
            <MessageInput
                placeholder="Type message here" value={messageInputValue}
                onChange={val => setMessageInputValue(val)}
                onSend={() => {
                  sendMessage();
                  setMessageInputValue("")
                  }
                }
            />
          </ChatContainer>
        }
      </MainContainer>
    </div>
  )}

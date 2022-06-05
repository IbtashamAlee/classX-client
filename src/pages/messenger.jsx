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
  ConversationHeader
} from "@chatscope/chat-ui-kit-react";
import placeholder from '../Sample_User_Icon.png'
import {Header} from '../components/header'
import {IconButton} from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import Api from "../generic-services/api";
import {useSelector} from "react-redux";
import {CreateChat} from "../components/create-chat";
export default function Messenger() {

  const [selectedUser,setSelectedUser] = useState(null)
  const [conversations,setConversations] = useState([])
  const [query,setQuery] = useState('')
  const [messages,setMessages] = useState([])
  const [messageInputValue, setMessageInputValue] = useState("");
  const [files, setFiles] = useState([]);

  let user = useSelector((state => state.user.user));
  let interval;

  function getChats() {
    Api.execute("/chat/conversations?search="+query, "get", {}, false).then((res) => {
      setConversations(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  function getMessages() {
    if(selectedUser === null) return;
    Api.execute("/chat/" + selectedUser.chatId, "get", {}, false).then((res) => {
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
    }, false).then((res) => {
      console.log(res);
      getMessages();
    }).catch(err => {
      console.log(err);
    })
  }



  useEffect(() => {
    interval = setInterval(function () {
      getChats();
      getMessages();
    }, 2000);
    return () => {
      clearInterval(interval);
    }
  }, [selectedUser,query]);

  useEffect(() => {
    getChats();
  }, [])

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
      <Header style={{flex:1}}/>
      <MainContainer responsive style={{flex:9,height:'80vh'}}>
        <Sidebar position="left" scrollable={false}>
          <div className="flex flex-row-reverse items-center">
          <CreateChat/>
          <Search placeholder="Search..." onChange={(e)=>setQuery(e)}/>
          </div>
          <ConversationList style={{minHeight:"80vh"}}>
            { conversations &&
              conversations.filter(con=>con.userName !== undefined).map(c => {
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
            {conversations.length<1 ? <h1 className="font-semibold">No chats to Display</h1> : <h1 className="font-semibold">Select a Chat to continue Chatting</h1>}
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
                messages.map((m,k) => {
                  return (
                    <Message key={k} style={{marginTop: "1rem"}} model={{
                      message: m.body,
                      direction: (user && user.id && m.senderId == user.id) ? 'outgoing':"incoming",
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
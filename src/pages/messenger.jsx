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
import Api from "../generic-services/api";
import {useSelector} from "react-redux";
import {CreateChat} from "../components/create-chat";
import useWindowDimensions from "../hooks/useWindowDimensions";
export default function Messenger() {

  const [selectedUser,setSelectedUser] = useState(null)
  const [conversations,setConversations] = useState([])
  const [query,setQuery] = useState('')
  const [messages,setMessages] = useState([])
  const [messageInputValue, setMessageInputValue] = useState("");
  const [files, setFiles] = useState([]);
  const {width,height} = useWindowDimensions();
  const [showConversations,setShowConversations] = useState(width<768);
  let user = useSelector((state => state.user.user));
  let interval;

  function getChats() {
    Api.execute("/api/chat/conversations?search="+query, "get", {}, false).then((res) => {
      console.log(res.data)
      setConversations(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  function getMessages() {
    if(selectedUser === null) return;
    Api.execute("/api/chat/" + selectedUser.chatId, "get", {}, false).then((res) => {
      console.log(res);
      setMessages(res.data.chatmessage);
    }).catch(err => {
      console.log(err);
    })
  }

  function sendMessage() {
    if(selectedUser === null) return;
    Api.execute("/api/chat/" + selectedUser.chatId + "/message", "post", {
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
    <div>
      <Header/>
      {
        showConversations && width < 768 &&
        <Sidebar position="left" scrollable={false}>
          <div className="flex flex-row-reverse justify-end ml-2 mt-2 items-center">
            <CreateChat/>
            <Search placeholder="Search..." onChange={(e)=>setQuery(e)} className="max-h-10"/>
          </div>
          <ConversationList style={{minHeight:"80vh"}}>
            { conversations &&
            conversations.filter(con=>con.userName !== undefined).map(c => {
              console.log(c.unreadMessages)
              return (
                <Conversation key={c.chatId} name={c.userName.user.name} unreadCnt={c?.userName?.unreadMessages} info={c.lastMessage} onClick={()=>{
                  setSelectedUser(c);
                  setShowConversations(false)
                }}>
                  <Avatar src={c.userName.user.imageUrl ?? placeholder} name={c.userName.user.name} />
                </Conversation>
              )
            })
            }

          </ConversationList>
        </Sidebar>
      }
      { (!showConversations || (showConversations && width>768)) &&
        <MainContainer responsive>
        <Sidebar position="left" scrollable={false} className="!hidden md:!block">
          <div className="flex flex-row-reverse items-center">
          <CreateChat/>
          <Search placeholder="Search..." onChange={(e)=>setQuery(e)}/>
          </div>
          <ConversationList style={{minHeight:"80vh"}}>
            { conversations &&
              conversations.filter(con=>con.userName !== undefined).map(c => {
                console.log(c.unreadMessages)
                return (
                  <Conversation key={c.chatId} name={c.userName.user.name} unreadCnt={c?.userName?.unreadMessages} info={c.lastMessage} onClick={()=>{
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
          // set height here
          <ChatContainer className="!flex !flex-col !justify-between !min-h-[94vh]">
            <ConversationHeader>
              <ConversationHeader.Back className="!block md:!hidden" onClick={()=>setShowConversations(true)}/>
              <Avatar
                src={selectedUser.userName.user.imageUrl ?? placeholder}
                name="Zoe"/>
              <ConversationHeader.Content userName={selectedUser.userName.user.name}/>

            </ConversationHeader>
            <MessageList style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              overflow:'show',
              marginBottom:'10px'

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
              <MessageInput
                placeholder="Type message here" value={messageInputValue}
                onChange={val => setMessageInputValue(val)}
                onSend={() => {
                  sendMessage();
                  setMessageInputValue("")
                }
                }

              />
            </MessageList>

          </ChatContainer>
        }
      </MainContainer>
      }
    </div>
  )}

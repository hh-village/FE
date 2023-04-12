import { Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { ChatBody, ChatInput, Chatting, MessageRoom, Room, TargetRoom } from "../components/chat/chatStyle";
import { Div, FlexDiv, MaxWidthDiv } from "../components/global/globalStyle";
import HeaderNav from "../components/global/HeaderNav";
import { __getChatList } from "../redux/modules/Chat";
import { getCookie } from "../shared/Cookies";

var stompClient = null;

const Chat = () => {
    const dispatch = useDispatch();
    const { wholeGet } = useSelector(state => state.Chat)
    const {id} = useParams();
    const [roomId, setRoomId] = useState(id);
    const [chatList, setChatList] = useState([])
    const [userData, setUserData] = useState({
            roomId: '',
            sender: '',
            content: '',
        });

    const registUsers = () => {
        const sockJS = new SockJS(`${process.env.REACT_APP_SERVER_URL}/ws`);
        stompClient = Stomp.over(function() {
            return sockJS;
          });
        stompClient.connect({},onConnected,onError)
    }

    const onConnected = async () => {
        await stompClient.subscribe(`/sub/chat/room/${roomId}`,onMessage)
    }

    const onMessage = (chatMessage) => {
        let payloadData = JSON.parse(chatMessage.body);
        setChatList([...chatList, payloadData])
    }

    const onError = (err) => {
        console.log(err)
    }

    

    const onClickOtherChats = (id) => {
        setRoomId(id)
        dispatch(__getChatList(id))
        setUserData({
            sender : '',
            roomId : '',
            content : '',
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        sendChat();
    }

    const sendChat = () => {
        stompClient.send(
            `/pub/chat/message`,
            {},
            JSON.stringify(userData)
        )
        setUserData({
            sender : '',
            roomId : '',
            content : '',
        })
    }

    const chattingOnchange = (event) => {
        const { value } = event.target;
        setUserData({
            sender : getCookie('nickname'),
            roomId : roomId,
            content : value
        })
    }
    useEffect(() => {
        dispatch(__getChatList(roomId))
    },[dispatch, roomId])

    useEffect(()=>{
        registUsers();
    })
    console.log(chatList)

    return (
        <FlexDiv>
            <HeaderNav/>
            <MaxWidthDiv>
                <MessageRoom>
                {wholeGet.roomList?.map((item => {
                    return (item.target 
                    ? (
                        <TargetRoom>
                            {item.roomId}
                        </TargetRoom>
                    )
                    : (
                        <Room onClick = {() => onClickOtherChats(item.roomId)}>
                            {item.roomId}
                        </Room>
                    ))
                }))}
                </MessageRoom>
                <ChatBody>
                    <Chatting>
                        {chatList?.map((item)=>{
                            return (
                                <div>
                                    {item.content}
                                </div>
                            )
                        })}
                    </Chatting>
                    <form onSubmit={onSubmitHandler}>
                        <ChatInput 
                        onChange={chattingOnchange}
                        value = {userData.content}/>
                    </form>
                </ChatBody>
            </MaxWidthDiv>
            
        </FlexDiv>
    )
} 

export default Chat;
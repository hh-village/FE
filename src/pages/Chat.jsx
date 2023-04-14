import { nanoid } from "@reduxjs/toolkit";
import { Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import {  useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { ChatBody, ChatInput, Chatting, MessageRoom, Room, TargetRoom } from "../components/chat/chatStyle";
import { FlexDiv, MaxWidthDiv } from "../components/global/globalStyle";
import HeaderNav from "../components/global/HeaderNav";
import { __getChatList } from "../redux/modules/Chat";
import { getCookie } from "../shared/Cookies";

var stompClient = null;

const Chat = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [roomId, setRoomId] = useState(id);
    const [chatList, setChatList] = useState([])
    const [roomList, setRoomList] = useState([])
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
        stompClient.connect({}, afterConnected,
            (err) => {
                alert(err)
            })
    }

    const afterConnected = async() => {
        const response =  await dispatch(__getChatList(roomId)).unwrap();
        setRoomList([...response.roomList])
        // setChatList(prev => [...prev])
        if(response){
            stompClient.subscribe(`/sub/chat/room/${roomId}`,
            (message)=>{
                console.log('--------------')
                const payloadData = JSON.parse(message.body);
                console.log(payloadData)
                return setChatList(prev => [...prev,payloadData])
            });
        }
        setChatList([...response.messageList])
    }

    const onClickOtherChats = (id) => {
        stompClient.disconnect();
        setUserData((prev)=>(prev = {
            sender : '',
            roomId : '',
            content : '',
        }))
        setRoomId(prev => prev = id)
        setChatList(prev => prev = [])
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
        setUserData((prev)=>(prev = {
            sender : '',
            roomId : '',
            content : '',
        }))
    }

    const chattingOnchange = (event) => {
        const { value } = event.target;
        setUserData({
            sender : getCookie('nickname'),
            roomId : roomId,
            content : value
        })
    }

    const scrollToBottom = () => {
		window.scrollTo(0, document.body.scrollHeight);
	};

    useEffect(()=>{
        registUsers();
    },[roomId])

    useEffect(()=>{
        scrollToBottom()
    },[chatList])

    return (
        <FlexDiv>
            <HeaderNav/>
            <MaxWidthDiv>
                <MessageRoom>
                {roomList.map((item => {
                    return (item.target 
                    ? (
                        <TargetRoom key={nanoid()}>
                            {item.roomId}
                        </TargetRoom>
                    )
                    : (
                        <Room 
                        key={nanoid()}
                        onClick = {() => onClickOtherChats(item.roomId)}>
                            {item.roomId}
                        </Room>
                    ))
                }))}
                </MessageRoom>
                <ChatBody>
                    <Chatting>
                        {chatList?.map((item)=>{
                            return (
                                <div key={nanoid()}>
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
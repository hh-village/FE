import { nanoid } from "@reduxjs/toolkit";
import { Stomp } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {  useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { ChatBody, ChatInput, Chatting, ChatWholeBody, MessageRoom, MychatBubble, NickName, OtherchatBubble, Room, RoomProfile, RoomTitle, TargetRoom } from "../components/chat/chatStyle";
import { FlexDiv, MaxWidthDiv } from "../components/global/globalStyle";
import HeaderNav from "../components/global/HeaderNav";
import { __getChatList } from "../redux/modules/Chat";
import { getCookie } from "../shared/Cookies";

var stompClient = null;

const Chat = () => {
    const scrollRef = useRef();
    const myNick = getCookie('nickname')
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

    useEffect(()=>{
        registUsers();
    },[roomId])

    useEffect(()=>{
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    },[chatList])

    return (
        <FlexDiv>
            <HeaderNav/>
            <MaxWidthDiv fDirection ='row' jc = 'space-between'>
                <MessageRoom>
                    <RoomTitle> 전체대화 </RoomTitle>
                    {roomList.map((item => {
                        return (item.target 
                        ? (
                            <>
                                <TargetRoom key={nanoid()}>
                                    <RoomProfile src={item.profile}/>
                                    <NickName>{item.nickname}</NickName>
                                </TargetRoom>
                            </>
                            
                        )
                        : (
                            <>
                                <Room key={nanoid()}
                                onClick = {() => onClickOtherChats(item.roomId)}>
                                    <RoomProfile src={item.profile}/>
                                    <NickName>{item.nickname}</NickName>
                                </Room>
                            </>
                            
                        ))
                    }))}
                </MessageRoom>
                <ChatWholeBody>
                    <ChatBody ref = {scrollRef}>
                            {chatList?.map((item)=>{
                                return (
                                    (myNick === item.sender ? (
                                        (
                                            <MychatBubble>{item.content}</MychatBubble>
                                            
                                        )
                                    ) : (
                                        <div key={nanoid()}
                                        style={{display:"flex", justifyContent:'flex-end'}}>
                                            <OtherchatBubble>{item.content}</OtherchatBubble>
                                        </div>
                                    )
                                    )
                                )     
                            })}
                    </ChatBody>
                    <form onSubmit={onSubmitHandler}>
                        <ChatInput 
                        placeholder="메세지를 입력하세요"
                        onChange={chattingOnchange}
                        value = {userData.content}/>
                    </form>
                </ChatWholeBody>
            </MaxWidthDiv>
        </FlexDiv>
    )
} 

export default Chat;
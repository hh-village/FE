import { nanoid } from "@reduxjs/toolkit";
import { Stomp } from "@stomp/stompjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { ChatBody, ChatInput, ChatWholeBody, MessageRoom, MychatBubble, NickName, OtherchatBubble, Room, RoomProfile, RoomTitle, TargetRoom } from "../components/chat/chatStyle";
import Footer from "../components/global/Footer";
import { Div, FlexDiv, MaxWidthDiv } from "../components/global/globalStyle";
import HeaderNav from "../components/global/HeaderNav";
import { getCookie } from "../shared/Cookies";

var stompClient = null;

const Chat = () => {
    const scrollRef = useRef();
    const accessToken = getCookie('token')
    const myNick = getCookie('nickname')
    const {id} = useParams();
    const [last, setLast] = useState('');
    const [roomId, setRoomId] = useState(id);
    const [chatList, setChatList] = useState([])
    const [roomList, setRoomList] = useState([])
    const [userData, setUserData] = useState({
        roomId: '',
        sender: '',
        content: '',
    });
    
    const GetChats = useQuery({
        queryKey:['GetChats'],
        queryFn : async() => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/chat/room?roomId=${roomId}`,{
                headers:{
                    Authorization : `Bearer ${accessToken}`
                }
            })
            return response.data.data
        },
        onSuccess : (response) =>{
            setRoomList([...response.roomList])
            if(response){
                stompClient.subscribe(`/sub/chat/room/${roomId}`,
                (message)=>{
                    const payloadData = JSON.parse(message.body);
                    setLast(payloadData.content)
                    return setChatList(prev => [...prev,payloadData])
                });
            }
            setChatList([...response.messageList])
        }
    })
    const registUsers = () => {
        const sockJS = new SockJS(`${process.env.REACT_APP_SERVER_URL}/ws`);
        stompClient = Stomp.over(function() {
            return sockJS;
            });
        stompClient.connect({}, () => GetChats.refetch())
        }

    const onClickOtherChats = (id) => {
        setLast();
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
            JSON.stringify(userData),
            setLast(userData.content)
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
        <FlexDiv bgColor='#ededed' boxShadow="none">
            <HeaderNav/>
            <MaxWidthDiv fDirection ='row' jc = 'space-between' bgColor = 'white'>
                <MessageRoom>
                    <RoomTitle> 전체대화 </RoomTitle>
                    <Div>
                        {roomList.map((item => {
                            return (item.target 
                            ? (
                                <>
                                    <TargetRoom key={nanoid()}>
                                        <RoomProfile src={item.profile}/>
                                        <div style={{display:"flex", flexDirection : 'column', gap:'0.5rem'}}>
                                            <NickName>{item.nickname}</NickName>
                                        <div
                                            style={{width:'450px', overflow:"hidden", wordBreak: 'keep-all'}}
                                            >{last ? (last) : (item.lastMessage)}
                                        </div>
                                        </div>
                                    </TargetRoom>
                                </>
                                
                            )
                            : (
                                <>
                                    <Room key={nanoid()}
                                        onClick = {() => onClickOtherChats(item.roomId)}>
                                        <RoomProfile src={item.profile}/>
                                        <div style={{display:"flex", flexDirection : 'column', gap:'0.5rem'}}>
                                            <NickName>{item.nickname}</NickName>
                                            {item.lastMessage}
                                        </div>
                                    </Room>
                                </>
                                
                            ))
                        }))}
                    </Div>
                </MessageRoom>
                <ChatWholeBody>
                    <ChatBody ref = {scrollRef}>
                            {chatList?.map((item)=>{
                                return (
                                    (myNick === item.sender ? (
                                        (
                                        <div key={nanoid()}
                                        style={{display:"flex", justifyContent:'flex-end'}}>
                                            <MychatBubble>{item.content}</MychatBubble>
                                        </div>
                                        )
                                    ) : (
                                        <OtherchatBubble>{item.content}</OtherchatBubble>
                                    )
                                    )
                                )     
                            })}
                    </ChatBody>
                    <form onSubmit={onSubmitHandler}
                    style={{display:"flex", justifyContent:'center'}}>
                        <ChatInput 
                        placeholder="메세지를 입력하세요"
                        onChange={chattingOnchange}
                        value = {userData.content}/>
                    </form>
                </ChatWholeBody>
            </MaxWidthDiv>
            <Footer topRem={0} botRem={0}/>
        </FlexDiv>
    )
} 

export default Chat;
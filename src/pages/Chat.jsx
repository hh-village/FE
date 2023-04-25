import { nanoid } from "@reduxjs/toolkit";
import { Stomp } from "@stomp/stompjs";
import { isError, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { ChatBody, ChatInput, ChatTime, ChatWholeBody, MessageRoom, MychatBubble, NickName, OtherchatBubble, Room, RoomProfile, RoomTitle, TargetRoom } from "../components/chat/chatStyle";
import Footer from "../components/global/Footer";
import { Div, FlexDiv, MaxWidthDiv } from "../components/global/globalStyle";
import HeaderNav from "../components/global/HeaderNav";
import Loading from "../components/global/Loading";
import { getCookie } from "../shared/Cookies";

var stompClient = null;

const Chat = () => {
    const scrollRef = useRef();
    const accessToken = getCookie('token')
    const myNick = getCookie('nickname')
    const {id} = useParams();
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
                    return setChatList(prev => [...prev,payloadData])
                });
            }
            setChatList([...response.messageList])
        },
    })

    const DeleteRoom = useMutation({
        mutationKey : ['DeleteRoom'],
        mutationFn : async(payload) => {
            if (payload === id){
                window.alert('입장한 방은 삭제할 수 없습니다. 최초 입장하지 않은 다른 방들을 삭제해주세요!')
                return;
            }else{
                const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/chat/room/${payload}`)
                return response
            }
        },
        onSuccess : (response) => {
            window.alert(response.data.message)
            window.location.reload();
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
                                            <div
                                            style={{width:'450px', overflow:"hidden", wordBreak: 'keep-all'}}
                                            >
                                            {item.lastMessage ? item.lastMessage : '새로운 메세지를 보내보세요!'}
                                            </div>
                                        </div>
                                        <button
                                            onClick={()=>{
                                                DeleteRoom.mutate(item.roomId)
                                            }}
                                        >삭제</button>
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
                                            <ChatTime theme={'mychat'}>{item.createdAt}</ChatTime>
                                            <MychatBubble>{item.content}</MychatBubble>
                                            
                                        </div>
                                        )
                                    ) : (
                                        <div style={{display:"flex"}}>
                                            <OtherchatBubble>{item.content}</OtherchatBubble>
                                            <ChatTime theme={'otherchat'}>{item.createdAt}</ChatTime>
                                        </div>  
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
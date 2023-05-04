import { nanoid } from "@reduxjs/toolkit";
import { Stomp } from "@stomp/stompjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { ChatBody, ChatInput, ChatTime, ChatWholeBody, MessageRoom, MychatBubble, NickName, OtherchatBubble, Room, RoomProfile, RoomTitle, TargetRoom, ChatDeleteBtn, Wrapper} from "../components/chat/chatStyle";
import VillageHeader from "../components/chat/VillageHeader";
import Footer from "../components/global/Footer";
import { Div, FlexDiv, MaxWidthDiv } from "../components/global/globalStyle";
import HeaderNav from "../components/global/HeaderNav";
import { getCookie } from "../shared/Cookies";
var stompClient = null;

const Chat = () => {
    const scrollRef = useRef();
    const navigate = useNavigate();
    const accessToken = getCookie('token')
    const myNick = getCookie('nickname')
    const [roomId, setRoomId] = useState(
        localStorage.getItem('roomId')
    );
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
            if(!roomId){
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/chat/room?`,{
                    headers:{
                        Authorization : `Bearer ${accessToken}`
                    }
                })
                return response.data.data
            }else{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/chat/room?roomId=${roomId}`,{
                    headers:{
                        Authorization : `Bearer ${accessToken}`
                    }
                })
                return response.data.data
            }
        },
        onSuccess : (response) =>{
            localStorage.removeItem('roomId')
            if(response === null){
                alert('대화중인 채팅방이 없습니다')
                return navigate('/')
            }
            if(!roomId){
                setRoomId(response.roomList.filter(item => item.target === true)[0].roomId)
            }
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
            return await axios.delete(`${process.env.REACT_APP_SERVER_URL}/chat/room/${payload}`)
        },
        onSuccess : (response) => {
            window.alert('채팅방이 성공적으로 삭제되었습니다.')
            window.location.reload();
        }
    })

    const registUsers = () => {
        const sockJS = new SockJS(`${process.env.REACT_APP_SERVER_URL}/ws`);
        stompClient = Stomp.over(function() {
            return sockJS;
        });
        stompClient.debug = function(str) {};
        stompClient.connect({}, () => {
            GetChats.refetch();
        })
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

    useEffect(()=>{
        if(!accessToken){
            navigate('/login')
        }
    })

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
                                        <Wrapper>
                                            <RoomProfile src={item.profile}  alt=''/>
                                            <div style={{display:"flex", flexDirection : 'column', gap:'0.5rem'}}>
                                                <NickName>{item.nickname}</NickName>
                                                
                                            </div>
                                        </Wrapper>
                                        <ChatDeleteBtn
                                            onClick={()=>{
                                                if(window.confirm('채팅방을 정말로 나가시겠습니까?')){
                                                    return DeleteRoom.mutate(item.roomId)
                                                }
                                            }}>
                                            삭제
                                        </ChatDeleteBtn>
                                    </TargetRoom>
                                </>
                            )
                            : (
                                <>
                                    <Room key={nanoid()}
                                        onClick = {() => onClickOtherChats(item.roomId)}>
                                        <Wrapper>
                                            <RoomProfile src={item.profile} alt=''/>
                                            <div style={{display:"flex", flexDirection : 'column', gap:'0.5rem'}}>
                                                <NickName>{item.nickname}</NickName>
                                                <div style={{width:'200px',height:'100%', overflow:"hidden", wordBreak: 'keep-all',whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                                                    {item.lastMessage ? item.lastMessage : '새로운 메세지를 보내보세요!'}
                                                </div>
                                            </div>
                                        </Wrapper>
                                        <ChatDeleteBtn
                                            onClick={()=>{
                                                if(window.confirm('채팅방이 정말로 나가시겠습니까?')){
                                                    return DeleteRoom.mutate(item.roomId)
                                                }
                                            }}>
                                            삭제
                                        </ChatDeleteBtn>
                                    </Room>
                                </>
                                
                            ))
                        }))}
                    </Div>
                </MessageRoom>
                <ChatWholeBody>
                    <ChatBody ref = {scrollRef}>
                        <VillageHeader/>
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
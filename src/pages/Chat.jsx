import { Stomp } from "@stomp/stompjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queries } from "@testing-library/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Div, FlexDiv, MaxWidthDiv } from "../components/global/globalStyle";
import HeaderNav from "../components/global/HeaderNav";
import { __getChatList } from "../redux/modules/Chat";
import { getCookie } from "../shared/Cookies";

const Chat = () => {
    // const registUsers = () => {
    //     const sockJS = new SockJS(process.env.REACT_APP_SERVER_URL+'/ws');
    //     stompClient = Stomp.over(sockJS);
    //     stompClient.connect({},
    //         ()=>{
    //             stompClient.subscribe(`/sub/chat/room/${roomId}`,messageRecieved)
    //         })
    // }
    const dispatch = useDispatch();
    const {wholeGet} = useSelector(state => state.Chat)
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const accessToken = getCookie('token')
    let {id : roomId} = useParams();
    console.log(wholeGet)
    // const getChatList = useQuery({
    //     queryKey:["getChatList"],
    //     queryFn: async()=>{
    //         const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/chat/room/${roomId}`,{
    //             headers:{
    //                 Authorization : `Bearer ${accessToken}`
    //             },
    //         })
    //         console.log(roomId)
    //         return response.data.data
    //     }
    // },{
    //     refetchOnWindowFocus: false,
    //     retry:3,
    // })
    
    // if(getChatList.isLoading){
    //     return(
    //         <div>
    //             로딩중
    //         </div>
    //     )
    // }
    useEffect(() => {
        dispatch(__getChatList(roomId))
    },[dispatch, roomId])

    const onClickOtherChats = (id) => {
        dispatch(__getChatList(id))
    }

    return (
        <FlexDiv>
            <HeaderNav/>
            <MaxWidthDiv>
                <Div padding="8rem 0 2rem 0" width="100%" height="100%" gap="2rem">
                {wholeGet.roomList?.map((item => {
                    return (
                    <div key={item.roomId}
                    onClick = {() => onClickOtherChats(item.roomId)}
                    >
                        {item.roomId}
                    </div>
                    )
                }))}
                </Div>
            </MaxWidthDiv>
            
        </FlexDiv>
    )
} 

export default Chat;
import styled from "styled-components";

export const MessageRoom = styled.div`
    display : flex;
    margin-top : 6em;
    flex-direction : column;
    width:100vmax;
    height: calc(100vh - 23em);
    border-right : 1px solid #ededed;
`
export const ChatWholeBody = styled.div`
    margin-top : 6em;
    width:100vmax;
    height: calc(100vh - 23em);
`
export const ChatBody = styled.div`
    width:100%;
    height: calc(100vh - 29.5em);
    display : flex;
    gap : 10px;
    padding-top : 20px;
    flex-direction : column;
    overflow: auto;
    &::-webkit-scrollbar{
        display: none;
    }
`
export const ChatInput = styled.input`
    width:494px;
    height: 45px;
    border-radius:20px;
    border:none;
    border : 1px solid gray;
    text-indent : 1em;
    font-size : 15px;
    margin: 20px 16px 20px 16px;
`
export const TargetRoom = styled.div`
    display: flex;
    align-items : center;
    height: 105px;
    width : 100%;
    background-color : #EEEBFF;
    cursor : pointer;
`

export const Room = styled.div`
    display: flex;
    align-items : center;
    height: 105px;
    width : 100%;
    cursor : pointer;
    :hover{
        background-color : #EEEBFF;
    }
`
export const RoomTitle = styled.div`
    font-size : 32px;
    font-weight : 600;
    margin: 100px 0 37px 24px;
`
export const RoomProfile = styled.img`
    margin : 0 26px 0 26px;
    height: 60px;
    width : 60px;
    border-radius : 30px;
    background-color : #ffffff;
`
export const NickName = styled.div`
    font-size : 20px;
    font-weight : 600;
`
export const MychatBubble = styled.span`
    min-width: min-content;
    max-width : max-content;
    border-radius : 10px;
    background-color : #EEEBFF;
    padding: 15px;
    word-break: break-all;
    margin: 0 20px 0 20px;
`
export const OtherchatBubble = styled.span`
    min-width: min-content;
    max-width : max-content;
    border-radius : 10px;
    word-break: break-all;
    background-color : #D9D9D9;
    padding: 15px;
    margin: 0 16px 0 16px;
`
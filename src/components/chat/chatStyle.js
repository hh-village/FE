import styled from "styled-components";

export const MessageRoom = styled.div`
    display : flex;
    margin : 6em 0 6em 0 ;
    flex-direction : column;
    gap : 30px;
    border : 12px solid gray;
    padding : 20px;
    border-right : none;
`

export const ChatBody = styled.div`
    width : 1000px;
    height : 600px;
    display : flex;
    justify-content: flex-end;
    margin : 6em 0 6em 0 ;
    padding : 20px;
    flex-direction : column;
    border : 12px solid gray;
`
export const Chatting = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction : column;
    margin: 0 0 10px 10px;
    gap : 10px;
    overflow : scroll;
    &::-webkit-scrollbar {
        background: white;
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        width: 8px;
        background: #dbdbdb;
        border-radius: 10px;
    }
`

export const ChatInput = styled.input`
    width:400px;
    height: 40px;
    border-radius:20px;
    border:none;
    border : 1px solid gray;
    text-indent : 1em;
    font-size : 15px;
`

export const TargetRoom = styled.div`
    width : 100%;
    background-color : gray;
    cursor : pointer;
`

export const Room = styled.div`
    cursor : pointer;
`
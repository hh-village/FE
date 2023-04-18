import styled from "styled-components";

export const MessageRoom = styled.div`
    display : flex;
    margin-top : 6em;
    flex-direction : column;
    border : 2px solid gray;
    width:585px;
    height: calc(100vh - 12em);
`

export const ChatBody = styled.div`
    width:585px;
    height: calc(100vh - 12em);
    display : flex;
    justify-content: flex-end;
    margin-top: 6em;
    flex-direction : column;
    border : 2px solid gray;
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
    display: flex;
    align-items : center;
    height:105px;
    width : 100%;
    background-color : #EEEBFF;
    cursor : pointer;
`

export const Room = styled.div`
    display: flex;
    align-items : center;
    height:105px;
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
    margin : 0 16px 0 26px;
    height: 60px;
    width : 60px;
    border-radius : 30px;
`
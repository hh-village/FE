import styled, { css } from "styled-components";

export const MessageRoom = styled.div`
    display : flex;
    margin-top : 6em;
    flex-direction : column;
    width:100%;
    height: calc(100vh - 23em);
    border-right : 1px solid #ededed;
    overflow: auto;
`
export const ChatWholeBody = styled.div`
    margin-top : 6em;
    width:100%;
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
    width:90%;
    height: 45px;
    border-radius:20px;
    border:none;
    border : 1px solid gray;
    padding :0 1em 0 1em;
    font-size : 15px;
    margin: 20px 16px 20px 16px;
`
export const TargetRoom = styled.div`
    display: flex;
    align-items : center;
    justify-content : space-between;
    height: 105px;
    width : 100%;
    background-color : #EEEBFF;
    cursor : pointer;
`

export const Room = styled.div`
    display: flex;
    justify-content : space-between;
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
    margin: 0 16px 0 10px;
`
export const OtherchatBubble = styled.span`
    min-width: min-content;
    max-width : max-content;
    border-radius : 10px;
    word-break: break-all;
    background-color : #D9D9D9;
    padding: 15px;
    margin: 0 10px 0 16px;
`
export const ChatTime = styled.div`
    color: #676767;
    font-size : 12px;
    padding-bottom : 3px;;
    display:flex;
    align-items:end;
    ${({theme})=>{
        switch(theme){
            case 'mychat' :
                return css`
                    justify-content : flex-end;
                    padding-left : 150px;
                `
            case 'otherchat':
                return css`
                    justify-content : flex;
                    padding-right : 150px;
                `
        }
    }}
`

export const ChatDeleteBtn = styled.div`
    width: 41px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 6px;
    box-sizing: border-box;
    background: #F5F5F5;
    border: 1px solid #B6B6B6;
    border-radius: 4px;
    font-size : 12px;
    margin: 0 5% 0 40%;
    :hover{
        background:#B6B6B6
    }
    &:active {
        box-shadow: inset 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction : row;
    align-items : center;
`
export const VillageHead = styled.div`
    position: static;
    width: 100%;
    height : 400px;
    display: flex;
    gap: 20px;
    flex-direction : column;
    justify-content : center;
    align-items: center;
`
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getCookie } from '../../shared/Cookies';
import { Div } from '../global/globalStyle'

function UserCard({data, refetch}) {
    const navi = useNavigate();
    const [changeState, setChangeState] = useState(false);
    const [changedNickname, setChangedNickname] = useState("");

    const changeNicknameHandler = () => {
        setChangeState(!changeState);
    }

    const changeInputHandler = (e) => {
        setChangedNickname(e.target.value);
    }

    const { mutate } = useMutation({
        mutationFn: async (payload) => {
          const token = getCookie("token");
          return await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users`, payload, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        },
        onSuccess: ({data}) => {
          setChangeState(!changeState);
          alert(data.message);
          refetch();
        },
        onError: ({response}) => {
          setChangeState(!changeState);
          alert(response.data.message);
        }
    });

  return (
    <Div marginTop="2rem" width="100%" height="300px" fDirection="row">
        <Div>
        <img src="/images/demoProfile.png" alt="userProfileImg" style={{width:"300px", height: "300px"}}/>
        </Div>
        <Div width="100%" height="100%" jc="space-between" bgColor="#e6e6e6" padding="1rem" style={{boxSizing:"border-box"}}>
        <Div width="100%" height="100%" fDirection="row" bgColor="#e6e6e6" padding="0 0 1rem 0" style={{boxSizing:"border-box", borderBottom:"1px solid #767676"}}>
            <Div margin="auto 0 auto 0" width="100%" fDirection="row" gap="1rem" bgColor="#e6e6e6">
            <img src={data?.profile} alt="rankingIcon" style={{width:"3rem", height: "3rem"}}/>
            {changeState
                ? <Input type="text" defaultValue={data?.nickname} maxLength={6} onChange={changeInputHandler}/>
                : <Span>{data?.nickname}</Span>
            }
            </Div>
            <Div width="50%" height="100%" gap="0.5rem" bgColor="#e6e6e6">
            <Button onClick={()=>{navi("/regist")}}>대여물품 등록하기</Button>
            <Button onClick={()=>{
                navi(`/chat/${getCookie('nickname')}`)
            }}>빌리지 채팅 관리</Button>
                {changeState
                ? 
                    <Div width="100%" height="100%" fDirection="row" jc="space-between" gap="1rem" bgColor="#e6e6e6">
                    <Button bgColor="#767676" color="white" onClick={changeNicknameHandler}>취소</Button>
                    <Button bgColor="#644AFF" color="white" onClick={()=>{mutate({"nickname" : changedNickname})}}>수정완료</Button>
                    </Div>
                : <Button onClick={changeNicknameHandler}>닉네임 변경</Button>
                }
            </Div>
        </Div>
        <Div width="100%" height="100%" bgColor="#e6e6e6" padding="1rem 0 0 0" style={{boxSizing:"border-box"}}>
            {/* 임시...공간? */}
        </Div>
        </Div>
    </Div>
  )
}

export default UserCard

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({color}) => color ? color : 'black'};
    background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
    border: none;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    cursor: pointer;
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.2);
    &:hover {
        box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
    &:active {
        box-shadow: inset 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
`

const Span = styled.span`
  margin: auto 0 auto 0;
  font-size: 1.5rem;
  font-weight: 700;
`

const Input = styled.input`
  margin: auto 0 auto 0;
  width: 50%;
  height: 2.5rem;
  border: 1px solid #e6e6e6;
  padding-left: 10px;
  font-size: 1.5rem;
`
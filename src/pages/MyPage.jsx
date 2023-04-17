import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import DropDown from '../components/detail/\bDropDown'
import { FlexDiv, MaxWidthDiv, Div } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import PagingTap from '../components/mypage/PagingTap'
import { getCookie } from '../shared/Cookies'

function MyPage() {
  const navi = useNavigate();
  const token = getCookie("token");

  // useEffect(()=>{
  //   setMyId(getCookie("userID", {path: "/"}));
  // },[]);

  const [myId, setMyId] = useState("");
  const [myNickname, setMyNickname] = useState("");
  const [changedNickname, setChangedNickname] = useState("");
  const [changeState, setChangeState] = useState(false);

  const changeNicknameHandler = () => {
    setChangeState(!changeState);
  }

  const changeInputHandler = (e) => {
    setChangedNickname(e.target.value);
  }

  const { mutate } = useMutation({
    mutationFn: async (payload) => {
      await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    },
    onSuccess: () => {
      setChangeState(!changeState);
      alert("닉네임 변경 완료!");
    },
    onError: () => {
      alert("일시적 오류 입니다!");
    }
  });

  const onNavigateChat = useMutation({
    mutationKey:['onNavigateChat'],
    mutationFn: async()=>{
      return await axios.get(`${process.env.REACT_APP_SERVER_URL}/chat/room?`,{
        headers : {
          Authorization: `Bearer ${token}`
        }
      })
    },
    onSuccess : (response) => {
      navi(`/chat/${response.data.data.roomList.filter(item => item.target === true)[0].roomId}`)
    }
  })

  return (
    <FlexDiv boxShadow="none">
      <HeaderNav />
      <MaxWidthDiv fDirection="row">
        <div style={{paddingTop:"7rem"}}>
          <h1>마이페이지</h1>
        </div>
        <Div marginTop="1rem" jc="space-between" alignItem="center" width="100%" bgColor="#e6e6e6">
          <Div bgColor="none" alignItem="center" gap="1rem" padding="1rem">
            <img src="" alt="userProfileImg" />
            <div>
              <Div bgColor="none" gap="0.5rem">
                <DropDown/>
                <img src="" alt="" />
                {changeState
                  ? <input type="text" placeholder={myNickname} onChange={changeInputHandler}/>
                  : <span>{myNickname}</span>
                }
                {changeState
                  ? 
                    <>
                      <button onClick={()=>{mutate({"nickname" : changedNickname})}}>수정완료</button>
                      <button onClick={changeNicknameHandler}>취소</button>
                    </>
                  : <button onClick={changeNicknameHandler}>닉네임 변경</button>
                }
              </Div>
              <span>{myId}</span>
            </div>
          </Div>
          <Div bgColor="none" fDirection="row" gap="1rem" padding="1rem">
            <Button onClick={()=>{navi("/Regist")}}>대여물품 등록하기</Button>
            <Button onClick={()=>{
              onNavigateChat.mutate()
            }}>빌리지 채팅 관리</Button>
            <Button>예약 승인 / 확인 / 취소</Button>
          </Div>
        </Div>
        <PagingTap setMyNickname={setMyNickname}/>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default MyPage

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
    border: none;
    border-radius: 5px;
    width: 20rem;
    height: 2.5rem;
    cursor: pointer;
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.2);
    &:hover {
        box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
    &:active {
        box-shadow: inset 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
`
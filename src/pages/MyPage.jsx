import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FlexDiv, MaxWidthDiv, Div } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import PagingTap from '../components/mypage/PagingTap'
import { getCookie } from '../shared/Cookies'

function MyPage() {
  const navi = useNavigate();
  const token = getCookie("token");

  const [currentBtn, setCurrentBtn] = useState("products");
  const [changedNickname, setChangedNickname] = useState("");
  const [changeState, setChangeState] = useState(false);
  const btnInfo = [
    { name: "products", title: "내가 작성한 글" },
    { name: "rents", title: "대여중인 항목"},
    { name: "zzims", title: "찜한 상품"}
  ]

  const buttonClickHandler = (e) => {
    setCurrentBtn(e.target.name);
  }

  const changeNicknameHandler = () => {
    setChangeState(!changeState);
  }

  const changeInputHandler = (e) => {
    setChangedNickname(e.target.value);
  }

  const { data } = useQuery({
    queryKey: [`${currentBtn}`],
    queryFn: async () => {
      const token = getCookie("token");
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users?key=${currentBtn}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      return res.data.data;
    }
  })

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
      alert("일시적 오류입니다");
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
      <MaxWidthDiv>
        <div style={{marginTop:"7rem"}}>
          <h2>마이페이지</h2>
        </div>
        <Div fDirection="row" marginTop="1rem" jc="space-between" alignItem="center" width="100%" bgColor="#e6e6e6">
          <Div fDirection="row" bgColor="none" alignItem="center" gap="1rem" padding="1rem">
            <img src={data?.profile} alt="userProfileImg" style={{width:"200px", height: "200px"}}/>
            <Div fDirection="row" gap="1rem" bgColor="#e6e6e6">
              <Div bgColor="#e6e6e6" gap="1rem">
                <span>닉네임</span>
              </Div>
              <Div fDirection="row" bgColor="#e6e6e6" gap="1rem">
                  {changeState
                    ? <input type="text" placeholder={data?.nickname} onChange={changeInputHandler}/>
                    : <span>{data?.nickname}</span>
                  }
                  {changeState
                    ? 
                      <>
                        <button onClick={()=>{mutate({"nickname" : changedNickname})}}>수정완료</button>
                        <button onClick={changeNicknameHandler}>취소</button>
                      </>
                    : <button onClick={changeNicknameHandler}>변경하기</button>
                  }
              </Div>
            </Div>
          </Div>
          <Div bgColor="none" gap="1rem" padding="1rem">
            <Button onClick={()=>{navi("/regist")}}>대여물품 등록하기</Button>
            <Button onClick={()=>{
              onNavigateChat.mutate()
            }}>빌리지 채팅 관리</Button>
            <Button>예약 승인 / 확인 / 취소</Button>
          </Div>
        </Div>
        <PagingTap
          data={data}
          btnInfo={btnInfo}
          currentBtn={currentBtn}
          buttonClickHandler={buttonClickHandler}
          />
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
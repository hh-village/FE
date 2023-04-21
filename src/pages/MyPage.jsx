import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/global/Footer'
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

  const { data, refetch } = useQuery({
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
      refetch();
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
        <div style={{marginTop:"10rem"}}>
          <h2>마이페이지</h2>
        </div>
        <Div marginTop="2rem" width="100%" height="300px" fDirection="row">
          <Div>
            <img src="/images/demoProfile.png" alt="userProfileImg" style={{width:"300px", height: "300px"}}/>
          </Div>
          <Div width="100%" height="100%" jc="space-between" bgColor="#e6e6e6" padding="1rem" style={{boxSizing:"border-box"}}>
            <Div width="100%" height="100%" fDirection="row" bgColor="#e6e6e6" padding="0 0 1rem 0" style={{boxSizing:"border-box", borderBottom:"1px solid #767676"}}>
              <Div margin="auto 0 auto 0" width="100%" fDirection="row" gap="1rem" bgColor="#e6e6e6">
                <img src={data?.profile} alt="rankingIcon" style={{width:"3rem", height: "3rem"}}/>
                {changeState
                  ? <Input type="text" placeholder={data?.nickname} onChange={changeInputHandler}/>
                  : <Span>{data?.nickname}</Span>
                }
              </Div>
              <Div width="50%" height="100%" gap="0.5rem" bgColor="#e6e6e6">
                <Button onClick={()=>{navi("/regist")}}>대여물품 등록하기</Button>
                <Button onClick={()=>{
                  onNavigateChat.mutate()
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

            </Div>
          </Div>
        </Div>

        {/* components/mypage */}
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
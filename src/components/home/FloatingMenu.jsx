import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getCookie } from '../../shared/Cookies';
import { Div } from '../global/globalStyle'

function FloatingMenu({data}) {
    const navi = useNavigate();
    const token = getCookie("token");

    const moveZzimPage = () => {
        if(token === undefined){
            alert("로그인이 필요한 기능입니다");
            navi("/login");
        } else {
            navi("/mypage");
        }
    }

  return (
    <FloatDiv>
        <FloatInnerCont>
            <FloatInner cursor="pointer" onClick={moveZzimPage}>
                <span>찜한 상품</span>
                <Div fDirection="row" gap="0.3rem">
                    <Zzim src="/images/fHeart.png" alt="" />
                    <span>{data?.zzimCount}</span>
                </Div>
            </FloatInner>
            <Hr />
            <FloatInner>
                <span>방문자 수</span>
                <span>{data?.visitorCount}</span>
            </FloatInner>
        </FloatInnerCont>
    </FloatDiv>
  )
}

export default FloatingMenu

const FloatDiv = styled.div`
    position: sticky;
    height: 0px;
    top: 0;
    left: 82.5%;
    transform: translateY(9.85rem);
`

const FloatInnerCont = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid #644AFF;
`

const Hr = styled.hr`
    background-color: #644AFF;
`

const FloatInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    box-sizing: border-box;
    background-color: white;
    color: #191919;
    gap: 0.5rem;
    cursor: ${({cursor}) => cursor};
`

const Zzim = styled.img`
    width: 1rem;
    height: 1rem;
    margin: auto 0 auto 0;
`
import React from 'react'
import styled from 'styled-components';

function HomeSlideBtn({ count, setFunc, total }) {

    const buttonClickHandler = (position) => {
        if (position === "prev") {
          setFunc((prev) => --prev);
        } else if (position === "next"){
          setFunc((prev) => ++prev);
        } else {
          console.log("슬라이드 버튼를 확인하세요");
        }
      }

  return (
    <>
      <PrevBtn
        onClick={() => buttonClickHandler("prev")}
        disabled={count === 1 ? true : false}
      >
        <BtnImage src="/images/left.png" />
      </PrevBtn>
      <NextBtn
        onClick={() => buttonClickHandler("next")}
        disabled={count === total ? true : false}
      >
        <BtnImage src="/images/right.png" />
      </NextBtn>
    </>
  )
}

export default HomeSlideBtn

const PrevBtn = styled.button`
  position: absolute;
  cursor: pointer;
  top : 50%;
  left : 2%;
  transform: translateY(-50%);
  width: 24px;
  height: 36px;
  border : none;
  border-radius: 5px;
  background-color: transparent;
  z-index: 1;
`;
const NextBtn = styled.button`
  position: absolute;
  cursor: pointer;
  top : 50%;
  right : 2%;
  transform: translateY(-50%);
  width: 24px;
  height: 36px;
  border : none;
  border-radius: 5px;
  background-color: transparent;
  z-index: 1;
`;
const BtnImage = styled.img`
  width: 100%;
  height: 100%;
`
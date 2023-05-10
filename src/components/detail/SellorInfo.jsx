import { useState } from "react";
import { Div } from "../global/globalStyle";
import { NotifiyIcon, SellerInfo, SellorInfoBox, Span } from "./detailStyle";

const SellorInfo =({ownerNickname, ownerReturned, ownerAccepted, ownerWaiting})=>{
    const [hide, setHide] = useState();

    return(
        <SellerInfo
            onMouseOver={()=>setHide(true)}
            onMouseLeave={()=>setHide(false)}
            >판매자 정보
            {/* </SellerInfo> */}
            {hide && (
                <SellorInfoBox>
                <div style={{width : '100%', paddingLeft :'17px', fontSize : '20px'}}>
                {ownerNickname}
                </div>
                <Div fDirection = 'row' jc = 'center' gap = '13px' >
                    <Div alignItem = 'center' fDirection = 'row' gap='7px'>
                    <NotifiyIcon src='/images/check.png'/>
                    <Span>대여완료 {ownerReturned}명</Span>
                    </Div>
                    <Div alignItem = 'center' fDirection = 'row' gap='7px'>
                    <NotifiyIcon src='/images/profile1.png'/>
                    <Span>대여진행중 {ownerAccepted}명</Span>
                    </Div>
                    <Div alignItem = 'center' fDirection = 'row' gap='7px'>
                    <NotifiyIcon src='/images/profile.png'/>
                    <Span>대기중 {ownerWaiting}명</Span>
                    </Div>
                </Div>
                </SellorInfoBox>
            )}
        </SellerInfo>
    )
}

export default SellorInfo;
import { useState } from "react";
import { Div } from "../global/globalStyle";
import { Cancel, ModalBackground, ModalText, NotifiyIcon } from "./detailStyle";

const ModalSeller = ({handleClose}) => {
    const [always, setAlways] = useState(false);

    return(
        <ModalBackground>
            <ModalText>
                <Cancel onClick={()=>{
                  if(always){
                    localStorage.setItem('alwaysOpen', false)
                  }
                  handleClose();
                }}>
                  ⅹ
                </Cancel>
              <Div fDirection = 'column' alignItem = 'center'>
                <span style={{display:'flex', alignItems:'center', gap:'5px'}}>
                  <NotifiyIcon src='/images/edit 1.png'/>
                  해당 페이지를 통해 게시글의 요소들을
                </span>
                <span>
                  간단히 수정하실 수 있습니다.
                </span>
              </Div>
              <Div fDirection ='row' alignItem = 'center' gap = '10px'>
                <input style={{width : '18px', height : '18px'}} type={'checkbox'}
                onChange = {(event) => {
                  setAlways(event.target.checked)
                }}/>
                <span style={{fontSize : '14px'}}>다시 보지 않기</span>
              </Div>
            </ModalText>
        </ModalBackground>
    )
}

export default ModalSeller;
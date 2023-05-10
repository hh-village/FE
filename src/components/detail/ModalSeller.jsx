import { useState } from "react";
import { Div } from "../global/globalStyle";
import { Cancel, ModalBackground, ModalText, NotifiyIcon } from "./detailStyle";

const ModalSeller = ({handleClose, word1, word2}) => {
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
                  <NotifiyIcon src='/images/edit.png'/>
                  {word1}
                </span>
                <span>
                  {word2}
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
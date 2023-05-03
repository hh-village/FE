import styled, { css } from "styled-components";

export const SelectWrapper = styled.div`
    width: 567px;
    height: 15.5rem;
    overflow: auto;
    border-top: 1px solid #e6e6e6;
    box-sizing: border-box;
    &::-webkit-scrollbar {
        display: none;
    }
`
export const SelectOption = styled.div`
    height: 137px;
    width: 100%;
    display: flex;
    padding: 0 1rem 0 1rem;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #DBDBDB;
`
export const ReservationDateClick = styled.div`
    width: 20rem;
    height: 3rem;
    border: 1px solid gray;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    :hover{
        background-color: #ededed;
    }
`
export const Selections = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items : center;
`

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
    color: ${({color}) => color ? color : 'white'};
    display: ${({display})=> display ? display : null};
    border: none;
    border-radius: 5px;
    width: 5rem;
    height: 2.5rem;
    cursor: pointer;
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.2);
    &:hover {
        box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
    &:active {
        background-color: #018786;
        box-shadow: inset 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
`
export const ButtonWrapper = styled.div`
    display: flex;
    width: 567px;
    justify-content : flex-end;
    gap: 1rem;
    margin-bottom : 45px;
`
export const DetailBtn = styled.button`
    width : 126px;
    height : 54px;
    font-size : 20px;
    font-weight : 700;
    border: none;
    color: #ffffff;
    border-radius : 5px;
    cursor: pointer;
    ${({theme})=>{
        switch(theme){
            case 'modify' :
                return css`
                    background-color : #644AFF;
                `
            case 'cancel' : 
                return css`
                    background-color : #313131;
                `
            default :
                return
    }}}  
    :hover{
        box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.5);
    }
    &:active {
        box-shadow: inset 1px 1px 10px rgb(0, 0, 0, 0.5);
    }
`
export const Block = styled.button`
    width: 5rem;
    height: 2.5rem;
    background: none;
    border: none;
`
export const Status = styled.div`
    width: 7rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius : 5px;
    font-size : 20px;
    background: #e6e6e6;
    color: white;
    ${({theme})=>{
        switch(theme){
            case 'rejected' :
                return css`
                    background: #B00020;
                `
            case 'accepted' :
                return css`
                    background: #03DAC6;
                `
            case 'waiting' : 
                return css`
                    background : gray;
                `
            case 'returned' :
                return css`
                    background: #3700B3;
                ` 
            default : 
                return
        }
    }}
` 
export const DropdownMenu = styled.div`
    display: flex;
    flex-direction : column;
    justify-content:center;
    position: absolute;
    z-index : 1000;
    align-items : center;
    border-radius: 2px;
    height: 90px;
    width : 118px;
    background: #8E8E8E;
`
export const DropHeader = styled.div`
    height: 34px;
    width : 118px;
    border-radius: 2px;
    z-index: 1;
    display: flex;
    justify-content : center;
    align-items : center;
    background: #CDCDCD;
    color : #ffffff;
    cursor: pointer;
`
export const DropOption = styled.div`
    height: 30px;
    width : 118px;
    display: flex;
    border-radius: 2px;
    justify-content : center;
    align-items : center;
    background: #8E8E8E;
    color : #ffffff;
    cursor: pointer;
    :hover{
        background: #CDCDCD;
    }
`
export const ChatBtn = styled.div`
    height: 34px;
    width : 118px;
    display: flex;
    position: relative;
    justify-content : center;
    align-items:center;
    cursor: pointer;
    background: #363636;
    color: #ffffff;
    border-radius: 2px;
`

export const Title =  styled.div`
    font-weight : 700;
    font-size : 32px;
    color: #575757;
`
export const ReserveDesc = styled.div`
    font-size : 1.5rem;
`

export const PriceTitle = styled.div`
    font-weight : 700;
    color: #575757;
    margin-Top : 7px;
    font-size : 24px;
`
export const NotifiyIcon = styled.img`
    width: 24px;
    height: 24px;
`

export const DetailTitle = styled.div`
    font-size : 1.5rem;
    font-weight: 700;
`

export const UnderImage = styled.div`
    display: flex;
    justify-content : center;
    align-items:center;
    width: 567px;
    height : 60px;
    gap: 21px;
`

export const LocationButton = styled.div`
    position: absolute;
    height : 54px;
    width : 225px;
    border-radius : 10px;
    border: 2px solid #644AFF;
    color: #644AFF;
    display: flex;
    justify-content : center;
    align-items : center;
    background-color : #ffffff;
    gap: 5px;
    left: 30%;
    top: 22%;
    cursor: pointer;
    :active{
        transition: all 2s;
    } 
`
export const Registertext = styled.textarea`
    padding: 1rem;
    height: 200px;
    width: 567px;
    font-size: 1rem;
    resize: none;
    border-radius : 10px;
    box-sizing: border-box;
`

export const DescriptionDiv = styled.div`
  width: 567px;
  height : 196px;
  margin-bottom : 26px;
  overflow : auto;
  border : 1px solid #E1E1E1;
  border-radius : 10px;
  box-sizing: border-box;
  padding : 16px;
  &::-webkit-scrollbar{
    display: none;
  }
`

export const SellerInfo = styled.div`
    position: relative;
    width:85px;
    height: 28px;
    border: 1px solid #DADADA;
    color: #575757;
    display: flex;
    justify-content : center;
    align-items: center;
    font-size : 16px;
    font-weight: 400;
    cursor: pointer;
`

export const SellorInfoBox = styled.div`
    width: 428px;
    height: 100px;
    border: 1px solid #DADADA;
    border-radius : 10px;
    position: absolute;
    top: 115%;
    left: 0%;
    background: #ffffff;
    display: flex;
    justify-content :center;
    flex-direction : column;
    gap:15px;
`
export const ModalBackground = styled.div`
    position: fixed;
    background: rgba(0,0,0,0.3);
    z-index: 9;
    width:100vw;
    height: 100vh;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${({theme})=>{
        switch(theme){
            case'regist':
                return css`
                    background: none;
                    cursor: pointer;
                `
        }
    }}
`;

export const ModalText = styled.div`
    position: absolute;
    top: 40%;
    font: 'Pretendard';
    display: flex;
    justify-content : center;
    align-items:center;
    height: 213px;
    width: 403px;
    border-radius : 10px;
    background: #ffffff;
    text-align: bottom;
    flex-direction : column;
    gap: 20px;
`;

export const Span = styled.div`
    font-size : 16px;
`
export const Cancel = styled.div`
    position: absolute;
    top: 5%;
    left: 94%;
    color: #979797;
    cursor: pointer;
`
export const LocationBox = styled.div`
    position:absolute;
    top : -560%;
    right: -3%;
    background:white;
    border-radius : 10px;
    box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.5);
    overflow: hidden;
`
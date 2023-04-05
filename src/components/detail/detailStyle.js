import styled from "styled-components";

export const SelectWrapper = styled.div`
    height:269px;
    width: 545px;
    overflow: auto;
    border: 1px solid gray;
`
export const SelectOption = styled.div`
    height:131px;
    width:100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid red;
`
export const ReservationDateClick = styled.div`
    margin-top: 10px;
    width: 350px;
    height: 50px;
    border: 1px solid gray;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
    :hover{
        background-color: #ededed;
    }
`
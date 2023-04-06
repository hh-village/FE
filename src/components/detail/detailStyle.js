import styled from "styled-components";

export const SelectWrapper = styled.div`
    height: 10rem;
    width: 100%;
    overflow: auto;
`
export const SelectOption = styled.div`
    height: 5rem;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid red;
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
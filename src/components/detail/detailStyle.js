import styled from "styled-components";

export const SelectWrapper = styled.div`
    padding: 0 1rem 0 0;
    height: 10rem;
    overflow: auto;
    &::-webkit-scrollbar {
        background: white;
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        width: 8px;
        background: #dbdbdb;
        border-radius: 10px;
    }
`
export const SelectOption = styled.div`
    height: 5rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #DBDBDB;
    gap: 1rem;
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
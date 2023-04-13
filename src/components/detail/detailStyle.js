import styled from "styled-components";

export const SelectWrapper = styled.div`
    width: 100%;
    padding: 0 1rem 0 1rem;
    height: 15rem;
    overflow: auto;
    border: 1px solid #e6e6e6;
    &::-webkit-scrollbar {
        background: white;
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
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
export const Selections = styled.div`
    margin-top:50px;
    display: flex;
    justify-content: space-between;
    align-items : center;
    gap : 50px;
`

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
    color: ${({color}) => color ? color : 'white'};
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
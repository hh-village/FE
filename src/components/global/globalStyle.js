import styled from "styled-components";

export const FlexDiv = styled.div`
    display: flex;
    flex-direction: ${({fDirection}) => fDirection ? 'column' : 'row'};
    justify-content : ${({jc}) => jc ? jc : 'start'};
    align-items: ${({alignItem}) => alignItem ? alignItem : 'start'};
    width : ${({width})=>width ? width : '100%'};
    height : ${({height})=>height ? height : '100%'};
    margin : ${({margin}) => margin ? margin: 0};
    padding : ${({padding}) => padding ? padding: 0};
    background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
    position: ${({position}) => position};
    top: ${({top}) => top ? top : 0};
    bottom: ${({bottom}) => bottom ? bottom : 0};
    gap : ${({gap}) => gap ? gap : 0};
    box-shadow: ${({boxShadow}) => boxShadow ? boxShadow : '1px 1px 5px rgb(0, 0, 0, 0.2)'};
    ${({etc}) => etc};
`

export const MaxWidthDiv = styled.div`
    max-width: 1200px;
    width: 100%;
    height: ${({height})=>height};
    display: flex;
    flex-direction: ${({fDirection}) => fDirection ? 'column' : 'row'};
    justify-content: ${({jc}) => jc ? jc : 'start'};
    align-items: ${({alignItem}) => alignItem ? alignItem : 'start'};
    margin: ${({margin}) => margin ? margin: 0} auto;
    padding : ${({padding}) => padding ? padding: 0};
    gap : ${({gap}) => gap ? gap : 0};
`

export const Div = styled.div`
    display: flex;
    flex-direction: ${({fDirection}) => fDirection ? 'column' : 'row'};
    justify-content : ${({jc}) => jc ? jc : 'start'};
    align-items: ${({alignItem}) => alignItem ? alignItem : 'start'};
    gap : ${({gap}) => gap ? gap : 0};
`

export const Span = styled.span`

`
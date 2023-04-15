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
    z-index: ${({zIndex}) => zIndex};
    box-shadow: ${({boxShadow}) => boxShadow ? boxShadow : '1px 1px 5px rgb(0, 0, 0, 0.2)'};
    ${({etc}) => etc};
`

export const GridDiv = styled.div`
    display: grid;
    grid-template-columns: ${({gridTC}) => gridTC};
    grid-gap: 1rem;
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
    z-index: ${({zIndex}) => zIndex};
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
    justify-content: ${({jc}) => jc ? jc : 'start'};
    align-items: ${({alignItem}) => alignItem ? alignItem : 'start'};
    width: ${({width}) => width};
    height: ${({height}) => height};
    margin: ${({margin}) => margin ? margin: 0};
    padding: ${({padding}) => padding ? padding: 0};
    margin-top: ${({marginTop}) => marginTop};
    padding-top: ${({paddingTop}) => paddingTop};
    background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
    border: ${({border}) => border ? border : 'none'};
    border-radius: ${({bRadius}) => bRadius ? bRadius : 'none'};
    border-top: ${({borderTop}) => borderTop};
    border-bottom: ${({borderBottom}) => borderBottom};
    top: ${({top}) => top ? top : 0};
    bottom: ${({bottom}) => bottom ? bottom : 0};
    position: ${({position}) => position};
    overflow: ${({overflow}) => overflow};
    gap: ${({gap}) => gap ? gap : 0};
`

export const Span = styled.span`

`
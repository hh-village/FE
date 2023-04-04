import React from 'react'
import { FlexDiv } from './globalStyle'

function SearchInput() {
  return (
    <FlexDiv boxShadow="none" style={{paddingTop:"8rem"}}>
        <input type="text" />
        <div>찾아보기</div>
    </FlexDiv>
  )
}

export default SearchInput
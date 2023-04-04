import React, { useState } from 'react'
import { FirstPreview, OtherPreview, PreviewContainer } from './RegistStyled';

function ImageBlock() {
    const [imageURL, setImageURL] = useState([])

    const onImageChangeHandler = async(event) => {
        event.preventDefault();
        const imageLists = event.target.files
        const ImageURLLists = []
        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            ImageURLLists.push(currentImageUrl)
        }
        setImageURL(ImageURLLists)
        const formData = new FormData()
        formData.append('images', imageLists)
        // await axios.post(`${process.env.REACT_APP_SERVER_URL}/products/upload`,formData)
        }
  return (
    <div>
        <label htmlFor='file'>
            <FirstPreview src = {imageURL[0]} alt=""/>
        </label>
        <PreviewContainer>
            <OtherPreview src = {imageURL[1]} alt=""/>
            <OtherPreview src = {imageURL[2]} alt=""/>
            <OtherPreview src = {imageURL[3]} alt=""/>
            <OtherPreview src = {imageURL[4]} alt=""/>
        </PreviewContainer>
        
        <input type={'file'} id='file' multiple style={{display:'none'}} onChange={onImageChangeHandler}/>
    </div>
    
)
}

export default ImageBlock;
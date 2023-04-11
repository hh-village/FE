import React, { useState } from 'react'
import { FirstPreview, OtherPreview, PreviewContainer } from './RegistStyled';
import { useDispatch } from 'react-redux'
import { storeImage } from '../../redux/modules/Post';


function ImageBlock() {
    const dispatch = useDispatch();
    const [imageURL, setImageURL] = useState([])

    const onImageChangeHandler = async(event) => {
        event.preventDefault();
        const imageLists = event.target.files

        //이미지 미리보기
        const ImageURLLists = []
        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            ImageURLLists.push(currentImageUrl)
        }
        setImageURL(ImageURLLists)

        //여기서부터 서버통신 시작
        const formData = new FormData()
        formData.append('images', Object.values(imageLists))
        
        for (let value of Object.values(imageLists)) {
            console.log(value);
        }
        dispatch(storeImage(Object.values(imageLists)))
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
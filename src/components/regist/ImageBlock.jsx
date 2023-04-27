import React, { useEffect, useRef, useState } from 'react'
import { FirstPreview, OtherPreview, PreviewContainer } from './RegistStyled';
import { useDispatch } from 'react-redux'
import { storeImage } from '../../redux/modules/Post';
import { Div } from '../global/globalStyle';

function ImageBlock({image, id}) {
    const [imageURL, setImageURL] = useState([]);

    useEffect(()=>{
        if(image){
            setImageURL(image);
        }
       return () => {
        setImageURL([]);
       } 
    },[id, image])

    const dispatch = useDispatch();
    
    const onImageChangeHandler = async(event) => {
        setImageURL([])
        event.preventDefault();
        const imageLists = event.target.files
        if(imageLists.length > 5){
            return window.alert('물품 이미지는 최대 5장까지만 등록 가능합니다')
        }
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
        dispatch(storeImage(Object.values(imageLists)))
    }
    console.log(imageURL)
  return (
    <Div width="100%" gap="1rem">
        <label htmlFor='file'>
            <FirstPreview>
                {imageURL[0] ? <img src = {imageURL[0]} style={{width:'100%', height:'100%'}} alt=''/> : <></>}
                <div style={{position:'absolute',top :'45%', left : '13%', color:'white',fontSize:'30px', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <span>'여기'를 클릭해서</span>
                    <span>물품 이미지를 첨부해주세요(최대5장)</span>
                </div>
            </FirstPreview>
        </label>
        <PreviewContainer>
            <OtherPreview theme ={'primary'} children={
                imageURL[1] ? <img src={imageURL[1]} style={{width:'100%', height : '100%'}} alt=''/> : <></>
            }/>
            <OtherPreview children={
                imageURL[2] ? <img src={imageURL[2]} style={{width:'100%', height : '100%'}} alt=''/> : <></>
            }/>
            <OtherPreview children={
                imageURL[3] ? <img src={imageURL[3]} style={{width:'100%', height : '100%'}} alt=''/> : <></>
            }/>
            <OtherPreview children={
                imageURL[4] ? <img src={imageURL[4]} style={{width:'100%', height : '100%'}} alt=''/> : <></>
            }/>
        </PreviewContainer>
        
        <input type={'file'} id='file' multiple style={{display:'none'}} onChange={onImageChangeHandler}/>
    </Div>
    
)
}

export default ImageBlock;
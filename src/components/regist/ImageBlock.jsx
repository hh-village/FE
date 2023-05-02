import React, { useEffect, useRef, useState } from 'react'
import { FirstPreview, OtherPreview, PreviewContainer } from './RegistStyled';
import { useDispatch } from 'react-redux'
import { storeImage } from '../../redux/modules/Post';
import { Div } from '../global/globalStyle';
import imageCompression from 'browser-image-compression';

function ImageBlock({image, id}) {
    const [imageURL, setImageURL] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(image){
            setImageURL(image);
        }
       return () => {
        setImageURL([]);
       } 
    },[id, image])
    
    const onImageChangeHandler = async(event) => {
        const imageLists = event.target.files
        if(imageLists.length > 5){
            return window.alert('물품 이미지는 최대 5장까지만 등록 가능합니다')
        }
        //이미지 미리보기
        const ImageURLLists = []
        for (let i = 0; i < imageLists.length; i++) {
            if(imageLists[i].size > 10000000){
                return window.alert('10MB 미만의 이미지만 첨부해주세요!')
            }
            console.log('originalFile instanceof Blob', imageLists[i] instanceof Blob); // true
            console.log(`originalFile size ${imageLists[i].size} MB`);

            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            ImageURLLists.push(currentImageUrl)
        }
        setImageURL(ImageURLLists)

        
        const compressedImageList = []
        for(let i = 0; i < imageLists.length; i++){
            const compressedFile = await imageCompression(imageLists[i], {
                maxSizeMB: 1,
                maxWidthOrHeight: 567
            });
           
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size} MB`); // smaller than maxSizeMB
            compressedImageList.push(compressedFile)
        }

        //여기서부터 서버통신 시작
        const formData = new FormData()
        formData.append('images', compressedImageList)
        dispatch(storeImage(compressedImageList))
    }

  return (
    <Div width="100%" gap="1rem">
        <label htmlFor='file'>
            <FirstPreview>
                {imageURL[0] ? <img src = {imageURL[0]} style={{width:'567px', height:'500px', objectFit : 'contain'}} alt=''/> : <></>}
                <div style={{position:'absolute',top :'45%', left : '13%', color:'white',fontSize:'30px', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <span>'여기'를 클릭해서</span>
                    <span>물품 이미지를 첨부해주세요(최대5장)</span>
                </div>
            </FirstPreview>
        </label>
        <PreviewContainer>
            <OtherPreview theme ={'primary'} children={
                imageURL[1] ? <img src={imageURL[1]} style={{width:'127.5px', height : '100px', objectFit : 'contain'}} alt=''/> : <></>
            }/>
            <OtherPreview children={
                imageURL[2] ? <img src={imageURL[2]} style={{width:'127.5px', height : '100px', objectFit : 'contain'}} alt=''/> : <></>
            }/>
            <OtherPreview children={
                imageURL[3] ? <img src={imageURL[3]} style={{width:'127.5px', height : '100px', objectFit : 'contain'}} alt=''/> : <></>
            }/>
            <OtherPreview children={
                imageURL[4] ? <img src={imageURL[4]} style={{width:'127.5px', height : '100px', objectFit : 'contain'}} alt=''/> : <></>
            }/>
        </PreviewContainer>
        
        <input type={'file'} id='file' accept="image/*" multiple style={{display:'none'}} onChange={onImageChangeHandler}/>
    </Div>
    
)
}

export default ImageBlock;
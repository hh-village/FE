import axios from 'axios';
import React, { useState } from 'react'

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
    console.log(imageURL)
  return (
    <div>
        <label htmlFor='file'>
            <img src = {imageURL[0]} alt="" style={{width:'200px', height:"200px"}}/>
        </label>
        <img src = {imageURL[1]} alt="" style={{width:'100px', height:"100px"}}/>
        <img src = {imageURL[2]} alt="" style={{width:'100px', height:"100px"}}/>
        <img src = {imageURL[3]} alt="" style={{width:'100px', height:"100px"}}/>
        <input type={'file'} id='file' multiple style={{display:'none'}} onChange={onImageChangeHandler}/>
    </div>
    
)
}

export default ImageBlock;
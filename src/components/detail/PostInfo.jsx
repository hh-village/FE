import { NotifiyIcon, UnderImage } from "./detailStyle";

const PostInfo = ({reservationList, zzimCount, location}) => {
    return(
        <div>
            <UnderImage>
                <div style={{display:'flex', alignItems:'center',gap:'4px'}}>
                <NotifiyIcon src='/images/check.png'/>
                <span>대여완료 {reservationList.filter((item)=> item.status === 'returned').length}명 </span>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                <NotifiyIcon src='/images/fHeart.png'/>
                관심 {zzimCount}명
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                <NotifiyIcon src='/images/eye 1.png'/>
                조회 xx회
                </div>
            </UnderImage>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'4px'}}>
                <NotifiyIcon src='/images/map.png'/>
                <span>{location}</span>
            </div>
        </div>
    )
}

export default PostInfo;
import { Status } from "./detailStyle"

const StatusBlock = ({status}) => {
    if(status === 'returned'){
        return(
            <Status  theme={'returned'}>
                반납완료
            </Status>
        )
    }
    if(status === 'waiting'){
        return (
            <Status theme={'waiting'}>
                대기중
            </Status>
        )
    }
    if(status === 'accepted'){
        return (
            <Status theme={'accepted'}>
                대여중
            </Status>
        )
    }
    if(status === 'rejected'){
        return (
            <Status theme={'rejected'}>
                승인거절
            </Status>
        )
    }
    
}

export default StatusBlock;
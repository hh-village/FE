import React from "react";
import { VillageHead } from "./chatStyle"

const VillageHeader = () => {
    return (
        <VillageHead>
            <img src="/images/appLogo.png" style={{width : '20%'}}/>
            빌리지 채팅을 이용해주셔서 감사합니다!
        </VillageHead>
    )
}

export default React.memo(VillageHeader);
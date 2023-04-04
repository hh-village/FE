import React, { useEffect } from 'react'

function NaverBtn() {
    const initializeNaverLogin = () => {
        const {naver} = window;
        const naverLogin = new naver.LoginWithNaverId({
            clientId: "d2OPxb8UvYW9VRcpm868",
            callbackUrl: "http://localhost:3000/oauth/social/callback", 
            isPopup: false, // popup 형식으로 띄울것인지 설정
            loginButton: { color: 'green', type: 3, height: '47' }, //버튼의 스타일, 타입, 크기를 지정
        });
        naverLogin.init();
    };

    const userAccessToken = () => {
		window.location.href.includes('access_token') && getToken()
	}
	const getToken = () => {
		const token = window.location.href.split('=')[1].split('&')[0]
        console.log(token);
	}

    useEffect(()=>{
        initializeNaverLogin();
        userAccessToken()
    },[])

    return (
        <span id='naverIdLogin'>네이버 로그인</span>
    )
}

export default NaverBtn
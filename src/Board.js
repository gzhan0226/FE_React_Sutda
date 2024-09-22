import Card from "./Card";
import { useEffect } from 'react';
import './App.css';

function Board({num1=1,num2=1, player,setter, money,game}) {

    const rank = showRank(num1, num2); 
    const close = (game==0) ? rank : "???"; //삼항연산자 이용
    const open = (player==1) ? rank : close;
    const power = RankNum(rank);
    function who (player) {
        if (player==1) {
            return "Player";
        }
        if (player==2) {
            return "Computer";
        }
    };
    useEffect(()=>{ setter(power);
    });
    function showRank(num1, num2) {
        let month1 = Math.floor((num1+1)/2);
        let special1 = (num1+1)%2;
        let month2 = Math.floor((num2+1)/2);
        let special2 = (num2+1)%2;

        if (month1 === month2) {  //땡 계산
            if (month1=== 10) {
                return '장 땡'
            }
            else {
                return `${month1} 땡`;
            }
        }
        if ((month1==3 && special1==0)||(month2==3 && special2==0)) { //광땡 계산
            if ((month1==8 && special1==0)||(month2==8 && special2==0)) {
                return '38 광땡'
            }
        }
        if ((month1==1 && special1==0)||(month2==1 && special2==0)) {
            if ((month1==8 && special1==0)||(month2==8 && special2==0)) {
                return '18 광땡'
            }
        }
        if ((month1==1 && special1==0)||(month2==1 && special2==0)) {
            if ((month1==3 && special1==0)||(month2==3 && special2==0)) {
                return '13 광땡'
            }
        }
        if ((month1+month2)%10==1) {
            if (month1 ==1||month2 ==1) {
                return '장 삥'
            }
            if (month1 ==4 || month2==4) {
                if (special1==0 && special2==0) {
                    return '암행어사'
                }
                else {
                    return '한 끗'
                }
            }
            else {
                return '한 끗'
            }
        }
        if ((month1+month2)%10==0) {
            if (month1 ==1||month2 ==1) {
                return '구 삥'
            }
            if (month1 ==4||month2 ==4) {
                return '세 륙'
            }
            if (month1 ==3||month2 ==3) {
                if (special1 == 0 && special2 ==0 ) {
                    return '땡 잡이'
                }
                else {
                    return '망 통'
                }
            }
            else {
                return '망 통'
            }
        }
        if ((month1+month2)%10==2) {
            return '두 끗'
        }
        if ((month1+month2)%10==3) {
            if (month1==4 || month2==4) {
                if (special1 == 0 && special2 ==0) {
                    return '멍텅구리 구사'
                }
                else {
                    return '구 사'
                }
            }
            if (month1 == 1 || month2 ==1) {
                return '알 리'
            }
            else {
                return '세 끗'
            }
        }
        if ((month1+month2)%10==4) {
            if (month1 == 4 || month2==4) {
                return '장 사'
            }
            else {
                return '네 끗'
            }
        }
        if ((month1+month2)%10==5) {
            if (month1 == 4 || month2 ==4) {
                return '독 사'
            }
            else {
                return '다섯 끗'
            }
        }
        if ((month1+month2)%10==6) {
            return '여섯 끗'
        }
        if ((month1+month2)%10==7) {
            return '일곱 끗'
        }
        if ((month1+month2)%10==8) {
            return '여덟 끗'
        }
        if ((month1+month2)%10==9) {
            return '갑 오'
        }
    };

    function RankNum(n) {
        switch(n) {
            case '38 광땡': return 100; 
            case '18 광땡': return 98; 
            case '13 광땡': return 98; 
            case '장 땡': return 25; 
            case '9 땡': return 24; 
            case '8 땡': return 23; 
            case '7 땡': return 22; 
            case '6 땡': return 21; 
            case '5 땡': return 20; 
            case '4 땡': return 19; 
            case '3 땡': return 18; 
            case '2 땡': return 17; 
            case '1 땡': return 16; 
            case '알 리': return 15; 
            case '독 사': return 14; 
            case '구 삥': return 13; 
            case '장 삥': return 12; 
            case '장 사': return 11; 
            case '세 륙': return 10; 
            case '갑 오': return 9; 
            case '여덟 끗': return 8; 
            case '일곱 끗': return 7; 
            case '여섯 끗': return 6; 
            case '다섯 끗': return 5; 
            case '네 끗': return 4; 
            case '세 끗': return 3; 
            case '두 끗': return 2; 
            case '한 끗': return 1; 
            case '망 통': return 0; // 일반 족보

            case '구 사': return 30; // 특수 족보
            case '멍텅구리 구사': return 31; 
            case '암행어사': return 32; 
            case '땡 잡이': return 33; 
        }
    }
    


    return (
        <div>
            <p>{who(player)}</p>
            <Card num={num1} player={player} game={game}></Card> 
            <Card num={num2} player={player} game={game}></Card>
            <p>Rank : {open}</p>
            <p>Money Left : {money} $</p>
        </div>
    );
}

export default Board;
import card1_0 from './card-img/1_1.png'; 
import card1_1 from './card-img/1_2.png';
import card2_0 from './card-img/2_1.png';
import card2_1 from './card-img/2_2.png';
import card3_0 from './card-img/3_1.png';
import card3_1 from './card-img/3_2.png';
import card4_0 from './card-img/4_1.png';
import card4_1 from './card-img/4_2.png';
import card5_0 from './card-img/5_1.png';
import card5_1 from './card-img/5_2.png';
import card6_0 from './card-img/6_1.png';
import card6_1 from './card-img/6_2.png';
import card7_0 from './card-img/7_1.png';
import card7_1 from './card-img/7_2.png';
import card8_0 from './card-img/8_1.png';
import card8_1 from './card-img/8_2.png';
import card9_0 from './card-img/9_1.png';
import card9_1 from './card-img/9_2.png';
import card10_0 from './card-img/10_1.png';
import card10_1 from './card-img/10_2.png';
import back from './card-img/back.png';

import './Card.css';

const cardImg = {
    1 : [card1_0, card1_1],
    2 : [card2_0, card2_1],
    3 : [card3_0, card3_1],
    4 : [card4_0, card4_1],
    5 : [card5_0, card5_1],
    6 : [card6_0, card6_1],
    7 : [card7_0, card7_1],
    8 : [card8_0, card8_1],
    9 : [card9_0, card9_1],
    10 : [card10_0, card10_1]
};

function Card ({num='1' , className, player,game}) { //player=1 User, player=0 Com
    let toggle = (player|!game);
    let month = Math.floor((num+1)/2);
    let special = (num+1)%2;
    let classNames = `CardBox ${className}`;
    const src = cardImg[month][special];
    if (toggle==1) { //game이 끝나면 카드 보여주기, player는 항시 보여주기
        return (
            <img src={src} alt='card' className={classNames}></img>
        );
    }
    else {
        return (
            <img src={back} alt='card' className={classNames}></img>
        );
    }
};

export default Card;
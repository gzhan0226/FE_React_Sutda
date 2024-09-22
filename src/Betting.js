import Button from './button.js';

function Betting({ MyMoney, setMoney, ComMoney, turn, setTurn, Bet, setBet, call, ComBet, setCall, setDie, Game,className}) {

    const Raise = (num) => {
        setCall(0);
        if (num > ComMoney) { //레이즈 > 상대 돈 일 떄
            num=ComMoney+ComBet-Bet;
            setBet(Bet+num);
            setMoney(MyMoney- num);
            setTurn(turn +1);
            setCall(1);
            return 0;
        }
        if (ComBet + num <= 20) {
            num = num + ComBet - Bet
            if (num > MyMoney) {
                num=MyMoney
                console.log('All in');
                setCall(1);
            }
            setMoney(MyMoney - num);
        }
        else {
            console.log('베팅 최대는 20원입니다');
            num = 20 - Bet;
            if (num > MyMoney) {
                num=MyMoney
                console.log('All in');
            }
            setMoney(MyMoney - num);
            setCall(1);
        }
        setBet(Bet + num);
        setTurn(turn + 1);
    }

    const onCall = () => {  
        if (Bet == ComBet) {
            setCall(call + 1);
            
        }
        else {
            setBet(ComBet);
            setMoney(MyMoney - ComBet + Bet);
            setCall(call+1);
        }
        setTurn(turn + 1);
    }

    const Die = () => {
        setDie(1);
    }

    return (
        <div className='betting-button'>
            <Button className={className} disabled={turn % 2 || Game==0} onClick={onCall}>Call</Button>
            <Button className={className} disabled={turn % 2 || Game==0 || ComBet==20} onClick={() => Raise(1)}>1 $</Button>
            <Button className={className} disabled={turn % 2 || Game==0 || ComBet==20} onClick={() => Raise(2)}>2 $</Button>
            <Button className={className} disabled={turn % 2 || Game==0 || ComBet==20} onClick={() => Raise(5)}>5 $</Button>
            <Button className={className} disabled={turn % 2 || Game==0 || ComBet==20} onClick={() => Raise(20)}>20 $</Button>
            <Button className={className} disabled={turn % 2 || Game==0} onClick={Die}>Die</Button>
        </div>
    );
};

export default Betting;
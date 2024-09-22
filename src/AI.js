import { useEffect } from "react";

function AI({ turn, setTurn, Bet, ComBet, setComBet, MyMoney, ComMoney, setComMoney, call, setCall, setComDie, Game, Log, setLog , MyRank, ComRank}) {


    function ComRaise() {
        setCall(0);
        let num = Math.floor(Math.random() * 3);
        switch (num) {
            case 0:
                num = 1;
                break;
            case 1:
                num = 2;
                break;
            case 2:
                num = 5;
                break;
            default:
                num = 1;
        }
        if (num > MyMoney) { //레이즈 > 상대 돈 일 떄
            setCall(1);
            num=MyMoney+Bet-ComBet;
            setComBet(ComBet+num);
            setComMoney(ComMoney- num);
            setTurn(turn +1);
            return 0;
        }
        if (Bet + num <= 20) {
            setLog(`Computer Raised ${num} $ !`)
            num = num + Bet - ComBet
            if (num>ComMoney) {
                num=ComMoney;
                setCall(1);
            }
            setComMoney(ComMoney - num);
        }
        else {
            setLog(`Maximum Bet Reached!`)
            num = 20 - ComBet;
            if (num>ComMoney) {
                num=ComMoney;
            }
            setComMoney(ComMoney - num);
            setCall(1);
        }
        setComBet(ComBet + num);
        setTurn(turn + 1);
    }

    function ComCall() {
        if (ComBet == Bet) {
            setCall(call + 1);
            
        }
        else {
            setComBet(Bet);
            setComMoney(ComMoney - Bet + ComBet);
            setCall(call+1);
        }
        setTurn(turn + 1);
        setLog("Computer Called !")
    }

    function ComDie() {
        setComDie(1);
    }

    function Ratio() {
        switch(ComRank) {
            case 100: return 100; 
            case 98: return 100; 
            case 25: return 98.5; 
            case 24: return 98; 
            case 23: return 97.5; 
            case 22: return 97; 
            case 21: return 96.5; 
            case 20: return 96; 
            case 19: return 95.5; 
            case 18: return 95; 
            case 17: return 94.5; 
            case 16: return 94; 
            case 15: return 94.5; 
            case 14: return 92.5; 
            case 13: return 90.5; 
            case 12: return 88.5; 
            case 11: return 86.5; 
            case 10: return 84.5; 
            case 9: return 80; 
            case 8: return 70; 
            case 7: return 60; 
            case 6: return 50; 
            case 5: return 40; 
            case 4: return 30; 
            case 3: return 20; 
            case 2: return 10; 
            case 1: return 0; 
            case 0: return 0; // 일반 족보

            case 30: return 101; // 구사
            case 31: return 102; //멍구사 
            case 32: return 1; //암행어사
            case 33: return 1; //땡잡이
            default : return 1;
        }
    }



    useEffect(() => { // 컴퓨터가 할 동작 관리
        if (turn % 2 == 1 && call!=2 && Game==1) {
            let time = Math.floor(Math.random()*2*700+500)
            setLog("Calculating");
            setTimeout(()=> {
                let ratio = Ratio();
                var cnt=0;
                let n=0;
                while (n<10) {
                    let x = Math.floor(Math.random()*100);
                    if (x < ratio) {
                        cnt=cnt+1;
                    }
                    n++;
                }
                var result;
                if (cnt>5) {
                    result=0;
                    if (Bet==20) {
                        result=1;
                    }
                }
                else if (cnt >3 && cnt<6) {
                    result=1;
                }
                else {
                    result=2;
                }
                cnt=0;
                switch(result) {
                    case 0 : 
                        ComRaise();
                        break;
                    case 1 : 
                        ComCall();
                        break;
                    case 2 :
                        if (turn==1) {
                            ComCall();
                            break;
                        }
                        else {
                            ComDie();
                            break;
                        }
                    default : ComRaise();
                }
            },time);
        }
    },[turn]);

    return (
        <div>
            <p>컴퓨터 베팅 : {ComBet}</p>
        </div>
    )
}

export default AI;
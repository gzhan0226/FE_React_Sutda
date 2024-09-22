import Button from "./button.js";
import Board from "./Board.js";
import Betting from "./Betting.js";
import AI from "./AI.js";
import { useState, useEffect } from 'react';
import "./App.css";
import Spinner from './card-img/spin.gif';



function App() { // AI 구현

  const [num, setNum] = useState([]);
  const [MyRank, setMyRank] = useState(0);
  const [ComRank, setComRank] = useState(0);
  const [MyMoney, setMyMoney] = useState(100);
  const [ComMoney, setComMoney] = useState(100);
  const [Bet, setBet] = useState(0);
  const [ComBet, setComBet] = useState(0);
  const [turn, setTurn] = useState(0);
  const [call, setCall] = useState(0);
  const [Game, setGame] = useState(0);
  const [Die, setDie] = useState(0);
  const [ComDie, setComDie] = useState(0);
  const [Log, setLog] = useState("Press Start !");

  function Roll() { //패 돌리기
    var card = [];
    var index = 0;
    while (index < 4) {
      let n = Math.floor((Math.random() * 20)) + 1;
      if (!sameNum(n)) {
        card.push(n);
        index++;
      }
    }
    function sameNum(n) {
      for (let i = 0; i < card.length; i++) {
        if (card[i] === n) {
          return 1;
        }
      }
    }
    setNum(card);
    setCall(0);
  };

  function Reset() { // State 초기화
    setMyMoney(100);
    setComMoney(100);
    setBet(0);
    setComBet(0);
    setTurn(0);
    setCall(0);
    setGame(0);
    setLog("Game Reset !")
    }


  function Win(my, com) { // -1: 패배 , 0: 무승부 , 1: 승리 (플레이어)

    var nums = exchange(my, com);
    var m = nums[0];
    var c = nums[1];

    function exchange(num1, num2) {
      if (num1 == 33 && num2 < 16) { // 땡잡이 처리
        num1 = 0;
      }
      if (num2 == 33 && num1 < 16) {
        num2 = 0;
      }
      if (num1 == 32) { // 암행어사 처리
        if (num2 > 90) {
          num1 = 99;
        }
        else {
          num1 = 1;
        }
      }
      if (num2 == 32) {
        if (num1 > 90) {
          num2 = 99;
        }
        else {
          num2 = 1;
        }
      }
      if (num1 == 30) { // 구사 처리
        if (num2 > 15) {
          num1 = 0;
        }
      }
      if (num2 == 30) {
        if (num1 > 15) {
          num2 = 0;
        }
      }
      if (num1 == 31) { // 멍텅구리 구사
        if (num2 > 24) {
          num1 = 0;
        }
      }
      if (num2 == 31) {
        if (num1 > 24) {
          num2 = 0;
        }
      }
      return [num1, num2];
    }
    if (m == 30 || m == 31) { // 구사인 경우 무승부, 이외에는 값의 크기로 승패 처리
      return 0;
    }
    if (c == 30 || c == 31) {
      return 0;
    }
    if (m > c) {
      return 1;
    }
    if (m == c) {
      return 0;
    }
    if (m < c) {
      return -1;
    }
  }

  function gameStart() {
    Roll();
    setCall(0);
    setGame(1);
    setMyMoney(MyMoney - 1);
    setBet(1);
    setComMoney(ComMoney - 1);
    setComBet(1);
    setTurn(turn + 2);
    setLog("Game Started !")
  }

  function Loading() {
    if (turn % 2 == 1 && call!=2 && Game==1) {
      return (
        <img src={Spinner} alt="로딩" className="spinner"></img>
      )
    }
  }

  function end() {
    setBet(0);
    setComBet(0);
    setCall(0);
    setGame(0);
  }

  /*useEffect(() => {
    console.log(`나 : ${MyRank}`);
    console.log(`상대 : ${ComRank}`);
  }, [MyRank, ComRank]); */


  useEffect(() => {    // 콜을 했을 때 게임 종료 // 이긴 사람이 선
    if (call == 2) {
      const result = Win(MyRank, ComRank);
      if (result == 1) {
        setLog(`Player Won ! +${ComBet}$`)
        setMyMoney(MyMoney + Bet + ComBet);
        end();
        setTurn(0);
      }
      if (result == 0) {
        setMyMoney(MyMoney + Bet);
        setComMoney(ComMoney + ComBet);
        end();
        setTurn(0);
        setLog("Draw !")
      }
      if (result == -1) {
        setLog(`Player Lost ! -${Bet}$`)
        setComMoney(ComMoney + Bet + ComBet);
        end();
        setTurn(-1);
      }
    }
  }, [call]);

  useEffect(() => { // 다이 했을 때 게임 종료 // 이긴 사람이 선
    if (Die == 1) {
      setLog(`Player Died ! -${Bet}$`)
      setComMoney(ComMoney + Bet + ComBet);
      end();
      setTurn(-1);
    }
    if (ComDie == 1) {
      setLog(`Computer Died ! +${ComBet}$`)
      setMyMoney(MyMoney + Bet + ComBet);
      end();
      setTurn(0);
    }
    setDie(0);
    setComDie(0);
    setGame(0);
  }, [Die, ComDie]);

  useEffect(()=> {
    if (Game==0 && ComMoney==0) {
      setLog("Player Win, Thanks for Playing!")
      setGame(1);
    }
    if (Game==0 && MyMoney==0) {
      setLog("Computer Win, Try better Next Time!")
      setGame(1);
    }
  })

  return (
    <div className="Main">
      <div className="Game">
        <div className="start-button">
          <Button className="button-28" disabled={Game} onClick={gameStart}>Start Game</Button>
          <Button className="button-28" onClick={Reset}>Reset</Button>
        </div>
        <Board num1={num[2]} num2={num[3]} player={0} setter={setComRank} money={ComMoney} game={Game}></Board>
        <AI turn={turn} setTurn={setTurn} MyMoney={MyMoney} Bet={Bet} ComBet={ComBet} setComBet={setComBet} ComMoney={ComMoney} setComMoney={setComMoney} call={call} setCall={setCall}
          setComDie={setComDie} Game={Game} Log={Log} setLog={setLog} MyRank={MyRank} ComRank={ComRank}></AI>
        <Betting className="button-28" MyMoney={MyMoney} setMoney={setMyMoney} ComMoney={ComMoney} turn={turn} setTurn={setTurn} Bet={Bet} setBet={setBet} ComBet={ComBet} call={call} setCall={setCall}
          setDie={setDie} Game={Game}></Betting>
           <p>내 베팅 : {Bet}</p>
        <Board num1={num[0]} num2={num[1]} player={1} setter={setMyRank} money={MyMoney} game={Game}></Board>
      </div>
      <div className="Option">
        <Loading></Loading>
        <p className="log">{Log}</p> 
      </div>
    </div>
  );
};

export default App;

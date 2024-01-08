import React from "react";
import dice1 from "./img/dice1.png";
import dice2 from "./img/dice2.png";
import dice3 from "./img/dice3.png";
import dice4 from "./img/dice4.png";
import dice5 from "./img/dice5.png";
import dice6 from "./img/dice6.png";
import select from "./img/select.jpeg";

interface PiggieState {
  scores: number[];
  currentScore: number;
  activePlayer: number;
  playing: boolean;
}

export default class Piggie extends React.Component<{}, PiggieState> {
  private player0El: Element | null = null;
  private player1El: Element | null = null;
  private score0El: Element | null = null;
  private score1El: Element | null = null;
  private current0El: Element | null = null;
  private current1El: Element | null = null;
  private diceEl: HTMLImageElement | null = null;
  private btnNew: HTMLButtonElement | null = null;
  private btnRoll: HTMLButtonElement | null = null;
  private btnHold: HTMLButtonElement | null = null;

  constructor(props: {}) {
    super(props);

    this.state = {
      scores: [0, 0],
      currentScore: 0,
      activePlayer: 0,
      playing: true,
    };
  }

  componentDidMount() {
    this.player0El = document.querySelector('.player--0');
    this.player1El = document.querySelector('.player--1');
    this.score0El = document.getElementById('score--0');
    this.score1El = document.getElementById('score--1');
    this.current0El = document.getElementById('current--0');
    this.current1El = document.getElementById('current--1');
    this.diceEl = document.querySelector('.dice');
    this.btnNew = document.querySelector('.btn--new');
    this.btnRoll = document.querySelector('.btn--roll');
    this.btnHold = document.querySelector('.btn--hold');

    if (this.btnRoll && this.btnHold && this.btnNew) {
      this.btnRoll.addEventListener('click', this.handleRollClick);
      this.btnHold.addEventListener('click', this.handleHoldClick);
      this.btnNew.addEventListener('click', this.handleNewClick);
    }
  }

  componentWillUnmount() {
    if (this.btnRoll && this.btnHold && this.btnNew) {
      this.btnRoll.removeEventListener('click', this.handleRollClick);
      this.btnHold.removeEventListener('click', this.handleHoldClick);
      this.btnNew.removeEventListener('click', this.handleNewClick);
    }
  }

  init = () => {
    this.setState({
      scores: [0, 0],
      currentScore: 0,
      activePlayer: 0,
      playing: true,
    });

    if (this.score0El && this.score1El && this.current0El && this.current1El) {
      (this.score0El as HTMLElement).textContent = '0';
      (this.score1El as HTMLElement).textContent = '0';
      (this.current0El as HTMLElement).textContent = '0';
      (this.current1El as HTMLElement).textContent = '0';
    }

    if (this.diceEl) {
      this.diceEl.classList.add('hidden');
    }

    if (this.player0El && this.player1El) {
      this.player0El.classList.remove('player--winner');
      this.player1El.classList.remove('player--winner');
      this.player0El.classList.add('player--active');
      this.player1El.classList.remove('player--active');
    }
  };

  switchPlayer = () => {
    const { activePlayer } = this.state;

    if (this.current0El && this.current1El) {
      (document.getElementById(`current--${activePlayer}`) as HTMLElement).textContent = '0';
      this.setState((prevState) => ({
        currentScore: 0,
        activePlayer: prevState.activePlayer === 0 ? 1 : 0,
      }));

      if (this.player0El && this.player1El) {
        this.player0El.classList.toggle('player--active');
        this.player1El.classList.toggle('player--active');
      }
    }
  };


		handleRollClick = () => {
      const { playing, activePlayer, currentScore } = this.state;

      if (playing && this.diceEl) {
        const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];
        const diceIndex = Math.floor(Math.random() * 6);

        this.diceEl.classList.remove('block');
        this.diceEl.src = diceImages[diceIndex];

        if (diceIndex + 1 !== 1) {
          this.setState({
            currentScore: currentScore + diceIndex + 1,
          });
        } else {
          this.switchPlayer();
        }
      }
	};

  handleHoldClick = () => {
    const { playing, activePlayer, currentScore, scores } = this.state;

    if (playing) {
      scores[activePlayer] += currentScore;

      if (this.score0El && this.score1El) {
        (this.score0El as HTMLElement).textContent = `${scores[0]}`;
        (this.score1El as HTMLElement).textContent = `${scores[1]}`;
      }

      if (scores[activePlayer] >= 100) {
        this.setState({
          playing: false,
        });

        if (this.diceEl && this.player0El && this.player1El) {
          this.diceEl.classList.add('hidden');
          document.querySelector(`.player--${activePlayer}`)?.classList.add('player--winner');
          document.querySelector(`.player--${activePlayer}`)?.classList.remove('player--active');
        }
      } else {
        this.switchPlayer();
      }
    }
  };


  handleNewClick = () => {
    this.init();
  };

  render() {
    return (
      <div className=" w-full h-[100vh] grid place-items-center bg-slate-400">
        <main>
          <section className="player player--0 player--active">
            <h2 className="name" id="name--0">
              Player 1
            </h2>
            <p className="score" id="score--0">
              0
            </p>
            <div className="current">
              <p className="current-label">Current</p>
              <p className="current-score" id="current--0">
                0
              </p>
            </div>
          </section>
          <section className="player player--1">
            <h2 className="name" id="name--1">
              Player 2
            </h2>
            <p className="score" id="score--1">
              0
            </p>
            <div className="current">
              <p className="current-label">Current</p>
              <p className="current-score" id="current--1">
                0
              </p>
            </div>
          </section>

          <img src={select} alt="Playing dice" className="dice" />
          <button className="btn btn--new" onClick={this.handleNewClick}>
            🔄 New game
          </button>
          <button className="btn btn--roll" onClick={this.handleRollClick}>
            🎲 Roll dice
          </button>
          <button className="btn btn--hold" onClick={this.handleHoldClick}>
            📥 Hold
          </button>
        </main>
      </div>
    );
  }
}

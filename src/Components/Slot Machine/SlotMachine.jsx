import "./slotMachine.css";
import React from "react";
import { useState, useRef } from "react";
import arrowleft from "../../res/arrowleft.png";
import arrowright from "../../res/arrowright.png";

const SlotMachine = () => {
  const defaultState = {
    items: [
      "🍒",
      "🍉",
      "🍊",
      "🍓",
      "🍇",
      "🥝",
      "⭐",
      "💎",
      "🎱",
      "🍒",
      "🍉",
      "🍊",
      "🍓",
      "🍇",
      "🥝",
      "⭐",
      "💎",
      "🎱",
      "🍒",
      "🍉",
      "🍊",
      "🍓",
      "🍇",
      "🥝",
      "⭐",
      "💎",
      "🎱",
      "🍒",
      "🍉",
      "🍊",
      "🍓",
      "🍇",
      "🥝",
      "⭐",
      "💎",
      "🎱",
    ],
  };
// eslint-disable-next-line
  const [currState, setCurrState] = useState({
    Item1: "🍒",
    Item2: "🍒",
    Item3: "🍒",
  });
  const [rolling, setRolling] = useState(false);

  const slotRef = [useRef(), useRef(), useRef()];

  // to trigger  and maintain rolling state
  const roll = () => {
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
    }, 700);

    // looping through all 3 slots to start rolling
    slotRef.forEach((slot, i) => {
      const selected = triggerSlotRotation(slot.current);
      setCurrState((prev) => ({ ...prev, [`Item${i + 1}`]: selected }));
    });
  };

  // this will create a rolling effect and return random selected option
  const triggerSlotRotation = (ref) => {
    function setTop(top) {
      ref.style.top = `${top}px`;
    }
    let options = ref.children;
    let randomOption = Math.floor(
      Math.random() *
        (defaultState.items.length - 3 > 2 ? defaultState.items.length - 3 : 5)
    );
    let choosenOption = options[randomOption];
    //This will set the new offset property
    setTop(-choosenOption.offsetTop + 62);
    return defaultState.items[randomOption];
  };

  return (
    <div className="mainContainer">
      {/* //These are the arrows  */}
      <img src={arrowleft} className="arrow arrowLeft" alt="" />
      <img src={arrowright} className="arrow arrowRight" alt="" />
      <div className="slotMachine">
        {/* //These are the center bars */}
        <div className="centerBar centerBar1"></div>
        <div className="centerBar centerBar2"></div>

        <div className="slot">
          <section>
            <div className="container" ref={slotRef[0]}>
              {defaultState.items.map((fruit, i) => (
                <div key={i}>
                  <span>{fruit}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="slot">
          <section>
            <div className="container" ref={slotRef[1]}>
              {defaultState.items.map((fruit) => (
                <div>
                  <span>{fruit}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="slot">
          <section>
            <div className="container" ref={slotRef[2]}>
              {defaultState.items.map((fruit) => (
                <div>
                  <span>{fruit}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="spinOuter">
        <div className="spinBorder">
          <div
            className={"roll"}
            onClick={!rolling ? roll : null}
            disabled={rolling}
          >
            Spin
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;

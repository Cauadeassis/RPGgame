import React from "react";
import styles from "../styles/game.module.css";

export default function game() {
    return (
        <div className={styles.body}>
            <div className={styles.gameContainer}>
                <div id="gameHeader">
                    <h1 id="countryName">Inglaterra</h1>
                    <div id="stats">
                        <div class="singleStat" id="ecologyDiv">
                            Ecologia: <span class="singleStatSpan" id="ecology"></span>
                        </div>
                        <div class="singleStat" id="populationDiv">
                            População:
                            <span class="singleStatSpan" id="population"></span>
                        </div>
                        <div class="singleStat" id="armyDiv">
                            Exército: <span class="singleStatSpan" id="army"></span>
                        </div>
                        <div class="singleStat" id="economyDiv">
                            Economia: <span class="singleStatSpan" id="economy"></span>
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardText}></div>
                    <div className={styles.cardOptions}>
                        <button id="rightButton"></button>
                        <button id="leftButton"></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
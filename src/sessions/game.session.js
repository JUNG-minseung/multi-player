import Game from "../../classes/models/game.class.js"
import { gameSessions } from "./session.js";



export const addGameSession = (id) => {
    const session = new Game();
    gameSessions.push(session);
    return session;
}

export const removeGameSession = () => {

};

export const getGameSession = () => {
    return gameSessions[0];
};
import { getGameSession } from "../../sessions/game.session.js";

export const locationUpdateHandler = ({socket, userId, payload}) => {
    try {
        const { x, y } = payload;
        const gameSession = getGameSession();

        if (!gameSession) {
            console.error('game Session not Found');
        }

        const user = gameSession.getUser(userId);
        if(!user){
            console.error('user NOT FOUND');
        }

        user.updatePosition(x,y);

        const loactionData = gameSession.getAllLocation(userId);

        socket.write(loactionData);

    } catch(e) {
        console.error(e);
    }
};

export default locationUpdateHandler;
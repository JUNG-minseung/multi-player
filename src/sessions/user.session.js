import User from "../../classes/models/user.class.js";
import { userSesssions } from "./session.js";

export const addUser = (socket, id, playerId, latencty) => {
    const user = new User(socket, id, playerId, latencty);
    userSesssions.push(user);
    return user;
};

export const removeUser = (socket) => {
    const index = userSesssions.findIndex((user) => user.socket === socket);
        if (index != -1) {
            return userSesssions.splice(index,1) [0];
        }
}

export const getAllUser = () => {
    return userSesssions;
}
import config from "../config/config.js";

import jwt from "jsonwebtoken"

export function createAccessToken({userId, role}){
    const accessToken = jwt.sign({
        userId, role
    }, config.ACCESS_TOKEN_SECRECT, {expiresIn: "15Min"})

    return accessToken
}


export function createRefreshToken({userId, role}){
    const refreshToken = jwt.sign({
        userId, role
    }, config.ACCESS_TOKEN_SECRECT, {expiresIn: "7Days"})

    return refreshToken
}

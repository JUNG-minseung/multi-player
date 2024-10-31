import { getProtoMessages } from "../../init/loadProto.js"
import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from "../../src/constants/header.js";

export const createResponse = (handerId, responseCode, data = null) => {
    const protoMessages = getProtoMessages();
    const Response = protoMessages.response.Response;

    const response= {
        handerId,
        responseCode,
        data: data? Buffer.from(JSON.stringify(data)) : null,
    };

    const buffer = Response.encode(response).finish();

    const packetLength = Buffer.alloc(TOTAL_LENGTH);
    packetLength.writeUInt32BE(buffer.length + TOTAL_LENGTH + PACKET_TYPE_LENGTH, 0);

    const packetType = Buffer.alloc(PACKET_TYPE_LENGTH);
    packetType.writeBigInt8(PACKET_TYPE.NORMAL,0);

    return Buffer.concat([packetLength, packetType, buffer]);
};
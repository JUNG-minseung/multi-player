import { getProtoMessages } from "../../init/loadProto.js";
import { getProtoTypeNameByHandlerId } from "../../src/handler/index.js";

export const packetParser = (data) => {
    const protoMessages = getProtoMessages();

    const commonPacket = protoMessages.common.Packet;
    let packet;
    try {
        packet = commonPacket.decode(data);
    } catch(e) {
        console.error(e);
    }

    const handerId= packet.handerId;
    const userId = packet.userId;
    const clientVersion = packet.clientVersion;

    if(clientVersion !== CLIENT_VERSION) {
        throw Error();
    }

    const protoTypeName = getProtoTypeNameByHandlerId(handerId);
    if(!protoTypeName) {
        throw Error();
    }

    const [namespace, typeName] = protoTypeName.split('.');
    const payloadType = protoMessages[namespace][typeName];

    let payload;

    try{
        payload= payloadType.decode(packet.payload);
    } catch(e){
        console.Error(e);
    }

    const expectedFields = Object.keys(payloadType.fields);
    const actualFields = Object.keys(payload);
    const missingFields = expectedFields.filter((field) => !actualFields.includes(field));

    if(missingFields > 0) {
        throw Error();
    }

    return { handerId, userId, payload };

};
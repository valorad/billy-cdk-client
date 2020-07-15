import { CUDMessage } from "./cudmessage.interface";
import { CDKey } from "./cdkey.interface";

export interface CDKeyCUDMessage extends CUDMessage {
  instance?: CDKey,
}
import { RawData } from 'ws';

export default interface IController {
  execute: (data: RawData) => void;
}

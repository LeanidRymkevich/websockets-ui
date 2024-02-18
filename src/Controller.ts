import IController from '@src/types/interfaces/IController';
import { RawData } from 'ws';

export default class Controller implements IController {
  public static readonly instance: IController = new Controller();

  private constructor() {}

  public static getInstance = (): IController => this.instance;

  public execute: (data: RawData) => void;
}

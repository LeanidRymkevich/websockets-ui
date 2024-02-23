import { IPlayerParams } from '@src/types/types';

export default class RegistrationError extends Error {
  public constructor({ password, login }: IPlayerParams) {
    const msg = `Password "${password}" is not valid for player with login "${login}"`;
    super(msg);
  }
}

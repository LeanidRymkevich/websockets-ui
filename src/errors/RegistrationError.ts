import { IPlayerParams } from '@src/types/types';

export default class RegistrationError extends Error {
  public constructor({ password, name }: IPlayerParams) {
    const msg = `Password "${password}" is not valid for player with login "${name}"`;
    super(msg);
  }
}

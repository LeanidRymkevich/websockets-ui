export default abstract class AbstractController<
  T extends string | number | symbol,
  K,
> {
  protected readonly commands: Record<T, K>;

  public constructor(commands: Record<T, K>) {
    this.commands = commands;
  }

  public haveCommand = (commandName: string): boolean => {
    return Object.keys(this.commands).includes(commandName);
  };
}

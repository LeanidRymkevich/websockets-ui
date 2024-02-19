export default abstract class AbstractController {
  protected findCommand = <K>(
    command: string,
    map: Record<string | number | symbol, K>
  ): string | undefined => {
    return Object.keys(map).find((name: string) => name === command);
  };
}

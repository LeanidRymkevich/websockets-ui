const extractErrorMsg = (err: unknown, altMsg: string): string => {
  return err instanceof Error ? err.message || altMsg : altMsg;
};

export { extractErrorMsg };

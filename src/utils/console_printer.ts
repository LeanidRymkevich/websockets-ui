const printHttpServerStartMsg = (port: number) => {
  console.log(`Start static http server on the ${port} port!\n`);
};

const printHttpServerErrorMsg = (port: number, error: Error): void => {
  console.log(`Error in http server: ${error.message || 'unknown error'}.`);
  console.log(`Close http server on on the ${port} port!\n`);
};

const printWssStartMsg = (port: number) => {
  console.log(`Start web socket server on on the ${port} port!\n`);
};

const printWssErrorMsg = (port: number, error: Error): void => {
  console.log(`Error in web socket: ${error.message || 'unknown error'}.`);
  console.log(`Close web socket server on on the ${port} port!\n`);
};

const printNewSocketMsg = (id: string): void => {
  console.log(`New socket connected.ID ${id}\n`);
};

const printCloseSocketMsg = (id: string): void => {
  console.log(`Socket with ID ${id} was closed.\n`);
};

const printErrorSocketMsg = (id: string, error: Error): void => {
  console.log(
    `Error in socket with ID ${id}: ${error.message || 'unknown error'}.\n`
  );
};

export {
  printHttpServerStartMsg,
  printHttpServerErrorMsg,
  printWssStartMsg,
  printWssErrorMsg,
  printNewSocketMsg,
  printCloseSocketMsg,
  printErrorSocketMsg,
};

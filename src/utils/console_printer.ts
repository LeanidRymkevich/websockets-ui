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

const printNewSocketMsg = (socketNum: number): void => {
  console.log('New socket connection!');
  console.log(`Total amount of sockets: ${socketNum}.\n`);
};

const printCloseSocketMsg = (socketNum: number): void => {
  console.log('Socket was closed!');
  console.log(`Total amount of sockets: ${socketNum}.\n`);
};

const printErrorSocketMsg = (socketNum: number, error: Error): void => {
  console.log(`Error in socket: ${error.message || 'unknown error'}.`);
  console.log(`Total amount of sockets: ${socketNum}.\n`);
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

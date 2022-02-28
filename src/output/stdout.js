export function createOutputStdout() {
  return (s) => {
    console.log(s);
  };
}

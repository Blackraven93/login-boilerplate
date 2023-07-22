type Direction = "reverse" | "forward";
type MakeArray<T> = (
  size: number,
  start?: number,
  direction?: Direction
) => Array<T>;

const makeArray: MakeArray<string | number> = (
  size,
  start = 0,
  direction = "forward"
) => {
  return Array.from({ length: size }, (v, i) =>
    direction === "reverse" ? start - i : start + i
  );
};

export default makeArray;

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const rollDie = () => {
  return getRandomInt(1, 6);
};

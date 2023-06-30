export const similarValues = (array1, array2) => {
  const similarValues = array1.filter((element) =>
    array2.some((item) => item.includes(element))
  );
  return similarValues;
};

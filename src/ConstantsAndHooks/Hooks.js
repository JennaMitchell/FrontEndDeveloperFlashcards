function useRandomSort(arrayToBeSorted) {
  arrayToBeSorted.sort(() => Math.random() - 0.5);

  return arrayToBeSorted;
}

export default useRandomSort;

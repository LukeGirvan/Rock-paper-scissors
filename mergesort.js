function mergeSort(arr) {
    // Base case: if the array has zero or one element, it's already sorted
    if (arr.length <= 1) {
      return arr;
    }
  
    // Divide the array into two roughly equal halves
    const middle = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, middle);
    const rightHalf = arr.slice(middle);
  
    // Recursively sort the left and right halves
    const sortedLeft = mergeSort(leftHalf);
    const sortedRight = mergeSort(rightHalf);
  
    // Merge the sorted halves back together
    return merge(sortedLeft, sortedRight);
  }
  
  function merge(left, right) {
    const mergedArr = [];
    let i = 0; // index for left array
    let j = 0; // index for right array
  
    // Compare elements from each sublist and add the smaller one to the merged array
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        mergedArr.push(left[i]);
        i++;
      } else {
        mergedArr.push(right[j]);
        j++;
      }
    }
  
    // Add any remaining elements from the left or right sublist
    while (i < left.length) {
      mergedArr.push(left[i]);
      i++;
    }
    while (j < right.length) {
      mergedArr.push(right[j]);
      j++;
    }
  
    return mergedArr;
  }
  
  // Example usage
  const unsortedArray = [8, 4, 2, 1, 5, 3, 7, 6];
  const sortedArray = mergeSort(unsortedArray);
  console.log(sortedArray); // Output: [1, 2, 3, 4, 5, 6, 7, 8]
  
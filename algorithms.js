async function selectionSortUnstable() {
    let array = [...g_arr];
    let id = "span_selection_u";
    reset(id);

    for (let i = 0; i < barQty(); i++) {
        await sleep(delay_fast_ms);

        let min_i = i;
        let j;

        for (j = i + 1; j < barQty(); j++) {
            if (array[j] < array[min_i]) {
                min_i = j;
            }
        }

        // swap elements
        let temp = array[min_i];

        array[min_i] = array[i];
        $(id + min_i).style.height = toPxHeight(array[i]);

        array[i] = temp;
        $(id + i).style.height = toPxHeight(temp);
    }
}

async function selectionSortUnstableSlow() {
    let array = [...g_arr];
    let id = "span_selection_u";

    reset(id);

    for (let i = 0; i < barQty(); i++) {
        let min_i = i;
        let j;
        for (j = i + 1; j < barQty(); j++) {
            $(id + min_i).style.backgroundColor = "green";
            $(id + j).style.backgroundColor = "blue";

            if (array[j] < array[min_i]) {
                await sleep(delay_slow_ms);
                $(id + min_i).style.backgroundColor = "gray";
                $(id + j).style.backgroundColor = "green";
                min_i = j;
            } else {
                await sleep(delay_slow_ms);
                $(id + j).style.backgroundColor = "gray";
            }
        }

        await sleep(delay_slow_ms);

        $(id + min_i).style.backgroundColor = "gray";
        $(id + i).style.backgroundColor = "black"; // already sorted

        // swap elements
        let temp = array[min_i];

        array[min_i] = array[i];
        $(id + min_i).style.height = toPxHeight(array[i]);

        array[i] = temp;
        $(id + i).style.height = toPxHeight(temp);

        // reset
        for (let k = i + 1; k < barQty(); k++) {
            $(id + k).style.backgroundColor = "red";
        }
    }
}

async function selectionSortStable() {
    let array = [...g_arr];
    let id = "span_selection_s";

    reset(id);
    
    for (let i = 0; i < barQty(); i++) {
        await sleep(delay_fast_ms);

        let min_i = i;
        for (let j = i + 1; j < barQty(); j++) {
            if (array[j] < array[min_i]) {
                min_i = j;
            }
        }

        // push elements
        let min = array[min_i];
        let min_heigth = $(id + min_i).style.height;
        for (let m = min_i; m > i; m--) {
            array[m] = array[m - 1];
            $(id + m).style.height = toPxHeight(array[m - 1]);

            array[m-1] = min;
            $(id + (m - 1)).style.height = toPxHeight(min);
        }

        array[i] = min;
        $(id + i).style.height = toPxHeight(min);
    }
}

async function bubbleSort() {
    let array = [...g_arr];
    let id = "span_bubble";

    reset(id);

    let sort_incomplete = true;
    while (sort_incomplete) {
        await sleep(delay_fast_ms);
        
        sort_incomplete = false;
        for (let i = 0; i < barQty() - 1; i++) {
            if (array[i + 1] < array[i]) {
                let temp = array[i];

                array[i] = array[i + 1];
                $(id + i).style.height = toPxHeight(array[i + 1]);

                array[i + 1] = temp;
                $(id + (i + 1)).style.height = toPxHeight(temp);

                sort_incomplete = true;
            }
        }
    }
}

async function insertionSort() {
    let array = [...g_arr];
    let id = "span_insertion";

    reset(id);

    for (let i = 1; i < barQty(); i++) {
        await sleep(delay_fast_ms);

        let j = i-1;
        if (array[i] < array[j]) {
            while (array[i] < array[j] && j >= 0) {
                j--;
            }

            if (array[i] < array[j+1]) {
                j++;
            }

            // shift bars to the right
            let min = array[i];           
            for (let m = i; m > j; m--) {
                array[m] = array[m - 1];
                $(id + m).style.height = toPxHeight(array[m - 1]);

                array[m - 1] = min;
                $(id + (m - 1)).style.height = toPxHeight(min);
            }            
        }
    }
}

function mergeSort() {
    let array = [...g_arr];
    let id = "span_merge";
    reset(id);

    let helperArray = [];

    for (let i = 0; i < barQty(); i++) {
        helperArray[i] = [i, array[i]];
    }

    sort(helperArray, array, id);
}
// https://stackabuse.com/merge-sort-in-javascript/
async function merge(left, right, array, id) {
    let arr = [];    

    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
        if (left[0][1] < right[0][1]) {
            arr.push(left.shift())
        } else {
            let min = right[0][1];
            let id_min = right[0][0];
            let id_swap = left[0][0];
            for (let i = id_min; i > id_swap; i--) {
                array[i] = array[i - 1];
                $(id + i).style.height = toPxHeight(array[i - 1]);

                array[i-1] = min;
                $(id + (i - 1)).style.height = toPxHeight(min);
            }

            right[0][0] = id_swap;

            for (let i = 0; i < left.length; i++) {
                left[i][0]++;
            }
            
            arr.push(right.shift());
        }
        
        await sleep(delay_fast_ms);
    }
   
    return [ ...arr, ...left, ...right ];
}
async function sort(helperArray, array, id) {
    const half = Math.ceil(helperArray.length / 2);

    // Base case or terminating case
    if (helperArray.length < 2) {
        return helperArray;
    }

    const left = helperArray.splice(0, half);

    return await merge(await sort(left, array, id), await sort(helperArray, array, id), array, id);
}

function quickSort() {
    let array = [...g_arr];

    let id = "span_quick";
    reset(id);

    quick(array, 0, barQty() - 1, id);
}
async function quick(array, low, high, id) {
    if (low < high) {
        let pi = await partition(array, low, high, id);

        await quick(array, low, pi - 1, id);
        await quick(array, pi + 1, high, id);
    }
}
async function partition(array, low, high, id) {
    let pivot = array[high];  
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        if (array[j] < pivot) {
            await sleep(delay_fast_ms);
            
            i++;   
            let temp = array[i];

            array[i] = array[j];
            $(id + i).style.height = toPxHeight(array[j]);

            array[j] = temp;
            $(id + j).style.height = toPxHeight(temp);
        }
    }

    let temp = array[i + 1];

    array[i + 1] = array[high];
    $(id + (i + 1)).style.height = toPxHeight(array[high]);

    array[high] = temp;
    $(id + high).style.height = toPxHeight(temp);

    return (i + 1);
}

async function heapSort() {
    let array = [...g_arr];
    let id = "span_heap";
    reset(id);

    let array_length = barQty();

    for (let i = Math.floor(array_length / 2); i >= 0; i -= 1) {
        await heap_root(array, i, array_length, id);
    }

    for (let i = array_length - 1; i > 0; i--) {
        await swap(array, 0, i, id);
        array_length--;
      
        await heap_root(array, 0, array_length, id);
    }
}
async function heap_root(input, i, array_length, id) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let max = i;

    if (left < array_length && input[left] > input[max]) {
        max = left;
    }

    if (right < array_length && input[right] > input[max]) {
        max = right;
    }

    if (max != i) {
        await swap(input, i, max, id);
        await heap_root(input, max, array_length, id);
    }
}
async function swap(input, index_A, index_B, id) {
    var temp = input[index_A];

    await sleep(delay_fast_ms);

    input[index_A] = input[index_B];
    $(id + index_A).style.height = toPxHeight(input[index_B]);

    input[index_B] = temp;
    $(id + index_B).style.height = toPxHeight(temp);
}

// https://medium.com/weekly-webtips/cocktail-sort-in-javascript-6b645c59ecea
async function cocktailSort() {
    let array = [...g_arr];
    let id = "span_cocktail";
    reset(id);


    let start = 0, end = barQty(), swapped = true;

    while (swapped) {
        swapped = false;
        for (let i = start; i < end - 1; i++) {
            if (array[i] > array[i + 1]) {
                await sleep(delay_fast_ms);
                let temp = array[i];

                array[i] = array[i + 1];
                $(id + i).style.height = toPxHeight(array[i + 1]);

                array[i + 1] = temp;
                $(id + (i + 1)).style.height = toPxHeight(temp);

                swapped = true;
            }
        }

        end--;

        if (!swapped) {
            break;
        }
    
        swapped = false;
        for (let i = end - 1; i > start; i--) {
            if (array[i - 1] > array[i]) {
                await sleep(delay_fast_ms);

                let temp = array[i];

                array[i] = array[i - 1];
                $(id + i).style.height = toPxHeight(array[i - 1]);

                array[i - 1] = temp;
                $(id + (i - 1)).style.height = toPxHeight(temp);

                swapped = true;
            }
        }

        start++;
    }
}

// https://www.growingwiththeweb.com/sorting/radix-sort-lsd/
async function radixSort() {
    let array = [...g_arr];
    let id = "span_radix";
    reset(id);

    let radix = 2;

    // Determine minimum and maximum values
    let minValue = array[0];
    let maxValue = array[0];
    for (let i = 1; i < barQty(); i++) {
        if (array[i] < minValue) {
            minValue = array[i];
        } else if (array[i] > maxValue) {
            maxValue = array[i];
        }
    }

    // Perform counting sort on each exponent/digit, starting at the least
    // significant digit
    let exponent = 1;
    while ((maxValue - minValue) / exponent >= 1) {
        array = await countingSortByDigit(array, radix, exponent, minValue, id);

        exponent *= radix;
    }
}
async function countingSortByDigit(array, radix, exponent, minValue, id) {
    let i;
    let bucketIndex;
    let buckets = new Array(radix);
    let output = new Array(barQty());

    // Initialize bucket
    for (i = 0; i < radix; i++) {
        buckets[i] = 0;
    }

    // Count frequencies
    for (i = 0; i < barQty(); i++) {
        bucketIndex = Math.floor(((array[i] - minValue) / exponent) % radix);
        buckets[bucketIndex]++;
    }

    // Compute cumulates
    for (i = 1; i < radix; i++) {
        buckets[i] += buckets[i - 1];
    }

    // Move records
    for (i = barQty() - 1; i >= 0; i--) {
        bucketIndex = Math.floor(((array[i] - minValue) / exponent) % radix);
        output[--buckets[bucketIndex]] = array[i];
        // await sleep(delay_fast_ms);
        // $(id + buckets[bucketIndex]).style.height = toPxHeight(array[i]);
    }

    // Copy back
    for (i = 0; i < barQty(); i++) {
        array[i] = output[i];
        await sleep(delay_fast_ms);
        $(id + i).style.height = toPxHeight(output[i]);
    }

    return array;
}

// Helpers
function reset(id) {
    for (let i = 0; i < barQty(); i++) {
        $(id + i).style.backgroundColor = "red";
        $(id + i).style.height = toPxHeight(g_arr[i]);
    }
}
var g_arr = [];
var delay_slow_ms = 100;
var delay_fast_ms = 1;
var old_height;
var old_bar_qty;
var max_height = 120;   // pixels
var min_height = 5;     // pixels   
var multiple = 2;       // random array will be a multiple of this number

function createRandomArray() {
    for (let i = 0; i < barMaxQty(); i++) {
        g_arr[i] = genRandomNumber(min_height, max_height);

        while (g_arr[i] % multiple !== 0) {
            g_arr[i] = genRandomNumber(min_height, max_height);
        }
    }
}

function createOrdinalArray() {
    let height = max_height / barMaxQty();

    for (let i = 0; i < barMaxQty(); i++) {
        g_arr[i] = (i + 1) * height;
    }

    for (let i = barMaxQty() - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [g_arr[i], g_arr[j]] = [g_arr[j], g_arr[i]];
    }
}

function barQty() {
    return $("bar_qty_slider").value;
}

function barMaxQty() {
    return $("bar_qty_slider").max;
}

function barWidth() {
    return $("bar_width_slider").value;   
}

function toPxHeight(value) {
    return Math.round(value * barHeight() / 100) + "px";
}

function barHeight() {
    return $("bar_height_slider").value;   
}

function createBars() {
    $("bar_height_slider").value    = $("bar_height_slider").max;
    $("bar_height_value").innerHTML = barHeight();

    $("bar_qty_slider").value       = barMaxQty();
    $("bar_qty_value").innerHTML    = barQty();

    $("bar_width_slider").value     = $("bar_width_slider").min;
    $("bar_width_value").innerHTML  = barWidth();

    for (let i = 0; i < barMaxQty(); i++) {
        createSpan("span_selection_u", "selection_u", i);
        createSpan("span_selection_s", "selection_s", i);
        createSpan("span_bubble",      "bubble",      i);
        createSpan("span_insertion",   "insertion",   i);
        createSpan("span_merge",       "merge",       i);
        createSpan("span_quick",       "quick",       i);
        createSpan("span_heap",        "heap",        i);
        createSpan("span_cocktail",    "cocktail",    i);
        createSpan("span_radix",       "radix",       i);
    }

    for (let i = 0; i < barQty(); i++) {
        let scaled = toPxHeight(g_arr[i]);
        $("span_selection_u" + i).style.height = scaled;
        $("span_selection_s" + i).style.height = scaled;
        $("span_bubble"      + i).style.height = scaled;
        $("span_insertion"   + i).style.height = scaled;
        $("span_merge"       + i).style.height = scaled;
        $("span_quick"       + i).style.height = scaled;
        $("span_heap"        + i).style.height = scaled;
        $("span_cocktail"    + i).style.height = scaled;
        $("span_radix"       + i).style.height = scaled;
    }

    old_height = barHeight();
    old_bar_qty = parseInt(barQty());
}

function createSpan(id, parent, i) {
    let span = document.createElement("span");
    span.id = id + i;
    span.classList.add("bar");
    span.style.width = barWidth() + "px";
    $(parent).appendChild(span);
}

function genRandomArray() {
    resetAll();   

    for (let i = 0; i < barQty(); i++) {
        g_arr[i] = genRandomNumber(min_height, max_height);

        while (g_arr[i] % multiple !== 0) {
            g_arr[i] = genRandomNumber(min_height, max_height);
        }

        let scaled =  toPxHeight(g_arr[i]);

        $("span_selection_u" + i).style.height = scaled;
        $("span_selection_s" + i).style.height = scaled;
        $("span_bubble"      + i).style.height = scaled;
        $("span_insertion"   + i).style.height = scaled;
        $("span_merge"       + i).style.height = scaled;
        $("span_quick"       + i).style.height = scaled;
        $("span_heap"        + i).style.height = scaled;
        $("span_cocktail"    + i).style.height = scaled;
        $("span_radix"       + i).style.height = scaled;
    }
}

// Durstenfeld shuffle algorithm
function genOrdinalArray() {
    resetAll();

    let height = max_height / barQty();

    for (let i = 0; i < barQty(); i++) {
        g_arr[i] = (i + 1) * height;
    }

    for (let i = barQty() - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [g_arr[i], g_arr[j]] = [g_arr[j], g_arr[i]];

        let scaled = toPxHeight(g_arr[i]);

        $("span_selection_u" + i).style.height = scaled;
        $("span_selection_s" + i).style.height = scaled;
        $("span_bubble"      + i).style.height = scaled;
        $("span_insertion"   + i).style.height = scaled;
        $("span_merge"       + i).style.height = scaled;
        $("span_quick"       + i).style.height = scaled;
        $("span_heap"        + i).style.height = scaled;
        $("span_cocktail"    + i).style.height = scaled;
        $("span_radix"       + i).style.height = scaled;
    }
}

function setBarQty() {
    $("bar_qty_value").innerHTML = barQty();

    let next_bar_qty = parseInt( barQty() );

    if (old_bar_qty > next_bar_qty) {
        subBarQty(next_bar_qty);
    } else if (old_bar_qty < next_bar_qty) {
        addBarQty(next_bar_qty);
    }

    old_bar_qty = next_bar_qty;
}

function addBarQty(next_bar_qty) {
    for (let i = 0; i < next_bar_qty; i++) { 
        let scaled =  toPxHeight(g_arr[i]);
        $("span_selection_u" + i).style.height = scaled;
        $("span_selection_s" + i).style.height = scaled;
        $("span_bubble"      + i).style.height = scaled;
        $("span_insertion"   + i).style.height = scaled;
        $("span_merge"       + i).style.height = scaled;
        $("span_quick"       + i).style.height = scaled;
        $("span_heap"        + i).style.height = scaled;
        $("span_cocktail"    + i).style.height = scaled;
        $("span_radix"       + i).style.height = scaled;

        let width = barWidth() + "px";
        $("span_selection_u" + i).style.width = width;
        $("span_selection_s" + i).style.width = width;
        $("span_bubble"      + i).style.width = width;
        $("span_insertion"   + i).style.width = width;
        $("span_merge"       + i).style.width = width;
        $("span_quick"       + i).style.width = width;
        $("span_heap"        + i).style.width = width;
        $("span_cocktail"    + i).style.width = width;
        $("span_radix"       + i).style.width = width;
    }
}

function subBarQty(next_bar_qty) {
    for (let i = 0; i < next_bar_qty; i++) { 
        let scaled =  toPxHeight(g_arr[i]);
        $("span_selection_u" + i).style.height = scaled;
        $("span_selection_s" + i).style.height = scaled;
        $("span_bubble"      + i).style.height = scaled;
        $("span_insertion"   + i).style.height = scaled;
        $("span_merge"       + i).style.height = scaled;
        $("span_quick"       + i).style.height = scaled;
        $("span_heap"        + i).style.height = scaled;
        $("span_cocktail"    + i).style.height = scaled;
        $("span_radix"       + i).style.height = scaled;

        let width = barWidth() + "px";
        $("span_selection_u" + i).style.width = width;
        $("span_selection_s" + i).style.width = width;
        $("span_bubble"      + i).style.width = width;
        $("span_insertion"   + i).style.width = width;
        $("span_merge"       + i).style.width = width;
        $("span_heap"        + i).style.width = width;
        $("span_cocktail"    + i).style.width = width;
        $("span_radix"       + i).style.width = width;
    }

    for (let i = barMaxQty() - 1; i >= next_bar_qty; i--) { 
        let scaled =  toPxHeight(g_arr[i]);
        $("span_selection_u" + i).style.height = 0;
        $("span_selection_s" + i).style.height = 0;
        $("span_bubble"      + i).style.height = 0;
        $("span_insertion"   + i).style.height = 0;
        $("span_merge"       + i).style.height = 0;
        $("span_quick"       + i).style.height = 0;
        $("span_heap"        + i).style.height = 0;
        $("span_cocktail"    + i).style.height = 0;
        $("span_radix"       + i).style.height = 0;
    }
}

function setBarHeight() {
    $("bar_height_value").innerHTML = barHeight();

    for (let i = 0; i < barQty(); i++) {       
        scale("span_selection_u", i);
        scale("span_selection_s", i);
        scale("span_bubble",      i);
        scale("span_insertion",   i);
        scale("span_merge",       i);
        scale("span_quick",       i);
        scale("span_heap",        i);
        scale("span_cocktail",    i);
        scale("span_radix",       i);
    }
    
    old_height = barHeight();
}

function scale(span, i) {
    let original = parseFloat($(span + i).style.height) * 100 / old_height;
    $(span + i).style.height = toPxHeight(original);
}

function setBarWidth() {
    $("bar_width_value").innerHTML = barWidth();

    let width = barWidth() + "px";

    for (let i = 0; i < barQty(); i++) {
        $("span_selection_u" + i).style.width = width;
        $("span_selection_s" + i).style.width = width;
        $("span_bubble"      + i).style.width = width;
        $("span_insertion"   + i).style.width = width;
        $("span_merge"       + i).style.width = width;
        $("span_quick"       + i).style.width = width;
        $("span_heap"        + i).style.width = width;
        $("span_cocktail"    + i).style.width = width;
        $("span_radix"       + i).style.width = width;
    }
}

function reset(id) {
    for (let i = 0; i < barQty(); i++) {
        $(id + i).style.backgroundColor = "red";
        $(id + i).style.height = toPxHeight(g_arr[i]);
    }
}

function resetA(id, i,  height) {
    $(id + i).style.backgroundColor = "red";
    $(id + i).style.height = height;
}

function resetAll() {
    for (let i = 0; i < barQty(); i++) {
        let scaled = toPxHeight(g_arr[i]);

        resetA("span_selection_u", i, scaled);
        resetA("span_selection_s", i, scaled);
        resetA("span_bubble",      i, scaled);
        resetA("span_insertion",   i, scaled);
        resetA("span_merge",       i, scaled);
        resetA("span_quick",       i, scaled);
        resetA("span_heap",        i, scaled);
        resetA("span_cocktail",    i, scaled);
        resetA("span_radix",       i, scaled);
    }
}

function playAll() {
    selectionSortUnstable();
    selectionSortStable();
    bubbleSort();
    insertionSort();
    mergeSort();
    quickSort();
    heapSort();
    cocktailSort();
    radixSort();
}

function log(name, value) {
    console.log(name + ": " + value);
}

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

    let radix = 10;
    radix = radix || 10;

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
    }

    // Copy back
    for (i = 0; i < barQty(); i++) {
        await sleep(delay_fast_ms);
        array[i] = output[i];
        $(id + i).style.height = toPxHeight(output[i]);
    }

    return array;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function genRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function $(x) { 
    return document.getElementById(x); 
} 

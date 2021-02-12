var g_arr = [];
var delay_slow_ms = 100;
var delay_fast_ms = 1;
var old_height;
var old_bar_qty;
var max_height = 120;   // pixels
var min_height = 5;     // pixels   
var multiple = 2;       // random array will be a multiple of this number

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

function resetA(id, i,  height) {
    $(id + i).style.backgroundColor = "red";
    $(id + i).style.height = height;
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

function log(name, value) {
    console.log(name + ": " + value);
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

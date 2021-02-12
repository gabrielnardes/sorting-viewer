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

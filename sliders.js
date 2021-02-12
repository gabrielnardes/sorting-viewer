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


// Helpers
function scale(span, i) {
    let original = parseFloat($(span + i).style.height) * 100 / old_height;
    
    $(span + i).style.height = toPxHeight(original);
}
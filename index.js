var g_array = [];
var random_array = [];
var delay_ms = 10;
var old_height = 55;

function createRandomArray()
{
    for (let i = 0; i < $("bar_qty_slider").max; i++)
        random_array[i] = genRandomNumber(5, 300); // height min and max
}

function createBars()
{
    //let gen_array = [];
    // CHANGE THIS SLIDER
    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        let random =  random_array[i] * $("bar_height_slider").value / 100;
        mySpan("span", random, "bot", i);
        mySpan("span_selection_u", random, "selection_u", i);
        mySpan("span_selection_s", random, "selection_s", i);
        mySpan("span_bubble", random, "bubble", i);
    }

    //g_array = [...gen_array];

    $("bar_height_value").innerHTML = $("bar_height_slider").value;
}

function genRandomArray()
{
    reset("span");
    resetAll();   

    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        random_array[i] = genRandomNumber(5, 300);

        let random_scaled =  random_array[i] * $("bar_height_slider").value / 100 + "px";

        $("span" + i).style.height             = random_scaled;
        $("span_selection_u" + i).style.height = random_scaled;
        $("span_selection_s" + i).style.height = random_scaled;
        $("span_bubble" + i).style.height      = random_scaled;
    }
}

function mySpan(id, height, div, i)
{
    let span = document.createElement("span");
    span.id = id + i;
    span.classList.add("bar");
    span.style.height = height + "px";
    span.style.width = $("bar_width_slider").value + "px";
    $(div).appendChild(span);
}

function setBarQty()
{
    let slider = $("bar_qty_slider");
    let output = $("bar_qty_value");
    output.innerHTML = slider.value;
    genRandomArray();
}

function setBarHeight()
{
    $("bar_height_value").innerHTML = $("bar_height_slider").value;

    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {       
        scale("span", i)
        scale("span_selection_u", i)
        scale("span_selection_s", i)
        scale("span_bubble", i)
    }
    
    old_height = $("bar_height_slider").value;
}

function scale(span, i)
{
    let original = parseFloat($(span + i).style.height) * 100 / old_height;
    $(span + i).style.height = original * $("bar_height_slider").value / 100 + "px";
}

function setBarWidth()
{
    $("bar_width_value").innerHTML = $("bar_width_slider").value;

    let width = $("bar_width_slider").value + "px";

    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        $("span" + i).style.width = width;
        $("span_selection_u" + i).style.width = width;
        $("span_selection_s" + i).style.width = width;
        $("span_bubble" + i).style.width = width;
    }
}

function createSpan(id, array, parent)
{
    for (let i = 0; i < array.length; i++)
    {
        let span = document.createElement("span");
        span.id = id + i;
        span.classList.add("bar");
        span.style.width = $("bar_width_slider").value + "px";
        span.style.height = array[i] + "px";
        parent.appendChild(span);
    }
}

function reset(id)
{
    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        $(id + i).style.height = random_array[i] * $("bar_height_slider").value / 100 + "px";
    }
}

function resetAll()
{
    reset("span_selection_u");
    reset("span_selection_s");
    reset("span_bubble");
}

async function selectionSortUnstable()
{
    let array = [...random_array];
    let id = "span_selection_u";

    reset(id);

    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        await sleep(delay_ms);

        let min_i = i;
        for (let j = i + 1; j < $("bar_qty_slider").value; j++)
            if (array[j] < array[min_i])
                min_i = j;

        // swap elements
        let temp = array[min_i];

        array[min_i] = array[i];
        $(id + min_i).style.height = array[i] * $("bar_height_slider").value / 100 + "px";

        array[i] = temp;
        $(id + i).style.height = temp * $("bar_height_slider").value / 100 + "px";
    }
}

async function selectionSortStable()
{
    let array = [...random_array];
    let id = "span_selection_s";

    reset(id);
    
    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        await sleep(delay_ms);

        let min_i = i;
        for (let j = i + 1; j < $("bar_qty_slider").value; j++)
            if (array[j] < array[min_i])
                min_i = j;

        // push elements
        let min = array[min_i];
        let min_heigth = $(id + min_i).style.height;
        for (let m = min_i; m > i; m--)
        {
            array[m] = array[m-1];
            $(id + m).style.height = array[m-1] * $("bar_height_slider").value / 100 + "px";

            array[m-1] = min;
            $(id + (m - 1)).style.height = min * $("bar_height_slider").value / 100 + "px";
        }

        array[i] = min;
        $(id + i).style.height = min * $("bar_height_slider").value / 100 + "px";
    }
}

async function bubbleSort()
{
    let array = [...random_array];
    let id = "span_bubble";

    reset(id);

    let sort_incomplete = true;
    while (sort_incomplete)
    {
        await sleep(delay_ms);
        
        sort_incomplete = false;
        for (let i = 0; i < $("bar_qty_slider").value - 1; i++)
        {
            if (array[i + 1] < array[i])
            {
                let temp = array[i];

                array[i] = array[i + 1];
                $(id + i).style.height = array[i + 1] * $("bar_height_slider").value / 100 + "px";

                array[i + 1] = temp;
                $(id + (i + 1)).style.height = temp * $("bar_height_slider").value / 100 + "px";

                sort_incomplete = true;
            }
        }
    }
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

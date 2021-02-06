var g_array = [];
var random_array = [];
var delay_ms = 10;

function mySpan(id, height, div, i)
{
    let span = document.createElement("span");
    span.id = id + i;
    span.classList.add("bar");
    span.style.height = height + "px";
    span.style.width = $("bar_width_slider").value + "px";
    $(div).appendChild(span);
}

function createBars()
{
    $("bot").textContent = '';  // clean array

    let gen_array = [];
    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        //gen_array[i] = genRandomNumber(5, $("bar_height_slider").value);
        random_array[i] = genRandomNumber(5, 300);
        gen_array[i] =  random_array[i] * $("bar_height_slider").value / 100;

        mySpan("span", gen_array[i], "bot", i);
        mySpan("span_selection_u", gen_array[i], "selection_u", i);
        mySpan("span_selection_s", gen_array[i], "selection_s", i);
        mySpan("span_bubble", gen_array[i], "bubble", i);
    }

    g_array = [...gen_array];
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
    let gen_array = [];

    $("bar_height_value").innerHTML = $("bar_height_slider").value;

    $('bot').textContent = '';
    $('selection_u').textContent = '';
    $('selection_s').textContent = '';
    $('bubble').textContent = '';

    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        g_array[i] =  random_array[i] * $("bar_height_slider").value / 100;

        mySpan("span", g_array[i], "bot", i);
        mySpan("span_selection_u", g_array[i], "selection_u", i);
        mySpan("span_selection_s", g_array[i], "selection_s", i);
        mySpan("span_bubble", g_array[i], "bubble", i);
    }
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

function genRandomArray()
{
    $('bot').textContent = '';  // clean array

    let gen_array = [];
    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        //gen_array[i] = genRandomNumber(5, $("bar_height_slider").value);
        //gen_array[i] = genRandomNumber(5, 300) * $("bar_height_slider").value / 100;

        random_array[i] = genRandomNumber(5, 300);
        gen_array[i] =  random_array[i] * $("bar_height_slider").value / 100;

        let span = document.createElement("span");
        //let span = $("span" + i);
        span.id = "span" + i;
        //span.innerHTML = gen_array[i];
        span.classList.add("bar");
        span.style.height = gen_array[i] + "px";
        span.style.width = $("bar_width_slider").value + "px";
        $('bot').appendChild(span);
    }

    // only for debug
    //let t = $('init_array');
    //t.innerText = gen_array;

    g_array = [...gen_array];
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

async function selectionSortUnstable()
{
    let array = [...g_array];
    let id = "span_selection_u";

    $("selection_u").textContent = '';

    createSpan(id, array, $('selection_u'));

    for (let i = 0; i < array.length; i++)
    {
        await sleep(delay_ms);

        let min_i = i;
        for (let j = i + 1; j < array.length; j++)
            if (array[j] < array[min_i])
                min_i = j;

        // swap elements
        let temp = array[min_i];
        array[min_i] = array[i];
        array[i] = temp;


        let temp_heigth = $(id + min_i).style.height;
        $(id + min_i).style.height = $(id + i).style.height;
        $(id + i).style.height = temp_heigth;
    }
}

async function selectionSortStable()
{
    let array = [...g_array];
    let id = "span_selection_s";

    $('selection_s').textContent = '';

    createSpan(id, array, $('selection_s'));

    for (let i = 0; i < array.length; i++)
    {
        await sleep(delay_ms);

        let min_i = i;
        for (let j = i + 1; j < array.length; j++)
            if (array[j] < array[min_i])
                min_i = j;

        // push elements
        let min = array[min_i];
        let min_heigth = $(id + min_i).style.height;
        for (let m = min_i; m > i; m--)
        {
            array[m] = array[m-1];
            $(id + m).style.height = $(id + (m - 1)).style.height;

            array[m-1] = min;
            $(id + (m - 1)).style.height = min_heigth;
        }

        array[i] = min;
        $(id + i).style.height = min_heigth;
    }
}

async function bubbleSort()
{
    let array = [...g_array];
    let id = "span_bubble";

    $('bubble').textContent = '';

    createSpan(id, array, $('bubble'));

    let sort_incomplete = true;
    while (sort_incomplete)
    {
        await sleep(delay_ms);
        
        sort_incomplete = false;
        for (let i = 0; i < array.length; i++)
        {
            if (array[i + 1] < array[i])
            {
                let temp = array[i];
                let temp_bar = $(id + i).style.height;

                array[i] = array[i + 1];
                $(id + i).style.height = $(id + (i + 1)).style.height;

                array[i + 1] = temp;
                $(id + (i + 1)).style.height = temp_bar;

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

var random_array = [];
var delay_ms = 10;
var old_height;
var bar_qty;

function createRandomArray()
{
    for (let i = 0; i < $("bar_qty_slider").max; i++)
    {
        random_array[i] = genRandomNumber(5, 300);      // height: min and max

        while (random_array[i] % 10 !== 0)
            random_array[i] = genRandomNumber(5, 300);
    }
}

function createBars()
{
    for (let i = 0; i < $("bar_qty_slider").max; i++)
    {
        createSpan("span",             "bot",         i);
        createSpan("span_selection_u", "selection_u", i);
        createSpan("span_selection_s", "selection_s", i);
        createSpan("span_bubble",      "bubble",      i);
    }

    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        let random_scaled =  random_array[i] * $("bar_height_slider").value / 100;

        $("span" + i).style.height             = random_scaled + "px";
        $("span_selection_u" + i).style.height = random_scaled + "px";
        $("span_selection_s" + i).style.height = random_scaled + "px";
        $("span_bubble" + i).style.height      = random_scaled + "px";
    }

    $("bar_height_value").innerHTML = $("bar_height_slider").value;
    $("bar_qty_value").innerHTML = $("bar_qty_slider").value;
    $("bar_width_value").innerHTML = $("bar_width_slider").value;

    old_height = $("bar_height_slider").value;
    bar_qty = parseInt($("bar_qty_slider").value);

}

function createSpan(id, parent, i)
{
    let span = document.createElement("span");
    span.id = id + i;
    span.classList.add("bar");
    span.style.width = $("bar_width_slider").value + "px";
    $(parent).appendChild(span);
}

function genRandomArray()
{
    resetAll();   

    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        random_array[i] = genRandomNumber(5, 300);
        while (random_array[i] % 10 !== 0)
            random_array[i] = genRandomNumber(5, 300);

        let random_scaled =  random_array[i] * $("bar_height_slider").value / 100 + "px";

        $("span" + i).style.height             = random_scaled;
        $("span_selection_u" + i).style.height = random_scaled;
        $("span_selection_s" + i).style.height = random_scaled;
        $("span_bubble" + i).style.height      = random_scaled;
    }
}


function setBarQty()
{
    $("bar_qty_value").innerHTML = $("bar_qty_slider").value;

    let next_bar_qty = parseInt($("bar_qty_slider").value);

    if (bar_qty > next_bar_qty)
    {
        subBarQty(bar_qty, next_bar_qty)
    }
    else if (bar_qty < next_bar_qty)
    {
        addBarQty(bar_qty, next_bar_qty)
    }

    // for (let i = 0; i < next_bar_qty; i++)
    // { 
    //     let random_scaled =  random_array[i] * $("bar_height_slider").value / 100 + "px";

    //     $("span" + i).style.height             = random_scaled;
    //     $("span_selection_u" + i).style.height = random_scaled;
    //     $("span_selection_s" + i).style.height = random_scaled;
    //     $("span_bubble" + i).style.height      = random_scaled;
    // }

    bar_qty = next_bar_qty;
}

function count()
{
    for (let i = 0; i < $("bar_qty_slider").value; i++)
    { 
        //console.log("g" + $("span" + i).style.height);

        let u = parseFloat($("span_selection_u" + i).style.height);
        let s = parseFloat($("span_selection_s" + i).style.height);
        let b = parseFloat($("span_bubble" + i).style.height)

        if (u - s != 0)
        {
            console.log("u - s " + (u - s));
        }  

        if (u - b != 0)
        {
            console.log("u - b " + (u - b));
        }  

        if (s - b != 0)
        {
            console.log("s - b " + (s - b));
        }  

        console.log(u);
        console.log(s);
        console.log(b);
        console.log("  ");
    }
    console.log("end");
}

function addBarQty(bar_qty, next_bar_qty)
{
    for (let i = 0; i < next_bar_qty; i++)
    { 
        let random_scaled =  random_array[i] * $("bar_height_slider").value / 100 + "px";

        $("span" + i).style.height             = random_scaled;
        $("span_selection_u" + i).style.height = random_scaled;
        $("span_selection_s" + i).style.height = random_scaled;
        $("span_bubble" + i).style.height      = random_scaled;

        let width = $("bar_width_slider").value + "px";
        $("span" + i).style.width = width;
        $("span_selection_u" + i).style.width = width;
        $("span_selection_s" + i).style.width = width;
        $("span_bubble" + i).style.width = width;
    }
}

function subBarQty(bar_qty, next_bar_qty)
{
    for (let i = $("bar_qty_slider").max - 1; i >= next_bar_qty; i--)
    { 
        let random_scaled =  random_array[i] * $("bar_height_slider").value / 100 + "px";

        $("span" + i).style.height             = 0;
        $("span_selection_u" + i).style.height = 0;
        $("span_selection_s" + i).style.height = 0;
        $("span_bubble" + i).style.height      = 0;
    }
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

function reset(id)
{
    for (let i = 0; i < $("bar_qty_slider").value; i++)
        $(id + i).style.height = random_array[i] * $("bar_height_slider").value / 100 + "px";
}

function resetAlgorithms()
{
    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        let random_scaled = random_array[i] * $("bar_height_slider").value / 100 + "px";

        $("span_selection_u" + i).style.height = random_scaled;
        $("span_selection_s" + i).style.height = random_scaled;
        $("span_bubble" + i).style.height = random_scaled;
    }
}

function resetAll()
{
    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        let random_scaled = random_array[i] * $("bar_height_slider").value / 100 + "px";

        $("span" + i).style.height =             random_scaled;
        $("span_selection_u" + i).style.height = random_scaled;
        $("span_selection_s" + i).style.height = random_scaled;
        $("span_bubble" + i).style.height =      random_scaled;
    }
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
        $(id + min_i).style.height = Math.round(array[i] * $("bar_height_slider").value / 100) + "px";

        array[i] = temp;
        $(id + i).style.height = Math.round(temp * $("bar_height_slider").value / 100) + "px";
    }

    // for (let i = 0; i < $("bar_qty_slider").max; i++)
    // {
    //     let min_i = i;
    //     for (let j = i + 1; j < $("bar_qty_slider").max; j++)
    //         if (array[j] < array[min_i])
    //             min_i = j;

    //     // swap elements
    //     let temp = array[min_i];
    //     array[min_i] = array[i];
    //     array[i] = temp;
    // }

    // // ele esta colocando pra dentro do grafico valores la da frente, por isso ta parecendo menor
    // for (let i = 0; i < $("bar_qty_slider").value; i++)
    // {
    //     await sleep(delay_ms);

    //     $(id + i).style.height = array[i] * $("bar_height_slider").value / 100 + "px";
    // }

    // for (let i = $("bar_qty_slider").value; i < 300; i++)
    // {
    //     //$(id + i).style.height = array[i] * $("bar_height_slider").value / 100 + "px";
    //     //$(id + i).style.backgroundColor = white;
    // }
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
            $(id + m).style.height = Math.round(array[m-1] * $("bar_height_slider").value / 100) + "px";

            array[m-1] = min;
            $(id + (m - 1)).style.height = Math.round(min * $("bar_height_slider").value / 100) + "px";
        }

        array[i] = min;
        $(id + i).style.height = Math.round(min * $("bar_height_slider").value / 100) + "px";
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
                $(id + i).style.height = Math.round(array[i + 1] * $("bar_height_slider").value / 100) + "px";

                array[i + 1] = temp;
                $(id + (i + 1)).style.height = Math.round(temp * $("bar_height_slider").value / 100) + "px";

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

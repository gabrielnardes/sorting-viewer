var g_array = [];
var delay_ms = 10;


function setBarQty()
{
    let slider = $("bar_qty_slider");
    let output = $("bar_qty_value");
    output.innerHTML = slider.value;
    genRandomArray();
}

function setBarHeight()
{
    let slider = $("bar_height_slider");
    let output = $("bar_height_value");
    output.innerHTML = slider.value;
    genRandomArray();
}

function genRandomArray()
{
    $('bot').textContent = '';  // clean array

    let gen_array = [];
    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        gen_array[i] = genRandomNumber(5, $("bar_height_slider").value);

        let span = document.createElement("span");
        span.id = "span" + i;
        //span.innerHTML = gen_array[i];
        span.classList.add("bar");
        span.style.height = gen_array[i] + "px";
        $('bot').appendChild(span);
    }

    // only for debug
    //let t = $('init_array');
    //t.innerText = gen_array;

    g_array = [...gen_array];
}

function createSpan(span_id, array, parent)
{
    for (let i = 0; i < array.length; i++)
    {
        let span = document.createElement("span");
        span.id = span_id + i;
        //span.innerHTML = array[i];
        span.classList.add("bar");
        span.style.height = array[i] + "px";
        parent.appendChild(span);
    }
}

async function selectionSortUnstable()
{
    let array = [...g_array];
    
    let bar = $('bar_array_unstable');
    //bar.innerText = array;

    // init array
    let span_id = "span_selection_u";
    $('selection_u').textContent = '';

    createSpan(span_id, array, $('selection_u'));

    for (let i = 0; i < array.length; i++)
    {
        await sleep(delay_ms);
        let min_i = i;

        for (let j = i + 1; j < array.length; j++)
            if (array[j] < array[min_i])
                min_i = j;

        // swap
        let temp = array[min_i];
        array[min_i] = array[i];
        array[i] = temp;

        //bar.innerText = array;

        let minindex = $(span_id + min_i);
        let temp_bar = $(span_id + min_i);
        let arri = $(span_id + i);
        
        //let temphtml = temp_bar.innerHTML;
        let tempheigth = temp_bar.style.height;

        //minindex.innerHTML = arri.innerHTML;
        minindex.style.height = arri.style.height;

        //arri.innerHTML = temphtml;
        arri.style.height = tempheigth;
    }
}

async function selectionSortStable()
{
    let array = [...g_array];
    
    let bar = $('bar_array_stable');
    //bar.innerText = array;

    // init array
    let span_id = "span_selection_s";
    $('selection_s').textContent = '';
    createSpan(span_id, array, $('selection_s'));

    for (let i = 0; i < array.length; i++)
    {
        let min_i = i;

        for (let j = i + 1; j < array.length; j++)
            if (array[j] < array[min_i])
                min_i = j;

        //push elements
        let min = array[min_i];
        let arrmin = $(span_id + min_i);
        //let armin_html = arrmin.innerHTML;
        let armin_heigth = arrmin.style.height;

        await sleep(delay_ms);
        for (let m = min_i; m > i; m--)
        {

            let arrm = $(span_id + m);
            //let armm_hmtl = arrm.innerHTML;
            let armm_heigth = arrm.style.height;

            let arrm_1 = $(span_id + (m - 1));
            //let armm_1_hmtl = arrm_1.innerHTML;
            let armm_1_heigth = arrm_1.style.height;

            array[m] = array[m-1];
            //arrm.innerHTML = armm_1_hmtl;
            arrm.style.height = armm_1_heigth;

            array[m-1] = min;
            //arrm_1.innerHTML = armin_html;
            arrm_1.style.height = armin_heigth;
            //bar.innerText = array;
        }

        array[i] = min;

        let arri = $(span_id + i);
        //arri.innerHTML = armin_html;
        arri.style.height = armin_heigth;
    }
}

async function bubbleSort()
{
    let array = [...g_array];
    
    let bar = $('bar_array_bubble');
    //bar.innerText = array;

    // init array
    // let parent = $('bubble');
    let span_id = "span_bubble";
    $('bubble').textContent = '';
    createSpan(span_id, array, $('bubble'));

    let end = false;
    while (end == false)
    {
        end = true;
            await sleep(delay_ms);
        for (let i = 0; i < array.length; i++)
        {

            let el = array[i];
            let el_plus = array[i + 1];

            if (el_plus < el)
            {
                let arri = $(span_id + i);
                //let armi_hmtl = arri.innerHTML;
                let armi_heigth = arri.style.height;

                let arri_1 = $(span_id + (i + 1));
                //let armi_1_hmtl = arri_1.innerHTML;
                let armi_1_heigth = arri_1.style.height;

                let temp = el;
                array[i] = el_plus;
                array[i + 1] = el;
                //bar.innerText = array;

                //arri.innerHTML = armi_1_hmtl;
                arri.style.height = armi_1_heigth;

                //arri_1.innerHTML = armi_hmtl;
                arri_1.style.height = armi_heigth;

                end = false;
            }
        }
    }
    console.log("end");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function genRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function $(x) { return document.getElementById(x); } 

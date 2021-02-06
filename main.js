var array = [];
var delay_ms = 10;


function setNumberOfBars()
{
    let slider = $("n_bar_slider");
    let output = $("n_bar_value");
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
    let slider_bar_number = $("n_bar_slider");
    let slider_bar_height = $("bar_height_slider");

    let bar_height_min = 5;
    let bar_height_max = slider_bar_height.value;
    let gen_array = [];
    let size = slider_bar_number.value;

    $('bot').textContent = '';

    for (let i = 0; i < size; i++)
    {
        // gen random number
        gen_array[i] = random(bar_height_min, bar_height_max);

        // print bars
        let divTag = document.createElement("span");
        divTag.id = "span" + i;
        //divTag.innerHTML = gen_array[i];
        divTag.classList.add("bar");
        divTag.style.height = gen_array[i] + "px";
        $('bot').appendChild(divTag);
    }

    let t = $('init_array');
    //t.innerText = gen_array;

    array = [...gen_array];
}

async function selection_sort_unstable()
{
    let my_array = [...array];
    let length = array.length;
    
    let bar = $('bar_array_unstable');
    //bar.innerText = my_array;

    // init array
    let superdiv = $('div_unstable');
    let span_id = "span_unstable";
    superdiv.textContent = '';
    for (let i = 0; i < length; i++)
    {
        let divTag = document.createElement("span");
        divTag.id = span_id + i;
        //divTag.innerHTML = my_array[i];
        divTag.classList.add("bar");
        divTag.style.height = my_array[i] + "px";
        superdiv.appendChild(divTag);
    }

    for (let i = 0; i < length; i++)
    {
        await sleep(delay_ms);
        let min_index = i;

        for (let j = i + 1; j < length; j++)
            if (my_array[j] < my_array[min_index])
                min_index = j;

        // swap
        let temp = my_array[min_index];
        my_array[min_index] = my_array[i];
        my_array[i] = temp;

        //bar.innerText = my_array;

        let minindex = $(span_id + min_index);
        let temp_bar = $(span_id + min_index);
        let arri = $(span_id + i);
        
        //let temphtml = temp_bar.innerHTML;
        let tempheigth = temp_bar.style.height;

        //minindex.innerHTML = arri.innerHTML;
        minindex.style.height = arri.style.height;

        //arri.innerHTML = temphtml;
        arri.style.height = tempheigth;
    }
}

async function selection_sort_stable()
{
    let my_array = [...array];
    let length = array.length;
    
    let bar = $('bar_array_stable');
    //bar.innerText = my_array;

    // init array
    let superdiv = $('div_stable');
    let span_id = "span_stable";
    superdiv.textContent = '';
    for (let i = 0; i < length; i++)
    {
        let divTag = document.createElement("span");
        divTag.id = span_id + i;
        //divTag.innerHTML = my_array[i];
        divTag.classList.add("bar");
        divTag.style.height = my_array[i] + "px";
        superdiv.appendChild(divTag);
    }

    for (let i = 0; i < length; i++)
    {
        let min_index = i;

        for (let j = i + 1; j < length; j++)
            if (my_array[j] < my_array[min_index])
                min_index = j;

        //push elements
        let min = my_array[min_index];
        let arrmin = $(span_id + min_index);
        //let armin_html = arrmin.innerHTML;
        let armin_heigth = arrmin.style.height;

        await sleep(delay_ms);
        for (let m = min_index; m > i; m--)
        {

            let arrm = $(span_id + m);
            //let armm_hmtl = arrm.innerHTML;
            let armm_heigth = arrm.style.height;

            let arrm_1 = $(span_id + (m - 1));
            //let armm_1_hmtl = arrm_1.innerHTML;
            let armm_1_heigth = arrm_1.style.height;

            my_array[m] = my_array[m-1];
            //arrm.innerHTML = armm_1_hmtl;
            arrm.style.height = armm_1_heigth;

            my_array[m-1] = min;
            //arrm_1.innerHTML = armin_html;
            arrm_1.style.height = armin_heigth;
            //bar.innerText = my_array;
        }

        my_array[i] = min;

        let arri = $(span_id + i);
        //arri.innerHTML = armin_html;
        arri.style.height = armin_heigth;
    }
}

async function bubble_sort()
{
    let my_array = [...array];
    let length = array.length;
    
    let bar = $('bar_array_bubble');
    //bar.innerText = my_array;

    // init array
    let superdiv = $('div_bubble');
    let span_id = "span_bubble";
    superdiv.textContent = '';
    for (let i = 0; i < length; i++)
    {
        let divTag = document.createElement("span");
        divTag.id = span_id + i;
        //divTag.innerHTML = my_array[i];
        divTag.classList.add("bar");
        divTag.style.height = my_array[i] + "px";
        superdiv.appendChild(divTag);
    }

    let end = false;
    while (end == false)
    {
        end = true;
            await sleep(delay_ms);
        for (let i = 0; i < length; i++)
        {

            let el = my_array[i];
            let el_plus = my_array[i + 1];

            if (el_plus < el)
            {
                let arri = $(span_id + i);
                //let armi_hmtl = arri.innerHTML;
                let armi_heigth = arri.style.height;

                let arri_1 = $(span_id + (i + 1));
                //let armi_1_hmtl = arri_1.innerHTML;
                let armi_1_heigth = arri_1.style.height;

                let temp = el;
                my_array[i] = el_plus;
                my_array[i + 1] = el;
                //bar.innerText = my_array;

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

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function $(x) { return document.getElementById(x); } 

var random_array = [];
var delay_slow_ms = 100;
var delay_fast_ms = 10;
var old_height;
var bar_qty;
var max_random = 100;
var mult_random = 5;
var mydebug = false;

let mysuperArray = [];

function quickSort()
{
   
}

function heapSort()
{
   
}

function countingSort()
{
   
}

function bucketSort()
{
   
}


function createRandomArray()
{
    for (let i = 0; i < $("bar_qty_slider").max; i++)
    {
        random_array[i] = genRandomNumber(5, max_random);// height: min and max

        while (random_array[i] % mult_random !== 0)
            random_array[i] = genRandomNumber(5, max_random);
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
        createSpan("span_insertion",   "insertion",   i);
        createSpan("span_merge",       "merge",       i);
    }

    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        let random_scaled =  random_array[i] * $("bar_height_slider").value / 100;
        $("span"             + i).style.height = random_scaled + "px";
        $("span_selection_u" + i).style.height = random_scaled + "px";
        $("span_selection_s" + i).style.height = random_scaled + "px";
        $("span_bubble"      + i).style.height = random_scaled + "px";
        $("span_insertion"   + i).style.height = random_scaled + "px";
        $("span_merge"       + i).style.height = random_scaled + "px";
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
        random_array[i] = genRandomNumber(5, max_random);
        while (random_array[i] % mult_random !== 0)
            random_array[i] = genRandomNumber(5, max_random);

        let random_scaled =  random_array[i] * $("bar_height_slider").value / 100 + "px";

        $("span"             + i).style.height = random_scaled;
        $("span_selection_u" + i).style.height = random_scaled;
        $("span_selection_s" + i).style.height = random_scaled;
        $("span_bubble"      + i).style.height = random_scaled;
        $("span_insertion"   + i).style.height = random_scaled;
        $("span_merge"       + i).style.height = random_scaled;
    }
}

function setBarQty()
{
    $("bar_qty_value").innerHTML = $("bar_qty_slider").value;

    let next_bar_qty = parseInt($("bar_qty_slider").value);

    if (bar_qty > next_bar_qty)
        subBarQty(bar_qty, next_bar_qty);
    else if (bar_qty < next_bar_qty)
        addBarQty(bar_qty, next_bar_qty);

    bar_qty = next_bar_qty;
}

function addBarQty(bar_qty, next_bar_qty)
{
    for (let i = 0; i < next_bar_qty; i++)
    { 
        let random_scaled =  random_array[i] * $("bar_height_slider").value / 100 + "px";
        $("span"             + i).style.height = random_scaled;
        $("span_selection_u" + i).style.height = random_scaled;
        $("span_selection_s" + i).style.height = random_scaled;
        $("span_bubble"      + i).style.height = random_scaled;
        $("span_insertion"   + i).style.height = random_scaled;
        $("span_merge"       + i).style.height = random_scaled;

        let width = $("bar_width_slider").value + "px";
        $("span"             + i).style.width = width;
        $("span_selection_u" + i).style.width = width;
        $("span_selection_s" + i).style.width = width;
        $("span_bubble"      + i).style.width = width;
        $("span_insertion"   + i).style.width = width;
        $("span_merge"       + i).style.width = width;
    }
}

function subBarQty(bar_qty, next_bar_qty)
{
    for (let i = 0; i < next_bar_qty; i++)
    { 
        let random_scaled =  random_array[i] * $("bar_height_slider").value / 100 + "px";
        $("span"             + i).style.height = random_scaled;
        $("span_selection_u" + i).style.height = random_scaled;
        $("span_selection_s" + i).style.height = random_scaled;
        $("span_bubble"      + i).style.height = random_scaled;
        $("span_insertion"   + i).style.height = random_scaled;
        $("span_merge"       + i).style.height = random_scaled;

        let width = $("bar_width_slider").value + "px";
        $("span"             + i).style.width = width;
        $("span_selection_u" + i).style.width = width;
        $("span_selection_s" + i).style.width = width;
        $("span_bubble"      + i).style.width = width;
        $("span_insertion"   + i).style.width = width;
        $("span_merge"       + i).style.width = width;
    }

    for (let i = $("bar_qty_slider").max - 1; i >= next_bar_qty; i--)
    { 
        let random_scaled =  random_array[i] * $("bar_height_slider").value / 100 + "px";
        $("span"             + i).style.height = 0;
        $("span_selection_u" + i).style.height = 0;
        $("span_selection_s" + i).style.height = 0;
        $("span_bubble"      + i).style.height = 0;
        $("span_insertion"   + i).style.height = 0;
        $("span_merge"       + i).style.height = 0;
    }
}

function setBarHeight()
{
    $("bar_height_value").innerHTML = $("bar_height_slider").value;

    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {       
        scale("span",             i);
        scale("span_selection_u", i);
        scale("span_selection_s", i);
        scale("span_bubble",      i);
        scale("span_insertion",   i);
        scale("span_merge",       i);
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
        $("span"             + i).style.width = width;
        $("span_selection_u" + i).style.width = width;
        $("span_selection_s" + i).style.width = width;
        $("span_bubble"      + i).style.width = width;
        $("span_insertion"   + i).style.width = width;
        $("span_merge"       + i).style.width = width;
    }
}

function reset(id)
{
    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        $(id + i).style.backgroundColor = "red";
        $(id + i).style.height = random_array[i] * $("bar_height_slider").value / 100 + "px";
    }
}

function resetA(id, i,  height)
{
    $(id + i).style.backgroundColor = "red";
    $(id + i).style.height = height;
}

function resetAlgorithms()
{
    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        let random_scaled = random_array[i] * $("bar_height_slider").value / 100 + "px";
        resetA("span_selection_u", i, random_scaled);
        resetA("span_selection_s", i, random_scaled);
        resetA("span_bubble",      i, random_scaled);
        resetA("span_insertion",   i, random_scaled);
        resetA("span_merge",       i, random_scaled);
    }
}

function resetAll()
{
    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        let random_scaled = random_array[i] * $("bar_height_slider").value / 100 + "px";
        resetA("span",             i, random_scaled);
        resetA("span_selection_u", i, random_scaled);
        resetA("span_selection_s", i, random_scaled);
        resetA("span_bubble",      i, random_scaled);
        resetA("span_insertion",   i, random_scaled);
        resetA("span_merge",       i, random_scaled);
    }
}

function mergeSort()
{
    let array = [...random_array];
    let id = "span_merge";
    reset(id);
    let size = 100;

    if ($("selection_merge").checked == true)
    {
        let mynewArray = [];
        for (let i = 0; i < size; i++)
        {
            mynewArray[i] = [i, genRandomNumber(5, max_random)];
            mysuperArray[i] = mynewArray[i][1];
        }

        // let mynewArray = [ [0,84],[1,88],[2,7],[3,2],[4,57],[5,54],[6,13] ];
        // for (let i = 0; i < size; i++)
        // {
        //     mysuperArray[i] = mynewArray[i][1];
        // }

        console.log("first " + mynewArray);
        console.log("second " + mysuperArray);

        // for (let i = 0; i < 7; i++)
        mynewArray = otherMergeSort(mynewArray);

        console.log("real end");
        for (let i = 0; i < size; i++)
        {
            console.log(mysuperArray[i]);
        }

        // console.log("buggy ");
        // console.log(mysuperArray);

        console.log("realother end");
        for (let i = 0; i < size; i++)
        {
            console.log(mynewArray[i][1]);
        }

    }
    else
    {

    }

    console.log("END mergeSort");

}

// https://stackabuse.com/merge-sort-in-javascript/
function otherMerge(left, right) 
{
    let arr = [];
    // console.log(left);
    // console.log(right);
    // console.log(left[0][1]);
    // console.log(right[0][1]);
    //console.log("l " + left[0][1] + " r " + right[0][1]);
    //if (mydebug == true) debugger;
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) 
    {
        let temp_l_id = left[0][0];
        let temp_r_id = right[0][0];
        let temp_l_val = left[0][1];
        let temp_r_val = right[0][1];
        // Pick the smaller among the smallest element of left and right sub arrays 
        if (left[0][1] < right[0][1]) 
        {
            //console.log(arr);
            // console.log("l " + temp_l_id + " = " + left[0][1] + " " + temp_l_val);
            // console.log("r " + temp_r_id + " = " + right[0][1] + " " +  temp_r_val);

            if (temp_l_id > temp_r_id)
            {
                // mysuperArray[temp_r_id] = left[0][1];
                // mysuperArray[temp_l_id] = right[0][1];

                // left[0][0] = temp_r_id;
                // right[0][0] = temp_l_id;
            }
            else if (temp_l_id < temp_r_id)
            {
                // mysuperArray[temp_l_id] = left[0][1];
                // mysuperArray[temp_r_id] = right[0][1];
            }
            else 
            {
                console.log("ferrou");
            }

            console.log("l " + left[0][0] + " = " + left[0][1]);
            console.log("r " + right[0][0] + " = " + right[0][1]);

            console.log("superglobal " + mysuperArray);
            //console.log("            ");
            arr.push(left.shift())  
            if (mydebug == true) {debugger};
        } 
        else 
        {
            let min = right[0][1];
            let id_min = right[0][0];
            let id_swap = left[0][0];
            console.log("swap");
            console.log("min " + min);
            console.log("id_min " + id_min);
            console.log("id_swap " + id_swap);
            for (let i = id_min; i > id_swap; i--)
            {
                mysuperArray[i] = mysuperArray[i-1];
                mysuperArray[i-1] = min;


            }
            console.log("superglobal " + mysuperArray);

            right[0][0] = id_swap;
            for (let i = 0; i < left.length; i++)
            {
                left[i][0]++;
            }
            
            // for (let i = )
            // {

            // }

            // let id_temp = right[0][0];
            // right[0][0] = left[0][0];



            //console.log(arr);
            if (mydebug == true) {debugger};

            // console.log("l " + temp_l_id + " = " + left[0][1] + " " + temp_l_val);
            // console.log("r " + temp_r_id + " = " + right[0][1] + " " +  temp_r_val);

            if (temp_r_id > temp_l_id)
            {
                // mysuperArray[temp_l_id] = right[0][1];
                // mysuperArray[temp_r_id] = left[0][1];

                // left[0][0] = temp_l_id;
                // right[0][0] = temp_r_id;
            }
            else if (temp_r_id < temp_l_id)
            {
                // left[0][0] = temp_r_id;
                // right[0][0] = temp_l_id;
                // mysuperArray[temp_r_id] = right[0][1];
                // mysuperArray[temp_l_id] = left[0][1];
            }
            else
            {
                console.log("ferrou");
            }

 //           for (let m = 0; m )

            console.log("r " + right[0][0] + " = " + right[0][1]);
            console.log("l " + left[0][0] + " = " + left[0][1]);

            //console.log("superglobal " + mysuperArray);
            //console.log("            ");
            console.log("before");
            console.log("arr " + arr + " left " + left + " right " + right);
            arr.push(right.shift());
        }
        console.log("arr " + arr + " left " + left + " right " + right);
    }
    //if (mydebug == true) debugger;
    // console.log("arra " + arr);
    // console.log("super " + [...arr, ...left, ...right]);
    console.log(" ");
   
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [ ...arr, ...left, ...right ];
}

/*
84-88-7                 84 88 7

84-88     7             84 88 7

84    88     7          84 88 7

84-88     7             84 88 7

7-84-88                 7 84 88



84-88-7-2-57-54-13                  84[0] 88[1] 7[2] 2[3] 57[4] 54[5] 13[6]

84-88-7-2     57-54-13              84[0] 88[1] 7[2] 2[3] 57[4] 54[5] 13[6]

84-88   7-2     57-54-13            84[0] 88[1] 7[2] 2[3] 57[4] 54[5] 13[6]

84  88   7-2     57-54-13   84?88   84[0] 88[1] 7[2] 2[3] 57[4] 54[5] 13[6]

84*88   7-2     57-54-13            84[0] 88[1] 7[2] 2[3] 57[4] 54[5] 13[6]

84*88   7  2     57-54-13   7?2     84[0] 88[1] 7[2] 2[3] 57[4] 54[5] 13[6]

84*88   2*7     57-54-13    2?84    84[0] 88[1] 2[2] 7[3] 57[4] 54[5] 13[6]
                  R     min = 2[2]  
                        id_min = 2
                        id_swap = 0
                        for (int i = id_min; i > id_swap; i--)
                        {
                            array[i] = array[i-1];
                            array[i-1] = min;
                        }
                                    
                                    84[0]  2[1] 88[2] 7[3] 57[4] 54[5] 13[6]
                                     2[0] 84[1] 88[2] 7[3] 57[4] 54[5] 13[6]

2*84*88   7     57-54-13     2?7     2[0] 84[1] 88[2] 7[3] 57[4] 54[5] 13[6]
                             84?7

2*7*84*88    57-54-13               2[0] 7[1] 84[2] 88[3] 57[4] 54[5] 13[6]

2*7*84*88    57-54  13              2[0] 7[1] 84[2] 88[3] 57[4] 54[5] 13[6]

2*7*84*88    57  54  13    57?54    2[0] 7[1] 84[2] 88[3] 57[4] 54[5] 13[6]

2*7*84*88    54*57  13     13?54    2[0] 7[1] 84[2] 88[3] 54[4] 57[5] 13[6]

2*7*84*88    13*54*57      2?13     2[0] 7[1] 84[2] 88[3] 13[4] 54[5] 57[6]
                           7?13
                           84?13

                        min = 13[4]
                        id_min = 4
                        id_swap = 2
                        for (int i = 4; i > 2; i--)
                        {
                            array[i] = array[i-1];
                            array[i-1] = min;
                        }

2*7*84*88    13*54*57

2*7*13*84*88   54*57

2*7*13*54*84*88  57

2*7*13*54*57*84*88



*/

function otherMergeSort(otherArray) 
{
  const half = Math.ceil(otherArray.length / 2);

    // for (let i = 0; i < 7; i++)
    //     //console.log(otherArray[i][0]);

    // for (let i = 0; i < 7; i++)
        //console.log(otherArray[i][1]);

  // Base case or terminating case
  //console.log(otherArray.length);
  if (otherArray.length < 2)
  {
    //console.log("terminating");
    //if (mydebug == true) debugger;
    return otherArray;
  }
  
  //const left = [];

  // for (let i = 0; i < half; i++)
  // {
  //   left[i] = otherArray[i];
  // }

  const left = otherArray.splice(0, half);

  console.log("left" + left);
  console.log("otherarray" + otherArray);
  //if (mydebug == true) debugger;

  return otherMerge(otherMergeSort(left),otherMergeSort(otherArray));
}

async function merge(array, l, m, r)
{
    let ls = [];
    let rs = [];

    let s1 = m - l + 1;
    let s2 = r - m;

    // console.log("  ");
    // console.log("l " + l);
    // console.log("m " + m);
    // console.log("r " + r);
    // console.log("s1 " + s1);
    // console.log("s2 " + s2);

    // console.log("loop");
    for (let k = l; k <= r; k++)
    {
        // console.log(k + " " + array[k]);
    }

    for (let i = 0; i < s1; i++)
        ls[i] = array[l + i];

    for (let j = 0; j < s2; j++)
        rs[j] = array[m + 1 + j];

    let i = 0, j = 0;

    let k = l;
    while (i < s1 && j < s2) 
    {
        if (ls[i] <= rs[j]) 
        {
            //await sleep(2000);
            array[k] = ls[i];
            i++;
        }
        else 
        {
            //await sleep(2000);
            array[k] = rs[j];
            //console.log("ls[i] > rs[j]" + array);
            j++;
        }
        k++;
        
        // console.log("ls[i] <= rs[j] " + array);
    }
    //init 35,70,95,80, 90,90,10
    //index.js:260 init 15,15,45,5,75,40,80


    while (i < s1) 
    {
       // await sleep(2000);
        array[k] = ls[i];
        // console.log("i < s1 " + array);
        i++;
        k++;
    }

    while (j < s2) 
    {
        //await sleep(2000);
        array[k] = rs[j];
        // console.log("j < s2 " + array);
        j++;
        k++;
    }
    // console.log("END merge");
}

function sort(array, l, r)
{
    if (l < r)
    {
        let m = Math.floor(l + (r - l) / 2);

        sort(array, l, m);
        sort(array, m + 1, r);
        merge(array, l, m, r);
    }
}



function playAll()
{
    selectionSortUnstable();
    selectionSortStable();
    bubbleSort();
    insertionSort();
    mergeSort();
}

async function selectionSortUnstable()
{
    let array = [...random_array];
    let id = "span_selection_u";
    reset(id);

    console.log($("selection_u_fast").checked);

    if ($("selection_u_fast").checked == true)
    {
        for (let i = 0; i < $("bar_qty_slider").value; i++)
        {
            await sleep(delay_fast_ms);
            let min_i = i;
            let j;
            for (j = i + 1; j < $("bar_qty_slider").value; j++)
            {
                if (array[j] < array[min_i])
                    min_i = j;
            }

            // swap elements
            let temp = array[min_i];

            array[min_i] = array[i];
            $(id + min_i).style.height = Math.round(array[i] * $("bar_height_slider").value / 100) + "px";

            array[i] = temp;
            $(id + i).style.height = Math.round(temp * $("bar_height_slider").value / 100) + "px";
        }
    }
    else
    {
        for (let i = 0; i < $("bar_qty_slider").value; i++)
        {
            let min_i = i;
            let j;
            for (j = i + 1; j < $("bar_qty_slider").value; j++)
            {
                $(id + min_i).style.backgroundColor = "green";
                $(id + j).style.backgroundColor = "blue";

                if (array[j] < array[min_i])
                {
                    await sleep(delay_slow_ms);
                    $(id + min_i).style.backgroundColor = "gray";
                    $(id + j).style.backgroundColor = "green";
                    min_i = j;
                }
                else
                {
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
            $(id + min_i).style.height = Math.round(array[i] * $("bar_height_slider").value / 100) + "px";

            array[i] = temp;
            $(id + i).style.height = Math.round(temp * $("bar_height_slider").value / 100) + "px";

            // reset
            for (let k = i + 1; k < $("bar_qty_slider").value; k++)
                $(id + k).style.backgroundColor = "red";
        }
    }


}

async function selectionSortStable()
{
    let array = [...random_array];
    let id = "span_selection_s";

    reset(id);
    
    for (let i = 0; i < $("bar_qty_slider").value; i++)
    {
        await sleep(delay_fast_ms);

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
        await sleep(delay_fast_ms);
        
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

async function insertionSort()
{
    let array = [...random_array];
    let id = "span_insertion";

    reset(id);

    for (let i = 1; i < $("bar_qty_slider").value; i++)
    {
        await sleep(delay_fast_ms);

        let j = i-1;
        if (array[i] < array[j])
        {
            while (array[i] < array[j] && j >= 0)
                j--;

            if (array[i] < array[j+1])
                j++;

            // shift bars to the right
            let min = array[i];           
            for (let m = i; m > j; m--)
            {
                array[m] = array[m-1];
                $(id + m).style.height = Math.round(array[m-1] * $("bar_height_slider").value / 100) + "px";

                array[m-1] = min;
                $(id + (m - 1)).style.height = Math.round(min * $("bar_height_slider").value / 100) + "px";
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

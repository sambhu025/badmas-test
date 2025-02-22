
var NextBoxId = "#N1";
var PrevBoxId;
var NextClass = ".box";

var count_button_press = 0;

var id_of_N1 = "N1";
var id_of_N2 = "N2";
var id_of_N3 = "N3";

var id_of_O1 = "O1";
var id_of_O2 = "O2";

var nextRow = 0;

var button_clicked_five_times_or_not = 0;

var count_visited_boxes = 0;

// Function to toggle B/W Light/Dark theme
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

$(document).ready(function () {

    // Function to get the focus of the next TextBox while pressing the number pad 
    $(".button").click(function () {

        if (NextBoxId != null) {

            button_clicked_five_times_or_not += 1;
            console.log(button_clicked_five_times_or_not);
            var temp = "#" + this.id;
            console.log(temp)
            console.log(NextBoxId);
            $(NextBoxId).val($(temp).val());

            PrevBoxId = NextBoxId;

            $(NextBoxId).next(NextClass).focus();
            console.log(document.activeElement.id)
            if (document.activeElement.id != "")
                NextBoxId = "#" + document.activeElement.id;
            else
                NextBoxId = null;
        }
    });

    // Function to erase data from the TextBox
    $(".clr-btn").click(function () {


        if (PrevBoxId != null) {
            button_clicked_five_times_or_not += -1;
            console.log(PrevBoxId);
            $(PrevBoxId).val("");

            NextBoxId = PrevBoxId;

            $(NextBoxId).prev(NextClass).focus();

            if (document.activeElement.id != "clear")
                PrevBoxId = "#" + document.activeElement.id;
            else
                PrevBoxId = null;
        }
    });

    $(".next").click(function () {

        location.reload();
    });

    // This code shows the equation result on the screen
    $("#result").popover('destroy').popover({ content: answer });


});


const myMap = new Map();

var operators_array = ['+', '-', 'X', '/'];

// Storing the frequency of numbers and operators entered        
myMap.set("0", 0)
myMap.set("1", 0)
myMap.set("2", 0)
myMap.set("3", 0)
myMap.set("4", 0)
myMap.set("5", 0)
myMap.set("6", 0)
myMap.set("7", 0)
myMap.set("8", 0)
myMap.set("9", 0)
myMap.set("+", 0)
myMap.set("-", 0)
myMap.set("X", 0)
myMap.set("/", 0)


//N1 : user input TextBox for number
var N1_val;
N1_val = Math.floor(Math.random() * 10).toString();

//N2 : user input TextBox for number
let num_val = Math.floor(Math.random() * 10);

var N2_val;
if (num_val > 0)
    N2_val = num_val.toString();
else
    N2_val = (num_val + 1).toString();

//N3 : user input TextBox for number
num_val = Math.floor(Math.random() * 10);

var N3_val;
if (num_val > 0)
    N3_val = num_val.toString();
else
    N3_val = (num_val + 1).toString();


//O1 : user input TextBox for operator
var O1_val;
O1_val = operators_array[Math.floor(Math.random() * 4)];

//O2 : user input TextBox for operator
var O2_val;
O2_val = operators_array[Math.floor(Math.random() * 4)];



if (O1_val == "X")
    O1_val = "*"
if (O2_val == "X")
    O2_val = "*"

// determining the result of the Equation which the user have to solve.    
infix = [N1_val, O1_val, N2_val, O2_val, N3_val];

var postfix = convertToPostfix(infix);
var answerOld = postfix_evaluation(postfix);
answer = answerOld.toFixed(1)


if (O1_val == "*")
    O1_val = "X"
if (O2_val == "*")
    O2_val = "X"


// Setting the frequency of the equaion which user has to solve    
//N1
let old_val = myMap.get(N1_val);
myMap.set(N1_val, old_val + 1);

//N2
old_val = myMap.get(N2_val);
myMap.set(N2_val, old_val + 1);

//N3
old_val = myMap.get(N3_val);
myMap.set(N3_val, old_val + 1);

//O1
old_val = myMap.get(O1_val);
myMap.set(O1_val, old_val + 1);

//O2
old_val = myMap.get(O2_val);
myMap.set(O2_val, old_val + 1);

var color_yellow = '#FFF300';
var color_red = '#FF0000';

var color_green = 'green'


// Function to change the color of the TextBoxes to a specific color ,after entering all the values in the
//  in the TextBoxes by the user

function fun() {



    if (button_clicked_five_times_or_not == 5) {

        let regx_for_numbers = /[0-9]/g;
        let regx_for_operators = /[-X\+/]/g;
        // Local Map
        let localMap = new Map(myMap);
        let frequency_counter;


        let local_Id_of_N1 = document.getElementById(id_of_N1);
        let local_Id_of_N2 = document.getElementById(id_of_N2);
        let local_Id_of_N3 = document.getElementById(id_of_N3);

        let local_Id_of_O1 = document.getElementById(id_of_O1)
        let local_Id_of_O2 = document.getElementById(id_of_O2)

        //Checks for wether a user has entered a valid equation or not
        //valid equation : 2 + 3  X 5
        // Invalid equation + 2 * 3 &

        if (regx_for_operators.test(local_Id_of_N1.value) == true)
            togglePopupWrong();
        else if (regx_for_operators.test(local_Id_of_N2.value) == true)
            togglePopupWrong();
        else if (regx_for_operators.test(local_Id_of_N3.value) == true)
            togglePopupWrong();
        else if (regx_for_numbers.test(local_Id_of_O1.value) == true)
            togglePopupWrong();
        else if (regx_for_numbers.test(local_Id_of_O2.value) == true)
            togglePopupWrong();
        else {


            // Condition for the text box N1 (first textbox) : If input value exists in the Equation and placed 
            //correctly in the equation, Background Color will be green

            if (localMap.get(local_Id_of_N1.value) > 0 && local_Id_of_N1.value == N1_val) {

                document.getElementById(local_Id_of_N1.id).style.backgroundColor = color_green;
                frequency_counter = localMap.get(local_Id_of_N1.value);
                localMap.set(local_Id_of_N1.value, frequency_counter - 1);
                count_visited_boxes += 1;
            }
            else if (localMap.get(local_Id_of_N1.value) > 0 && local_Id_of_N1.value != N1_val) {

                //If input value exists in the Equation and placed 
                //incorrectly in the equation, Background Color will be yellow

                document.getElementById(local_Id_of_N1.id).style.backgroundColor = color_yellow;
                frequency_counter = localMap.get(local_Id_of_N1.value);
                localMap.set(local_Id_of_N1.value, frequency_counter - 1);
                count_visited_boxes += 1;
            }

            else if (localMap.get(local_Id_of_N1.value) == 0) {

                //If input value does not exists in the Equation then Background Color will be Red
                document.getElementById(local_Id_of_N1.id).style.backgroundColor = color_red;
                count_visited_boxes += 1;
            }



            // N2
            // Condition for the text box N2 (Third textbox) : If input value exists in the Equation and placed 
            //correctly in the equation, Background Color will be green


            if (localMap.get(local_Id_of_N2.value) > 0 && local_Id_of_N2.value == N2_val) {

                document.getElementById(local_Id_of_N2.id).style.backgroundColor = color_green;
                frequency_counter = localMap.get(local_Id_of_N2.value);
                localMap.set(local_Id_of_N2.value, frequency_counter - 1);
                count_visited_boxes += 1;
            }
            else if (localMap.get(local_Id_of_N2.value) > 0 && local_Id_of_N2.value != N2_val) {

                //If input value exists in the Equation and placed 
                //incorrectly in the equation, Background Color will be yellow
                document.getElementById(local_Id_of_N2.id).style.backgroundColor = color_yellow;
                frequency_counter = localMap.get(local_Id_of_N2.value);
                localMap.set(local_Id_of_N2.value, frequency_counter - 1);
                count_visited_boxes += 1;
            }
            else if (localMap.get(local_Id_of_N2.value) == 0) {

                //If input value does not exists in the Equation then Background Color will be Red
                document.getElementById(local_Id_of_N2.id).style.backgroundColor = color_red;
                count_visited_boxes += 1;
            }


            //N3   
            // Condition for the text box N3 (Fifth textbox) : If input value exists in the Equation and placed 
            //correctly in the equation, Background Color will be green

            if (localMap.get(local_Id_of_N3.value) > 0 && local_Id_of_N3.value == N3_val) {


                document.getElementById(local_Id_of_N3.id).style.backgroundColor = color_green;
                frequency_counter = localMap.get(local_Id_of_N3.value);
                localMap.set(local_Id_of_N3.value, frequency_counter - 1);
                nextRow = 1;
                count_visited_boxes += 1;
            }

            else if (localMap.get(local_Id_of_N3.value) > 0 && local_Id_of_N3.value != N3_val) {

                //If input value exists in the Equation and placed 
                //incorrectly in the equation, Background Color will be yellow
                document.getElementById(local_Id_of_N3.id).style.backgroundColor = color_yellow;
                frequency_counter = localMap.get(local_Id_of_N3.value);
                localMap.set(local_Id_of_N3.value, frequency_counter - 1);
                nextRow = 1;
                count_visited_boxes += 1;
            }

            else if (localMap.get(local_Id_of_N3.value) == 0) {

                document.getElementById(local_Id_of_N3.id).style.backgroundColor = color_red;
                nextRow = 1;
                count_visited_boxes += 1;
            }

            //O1   
            // Condition for the text box O1 (second textbox) : If input value exists in the Equation and placed 
            //correctly in the equation, Background Color will be green

            if (localMap.get(local_Id_of_O1.value) > 0 && local_Id_of_O1.value == O1_val) {

                document.getElementById(local_Id_of_O1.id).style.backgroundColor = color_green;
                frequency_counter = localMap.get(local_Id_of_O1.value);
                localMap.set(local_Id_of_O1.value, frequency_counter - 1);
                count_visited_boxes += 1;
            }
            else if (localMap.get(local_Id_of_O1.value) > 0 && local_Id_of_O1.value != O1_val) {

                //If input value exists in the Equation and placed 
                //incorrectly in the equation, Background Color will be yellow
                document.getElementById(local_Id_of_O1.id).style.backgroundColor = color_yellow;
                frequency_counter = localMap.get(local_Id_of_O1.value);
                localMap.set(local_Id_of_O1.value, frequency_counter - 1);
                count_visited_boxes += 1;
            }
            else if (localMap.get(local_Id_of_O1.value) == 0) {

                //If input value does not exists in the Equation then Background Color will be Red
                document.getElementById(local_Id_of_O1.id).style.backgroundColor = color_red;
                count_visited_boxes += 1;
            }


            //O2   
            // Condition for the text box O2 (Fourth textbox) : If input value exists in the Equation and placed 
            //correctly in the equation, Background Color will be green     

            if (localMap.get(local_Id_of_O2.value) > 0 && local_Id_of_O2.value == O2_val) {

                document.getElementById(local_Id_of_O2.id).style.backgroundColor = color_green;
                frequency_counter = localMap.get(local_Id_of_O2.value);
                localMap.set(local_Id_of_O2.value, frequency_counter - 1);
                count_visited_boxes += 1;
            }

            else if (localMap.get(local_Id_of_O2.value) > 0 && local_Id_of_O2.value != O2_val) {

                //If input value exists in the Equation and placed 
                //incorrectly in the equation, Background Color will be yellow
                document.getElementById(local_Id_of_O2.id).style.backgroundColor = color_yellow;
                frequency_counter = localMap.get(local_Id_of_O2.value);
                localMap.set(local_Id_of_O2.value, frequency_counter - 1);
                count_visited_boxes += 1;
            }

            else if (localMap.get(local_Id_of_O2.value) == 0) {

                //If input value does not exists in the Equation then Background Color will be Red
                document.getElementById(local_Id_of_O2.id).style.backgroundColor = color_red;
                count_visited_boxes += 1;
            }



            if (count_button_press == 0 && nextRow == 1) {

                NextBoxId = "#N1_2";
                PrevBoxId = null;
                NextClass = ".box2";

                id_of_N1 = "N1_2";
                id_of_N2 = "N2_2";
                id_of_N3 = "N3_2";

                id_of_O1 = "O1_2";
                id_of_O2 = "O2_2";

                count_button_press += 1;
                nextRow = 0;
                button_clicked_five_times_or_not = 0;

            } else if (count_button_press == 1 && nextRow == 1) {

                NextBoxId = "#N1_3";
                PrevBoxId = null;

                NextClass = ".box3";


                id_of_N1 = "N1_3";
                id_of_N2 = "N2_3";
                id_of_N3 = "N3_3";

                id_of_O1 = "O1_3";
                id_of_O2 = "O2_3";

                count_button_press += 1;
                nextRow = 0;
                button_clicked_five_times_or_not = 0;
            }
            else
                PrevBoxId = null;


            if (local_Id_of_N1.style.backgroundColor == 'green' &&
                local_Id_of_N2.style.backgroundColor == 'green' &&
                local_Id_of_N3.style.backgroundColor == 'green' &&
                local_Id_of_O1.style.backgroundColor == 'green' &&
                local_Id_of_O2.style.backgroundColor == 'green') {
                togglePopupCongratualation();
            }
            else if (count_visited_boxes == 15) {
                togglePopupLose();

            }
        }
    } else if(button_clicked_five_times_or_not > 0) {
        togglePopupWrong();
    }
    

}

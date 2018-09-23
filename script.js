/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 */
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
var student_array = [
];

// var editStudentObjID = '';
// var editStudentRow = '';

class studentObj {
    constructor(student, course, grade, id) {
        this.name = student;
        this.course_name= course;
        this.grade= grade;
        this.id = id;
    }
}
/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
 function validateFields() {
     var name = $('#studentName').val();
     var grade = $('#studentGrade').val();
     var course = $('#course').val();
     var nameReg = /^[a-zA-Z ]+$/;
     var gradeReg = /^[0-9]+$/;
     var courseReg = /^[A-Za-z 0-9]*$/;
     if(!name) {
         $('#error-name').text("Please enter a name");
     }
     else if (!nameReg.test(name)) {
        $('#error-name').text("Please enter a valid name");
     }
     else {
         $('#error-name').text('');
     }
     if (!grade) {
        $('#error-grade').text("Please enter a grade");
     }
     else if (!gradeReg.test(grade)) {
        $('#error-grade').text("Please enter a valid grade. Ex. Must be whole digits, 100, 200,");
     }
     else if (grade < 0 ) {
     $('#error-grade').text("Cannot be a negative number")
     }
     else 
        $('#error-grade').text('')
     if(!course) {
         $('#error-course').text("Please enter a course");
     }
     else if (!courseReg.test(course)) {
        $('#error-course').text("Please enter a valid course name");
     }
     else  
     $('#error-course').text('');
     
   if ($('#error-name').text() === '' &&  $('#error-grade').text() === '' && $('#error-course').text() === '' ) {
       return true; 
   } 
   
     
 }
/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
    addClickHandlersToElements();
    getData();  
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){
    $('.btn-primary').click(handleAddClicked);
    $('.cancel').click(handleCancelClick);
    $('.get').click(handleGetDataClick);
   
    $('.filter').click(sortToggle);
    $('.dropdown-btn').click(displayDropDown);
    $('.dropdown-content-item').click(applyFilter);
    
   
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
    if(validateFields()) {
    addStudent();
    $('.error').text('');
    }
}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
    clearAddStudentFormInputs();
}
/***************************************************************************************************
 * handleDeleteClicked - Event Handler when user clicks the delete button
 * @returns: {undefined}none
 * @calls: deleteStudent
 */
function handleDeleteClick(event){
    var deleteClick = parseInt(event["id"]);
  var studentDeleted  = student_array[deleteClick];
  event.closest('tr').remove();
  student_array.splice(deleteClick, 1);  
  
  deleteStudent(studentDeleted);

}
/***************************************************************************************************
 * handleDeleteClicked - Event Handler when user clicks the delete button
 * @returns: {undefined}none
 * @calls: deleteStudent
 */
function displayDropDown() {
    $('.dropdown-content').toggle("show");
    
    }
/***************************************************************************************************
 * handleGetDataClicked - Event Handler when user clicks the getData button
 * @returns: {undefined}none
 * @calls: getData 
 */
function handleGetDataClick() {
    getData();
}

/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){
    var currentStudent = $('#studentName').val(); //Grabs value from the input fields
    var course = $('#course').val();
    var grade  = $('#studentGrade').val();
    clearAddStudentFormInputs(); //clears value from input fields
    addData(currentStudent, course, grade);
 
         
         
}
/***************************************************************************************************
 * deleteStudent - deletes the row clicked from student table by removing the current row value from the array
 * @param deleteClick the value of the row clicked 
 * @return {undefined}
 */

 function deleteStudent (student) {
    deleteData(student);
    updateStudentList(student_array);
 
    // average = calculateGradeAverage(student_array); // calculates grade average of all students
    // renderGradeAverage(average); 

 }
 /***************************************************************************************************
 * handleEditClick - shows the modal for edit window 
 */
function handleEditClick() {
    $("#editModal").modal('show');
    var studentObj = student_array[parseInt(this["id"])];
    $('#editStudentName').val(studentObj.name);
    $('#editCourse').val(studentObj.course_name);
    $('#editStudentGrade').val(studentObj.grade);
    $('#editSubmit').off();
    $('#editSubmit').click( () => {handleSubmitEditClick(studentObj)
    });
      
       
       
    
}
 /***************************************************************************************************
 * handleEditClick - shows the modal for edit window 
 */
function handleSubmitEditClick(student) {
   var id = student.id


  var studentReplaced = student_array.map(function(x) { return x.id}).indexOf(id);
  var name = $('#editStudentName').val();
  console.log(name)
  var course_name = $('#editCourse').val();
  var grade = $('#editStudentGrade').val();
   var editStudentObj = new studentObj(name, course_name, grade, id)
   console.log(editStudentObj)
   editStudentObj.id = id;
 
   student_array.splice(studentReplaced, 1, editStudentObj);  
   editData(editStudentObj);
   updateStudentList(student_array);
}
/******************************************************************************************************* 
 * showDeleteModal - shows the delete modal
 * 
*/
function showDeleteModal() { 
$("#deleteModal").modal('show');
$("#deleteSubmit").off();
$("#deleteSubmit").click(() => {handleDeleteClick(this)});

}
/***************************************************************************************************
 
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
    $("#studentName, #course, #studentGrade").val('');
    $("#studentName").attr("placeholder", "Student Name");
    $("#course").attr("placeholder", "Student Course");
    $("#studentGrade").attr("placeholder", "Student Grade");
    $(".error").text('')
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(student, index){
var newRow = $('<tr>')
var nameField = $('<td>');
var courseField = $('<td>');
var gradeField = $('<td>');
var deleteButton = $('<button>', {
    class: "btn btn-delete btn-danger",
    text: 'Delete',
    id: ' ' +index+ '',
    css: {
        'color': 'white',
     }

}       
)
var editButton = $('<button>', {
    class: "btn btn-warning edit-btn",
    text: 'Edit',
    id:' '+index+'',
    css: {
        'color':'white'
    }
})
var name = student.name;
var grade = student.grade;
var course = student.course_name;
newName = nameField.append(name);
newCourse = courseField.append(course);
newGrade = gradeField.append(grade);
newRow.append(newName);
newRow.append(newCourse);
newRow.append(newGrade);
newRow.append(editButton);
newRow.append(deleteButton);

deleteButton.click(showDeleteModal);
editButton.click(handleEditClick);

$('.student-list tbody').append(newRow);

}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call s`tu`dent list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(students){
    $('.student-list tbody').empty();
    if(students) {
    for(var currentIndex = 0; currentIndex < students.length; currentIndex++) {
     var index = currentIndex;
     var student = students[index];
    renderStudentOnDom(student, index);
    }
   var average = calculateGradeAverage(students); // calculates grade average of all students
    renderGradeAverage(average); // appends grade average of all students
    }
}
/***************************************************************************************************
 * sortStudentName - this function changes the student sort from ascending
 * @param - none 
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */

 function sortToggle() {
    var targetSort = this.id
   arrow = $(`#${targetSort}`);
 if(arrow.hasClass("glyphicon-chevron-down")) {
     arrow.removeClass("glyphicon-chevron-down");
     arrow.addClass("glyphicon-chevron-up");
     sortData(targetSort, 'DESC');
     //ASC Low to High 
 }
 else {
    arrow.removeClass("glyphicon-chevron-up");
    arrow.addClass("glyphicon-chevron-down");
    sortData(targetSort, 'ASC');
    //DESC High to Low 
 }
    
 } 

 /***************************************************************************************************
 * applyFilter - applies filter to set where the filter will be set to toggle ascending or descending order 
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */

function applyFilter() {
    var target = $(this).text().toLowerCase(); 
    $('.filter').removeClass('glyphicon-chevron-down');
    $('.filter').removeClass(' glyphicon-chevron-up');
    $(`#sort-${target}`).addClass('glyphicon-chevron-down')
    targetSort = 'sort-' + target
    sortData(targetSort, 'ASC')
    $('.dropdown-content').toggle("show");
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(students){
    var totalGrade = null;
    var averageGrade = null;
    var average = null;
    for (var index = 0; index < students.length; index++) {
        totalGrade += parseInt(students[index].grade); 
        averageGrade = Math.round(totalGrade / students.length);
        average = averageGrade.toFixed(0);
    }
    return average;

}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(average){
    $(".page-header span").text(average);
}
/***************************************************************************************************
 *getData - makes a call using AJAX to learningFuze to get data
 * @returns: {undefined}none
 * 
 */
function getData() {
    var the_data = {
        action: 'readAll',
        };
        var ajaxOptions = {
            dataType: 'json',
            data: the_data,
            method: 'GET',
            url: 'data.php',
            beforeSend: function() { 
                $('#loader').addClass("loader")
            },
            success: function (response) {
                var responseArray = response.data;
                console.log(response);
                student_array = responseArray;
                console.log(student_array);
                updateStudentList(student_array);
               
                },
                complete: function() {
                    $('#loader').removeClass("loader")
                },
            error: function () {
                $('#errorModal').modal('show');
            }
        }
        $.ajax(ajaxOptions);
    }

/***************************************************************************************************
 *addData - makes a call using AJAX and adds data to server
 * @returns: {undefined}none
 * 
 */
function addData(student_name, course_name, course_grade) {
    var the_data = {
        action: 'insert',
        name: student_name, 
        course_name: course_name,
        grade: course_grade,
        };
        var ajaxOptions = {
            dataType: 'json',
            data: the_data,
            method: 'GET',
            url: 'data.php',
            beforeSend: function() { 
                $('#loader').addClass("loader")
            },
            success: function (response) {
                var id = response.id
                var student = new studentObj(student_name, course_name, course_grade, id); //Creates new student object
                student_array.push(student);
                 //pushes new student into student array
                 updateStudentList(student_array);
                student_array[student_array.length-1].id = response.id;
                },
            complete: function() {
                $('#loader').removeClass("loader")
            },
            error: function () {
                $('#errorModal').modal('show');
            }
        }
        $.ajax(ajaxOptions);
    }
/***************************************************************************************************
 *deleteData - deletes from server 
 * @returns: {undefined}none
 * 
 */
function deleteData(student) {
        var ajaxOptions = {
            dataType: 'json',
            data: {
              action: 'delete',
              id: parseInt(student.id),
                },
            method: 'get',
            url: 'data.php',
            beforeSend: function() { 
                $('#loader').addClass("loader")
            },
            complete: function() {
                $('#loader').removeClass("loader")
            },
            success: function (response) {
                $("#deleteSubmit").off();
                },
            error: function () {
                
                // $('#errorModal').modal("toggle");
                $('#errorModal').modal('show');
            }
        }
        $.ajax(ajaxOptions);
    }
/***************************************************************************************************
 *editData - Updates and edit from server 
 * @returns: {undefined}none
 * 
 */
function editData(student) {
    var ajaxOptions = {
        dataType: 'json',
        data: {
          action: 'update',
          id: parseInt(student.id),
          name: student.name,
          grade: student.grade,
          course_name: student.course_name,
            },
        method: 'get',
        url: 'data.php',
        beforeSend: function() { 
            $('#loader').addClass("loader")
        },
        success: function (response) {

            },
            complete: function() {
                $('#loader').removeClass("loader")
            },
        error: function () {
            $('#errorModal').modal('show');
        }
    }
    $.ajax(ajaxOptions);
}
/***************************************************************************************************
 *sortData - sortData and reappends from  server 
 * @returns: {undefined}none
 * 
 */

 function sortData(type, sort) {
    var ajaxOptions = {
        dataType: 'json',
        data: {
          type: type,
          sort: sort,
            },
        method: 'get',
        url: 'sort.php',
        beforeSend: function() { 
            $('#loader').addClass("loader")
        },
        success: function (response) {
            var responseArray = response.data;
            student_array = responseArray;
            updateStudentList(student_array);
            },
            complete: function() {
                $('#loader').removeClass("loader")
            },
        error: function () {
            $('#errorModal').modal('show');
        }
    }
    $.ajax(ajaxOptions);
}
     
  
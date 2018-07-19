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
student_array = [
];

class studentObj {
    constructor(student, course, grade) {
        this.name = student;
        this.course= course;
        this.grade= grade;
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
   
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
    addStudent();
    
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
function handleDeleteClick(){
  console.log("clicked");
  var deleteClick = $(this);
  deleteStudent(deleteClick);

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


    var student = new studentObj(currentStudent, course, grade); //Creates new student object
    addData(student);
        student_array.push(student);
         //pushes new student into student array
         updateStudentList(student_array);
         $('.delete').click(handleDeleteClick);
         
}
/***************************************************************************************************
 * deleteStudent - deletes the row clicked from student table by removing the current row value from the array
 * @param deleteClick the value of the row clicked 
 * @return {undefined}
 */

 function deleteStudent (deleteClick) {
     debugger;
    rowDeleted  = deleteClick.find('attr', 'row'); // change into a numeric value 
    rowValue = parseInt(rowDeleted.context.attributes[1].nodeValue);
    var deleted = student_array[rowValue];
    var deleteId= deleted.id;
    console.log(deleteId);
    deleteClick.parent().remove(); 
    deleteData(deleted); 
    student_array.splice(rowValue, 1);  
    deleteData(deleteId);

    updateStudentList(student_array);
    $('.delete').click(handleDeleteClick);
    // average = calculateGradeAverage(student_array); // calculates grade average of all students
    // renderGradeAverage(average); 

 }
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
    console.log("studentCleared");
    $("#studentName, #course, #studentGrade").val('');
    $("#studentName").attr("placeholder", "Student Name");
    $("#course").attr("placeholder", "Student Course");
    $("#studentGrade").attr("placeholder", "Student Grade");
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(student, index){
    
var newRow = $('<tr>', {
    'row' : ' '+index+'',
});
var nameField = $('<td>');
var courseField = $('<td>');
var gradeField = $('<td>');
var deleteButton = $('<button>', {
    'class': "delete btn btn-danger",
    'text': 'delete',
    'row' : ' ' + index + '',
    css: {
        'color': 'white'
     }
     
}       

)
var name = student.name;
var grade = student.grade;
var course = student.course;
newName = nameField.append(name);cd
newCourse = courseField.append(course);
newGrade = gradeField.append(grade);
newButton = 
newRow.append(newName);
newRow.append(newCourse);
newRow.append(newGrade);
newRow.append(deleteButton);
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
    for(var currentIndex = 0; currentIndex < students.length; currentIndex++) {
     var index = currentIndex;
     var student = students[index];
    renderStudentOnDom(student, index);
    }
   var average = calculateGradeAverage(students); // calculates grade average of all students
    renderGradeAverage(average); // appends grade average of all students
  
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
        api_key:'WkA2ZLjZlZ',
        };
        var ajaxOptions = {
            dataType: 'json',
            data: the_data,
            method: 'POST',
            url: 'https://s-apis.learningfuze.com/sgt/get',
            success: function (response) {
                console.log(response);
                debugger;
                var responseArray = response.data;
                console.log(responseArray);
                student_array = responseArray;

                updateStudentList(student_array);
                $('.delete').click(handleDeleteClick);
                },
            error: function () {
                $('errorModal').modal('toggle');
                console.log('error');
            }
        }
        $.ajax(ajaxOptions);
    }

/***************************************************************************************************
 *addData - makes a call using AJAX and adds data to server
 * @returns: {undefined}none
 * 
 */
function addData(student) {
    var the_data = {
        api_key:'WkA2ZLjZlZ',
        name: student.name, 
        course: student.course,
        grade: student.grade,
        };
        var ajaxOptions = {
            dataType: 'json',
            data: the_data,
            method: 'POST',
            url: 'https://s-apis.learningfuze.com/sgt/create',
            success: function (response) {
                console.log(response);
               // student_array[student_array.length-1].id = response.new_id;
                debugger;
                },
            error: function () {
                console.log('error');
            }
        }
        $.ajax(ajaxOptions);
    }
/***************************************************************************************************
 *deleteData - deletes from server 
 * @returns: {undefined}none
 * 
 */
function deleteData(studentId) {
        debugger;
        // var the_data = {
        // api_key:'WkA2ZLjZlZ',
        // id: studentId,
        // };
        var ajaxOptions = {
            dataType: 'json',
            data: {
                api_key:'WkA2ZLjZlZ',
                student_id: studentId,
                },
            method: 'POST',
            url: 'https://s-apis.learningfuze.com/sgt/delete',
            success: function (response) {
                console.log(response);
                console.log("removed");
                console.log(studentId);
                },
            error: function () {
                $('errorModal').modal('show');
                console.log('error');
            }
        }
        $.ajax(ajaxOptions);
    }
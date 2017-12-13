// Userlist data array for filling in info box

var userListData = [];



// DOM Ready =============================================================

$(document).ready(function() {


   // Add User button click

    $('#btnAddUser').on('click', addUser);
    // Populate the user table on initial page load

    populateTable();



});


// Username link click

$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);



// Functions =============================================================



// Fill table with data

function populateTable() {


    // Empty content string

    var tableContent = '';



    // jQuery AJAX call for JSON

    $.getJSON( '/users/userlist', function( data ) {

    // Stick our user data array into a userlist variable in the global object

    userListData = data;

        // For each item in our JSON, add a table row and cells to the content string

        $.each(data, function(){

            tableContent += '<tr>';

            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';

            tableContent += '<td>' + this.email + '</td>';

            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';

            tableContent += '</tr>';

        });



        // Inject the whole content string into our existing HTML table

        $('#userList table tbody').html(tableContent);

    });

};
// Show User Info

function showUserInfo(event) {



    // Prevent Link from Firing

    event.preventDefault();



    // Retrieve username from link rel attribute

    var thisUserName = $(this).attr('rel');



    // Get Index of object based on id value

    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);



    // Get our User Object

    var thisUserObject = userListData[arrayPosition];



    //Populate Info Box

    $('#userInfoName').text(thisUserObject.fullname);

    $('#userInfoAge').text(thisUserObject.age);

    $('#userInfoGender').text(thisUserObject.gender);

    $('#userInfoLocation').text(thisUserObject.location);



};

// Add User

function addUser() {
// Take the JSON back from the API and  display all of the infromation associated
var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "https://www.fullstory.com/api/v1/sessions?uid=8675309", true);
  xmlhttp.setRequestHeader('Content-Type',"application/json");
  xmlhttp.setRequestHeader('Authorization', "Basic " + "OTZYS0s6T1RaWVMwczZOelZ4YkM5clpFUXlMMHB0UzJWU1EyWnBPR0ZtTlM5blEyUkdlamhwVjNWQk5VWXlRMVJPUzB0RmN6MD0=");
  xmlhttp.withCredentials = true;
  xmlhttp.send();
}

function myFunction(xml) {
  var x, i, xmlDoc, txt;
  xmlDoc = xml.responseXML;
  txt = "";
  x = xmlDoc.getElementsByTagName("UserId");
  for (i = 0; i< x.length; i++) {
    txt += x[i].childNodes[0].nodeValue + "<br>";
  }
  document.getElementById("demo").innerHTML = txt;
}


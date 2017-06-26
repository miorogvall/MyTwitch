function save_options() {

var username = document.getElementById('username').value;

console.log(username);

if (username !== undefined) {

console.log(username);

    localStorage["mi_username"] = username;

console.log(localStorage["mi_username"]);

}
  
}

restore_options();
document.addEventListener('document_end', restore_options);

document.getElementById('save').addEventListener('click',
    save_options);

function restore_options() {

var username = localStorage["mi_username"];


if (username !== undefined) {

    document.getElementById('username').value = username;
}

}

$('body').on('click', '#save', function() {

$('.savemessage').css({


opacity: "1"


});

    setTimeout(function(){

        $('.savemessage').css({

            opacity: "0"

        });

     }, 1500);



});
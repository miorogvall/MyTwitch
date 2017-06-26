console.log(localStorage["mi_HTMLcontent"]);
var finalHTML = localStorage["mi_HTMLcontent"];

$('#content').remove(".streamerarea");
 $('#content').append(finalHTML);

$('body').on('click', '.streampicture', function () {

    var newTabLink = $(this).find('a').attr('href');
    console.log(newTabLink);

    window.open(newTabLink);
});


$('body').on('click', '.settingslink', function () {

    $('#content').attr('style', 'display: none;');
    $('#contentoptions').attr('style', 'display: table-cell;');


});

$('body').on('click', '.streamlink', function () {

    $('#content').attr('style', 'display: block;');
    $('#contentoptions').attr('style', 'display: none;');


});

$("body").on("#content > div > div.streamerinfo > a", "click", function () {
    console.log('hej');
});

$('body').on('click', '.game', function () {

    var newTabLink = $(this).attr('href');
    console.log(newTabLink);

    window.open(newTabLink);
});



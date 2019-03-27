'use strict'

$.get( '/api/marks', ( data ) => {
    data.marks.forEach(mark => {
        $('#marks table tbody').append(`<tr><td>${mark.semester}</td><td>${mark.subject}</td><td>${mark.mark}</td></tr>`);     
    });    
});

$('#navbar a').click((e) => {
    $('.container').hide();
    $('#'+$(e.target).attr('data-href')).show();
});
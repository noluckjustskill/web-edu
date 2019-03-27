'use strict'

$.get( '/api/marks', ( data ) => {
    data.forEach(mark => {
        $('#container table tbody').append(`<tr><td>${mark.semester}</td><td>${mark.subject}</td><td>${mark.mark}</td></tr>`);     
    });    
});
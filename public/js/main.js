'use strict'

$.get( '/api/marks', ( data ) => {
    data.marks.forEach(mark => {
        $('#marks table tbody').append(`<tr><td>${mark.semester}</td><td>${mark.subject}</td><td>${mark.mark}</td></tr>`);     
    });    
});
  
$('#navbar a').click((e) => {
    $('.container').hide();
    $('#'+$(e.target).attr('data-href')).show();
    $('#navbar a').removeClass('clicked').addClass('unclicked');
    $(e.target).removeClass('unlicked').addClass('clicked');
});

$.get('/api/stats', (data) => {
    Graphics_marks_render(data);
    Graphics_avrg_render(data);
});

$('#semestre').change(() => {
    $('#graphics').empty();
    $.get( '/api/stats', Graphics_marks_render);
});

function Graphics_marks_render( data ){
    Highcharts.chart('graphics', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Marks'
        },
        xAxis: {
            type: 'category',
            labels: {
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Количество'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Количество оценок: <b>{point.y:.0f}</b>'
        },
        series: [{
            name: 'marks',
            data: [
                ['2', data.stats[$('#semestre').val()][2]],    
                ['3', data.stats[$('#semestre').val()][3]],
                ['4', data.stats[$('#semestre').val()][4]],
                ['5', data.stats[$('#semestre').val()][5]]
            ],
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: 'black',
                format: '{point.y:.0f}', // one decimal
                y: 5, // 5 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Georgia',
                }
            }
        }]
    });
      
}

function Graphics_avrg_render( data ){
    Highcharts.chart('graphics1', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'average'
        },
        xAxis: {
            type: 'category',
            labels: {
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Средний балл'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Средний балл: <b>{point.y:.1f}</b>'
        },
        series: [{
            name: 'average',
            data: [
                ['1', Avrg_mark(data, 1)], 
                ['2', Avrg_mark(data, 2)], 
                ['3', Avrg_mark(data, 3)], 
                ['4', Avrg_mark(data, 4)], 
                ['5', Avrg_mark(data, 5)],    
                ['6', Avrg_mark(data, 6)], 
                ['7', Avrg_mark(data, 7)], 
                ['8', Avrg_mark(data, 8)]
            ],
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: 'black',
                format: '{point.y:.2f}', // one decimal
                y: 5, // 5 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Georgia'
                }
            }
        }]
    });
      
}

function Avrg_mark( data, sem ){
   let count = 0; //количество оценок
   let sum = 0; //суммарный балл
    for (var i in data.stats[sem]){
         if(typeof(data.stats[sem][i]) !== undefined){
         count += data.stats[sem][i];
         sum += i * data.stats[sem][i];
        }
    }
    return(sum/count);
}

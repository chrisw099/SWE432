var express = require('express');
const ejs = require('ejs');


var app = express();
app.use(express.static(__dirname +'/static'));

app.set('view engine', 'ejs')
app.listen(8080);
console.log("Server is running on port 8080 ");



app.get('/', function(req, res){
    var options = [
        {
            Name: 'Test 1',
            Artist: 'Something'
        },
        {
            Name: 'Test 2',
            Artist: 'Something'
        },        
        {
            Name: 'Test 3',
            Artist: 'Something'
        },
        {
            Name: 'Test 4',
            Artist: 'Something'
        },
        {
            Name: 'Test 5',
            Artist: 'Something'
        },
        {
            Name: 'Test 6',
            Artist: 'Something'
        },        
        {
            Name: 'Test 7',
            Artist: 'Something'
        },
        {
                Name: 'Test 8',
                Artist: 'Something'
        },
        {
            Name: 'Test 9',
            Artist: 'Something'
        },
        {
            Name: 'Test 10',
            Artist: 'Something'
        },        
        {
            Name: 'Test 11',
            Artist: 'Something'
        },
        {
            Name: 'Test 12',
            Artist: 'Something'
        },
        {
            Name: 'Test 13',
            Artist: 'Something'
        },
        {
            Name: 'Test 14',
            Artist: 'Something'
        },        
        {
            Name: 'Test 15',
            Artist: 'Something'
        },
        {
            Name: 'Test 16',
            Artist: 'Something'
        },
        {
            Name: 'Test 17',
            Artist: 'Something'
        },
        {
            Name: 'Test 18',
            Artist: 'Something'
        },        
        {
            Name: 'Test 19',
            Artist: 'Something'
        },
        {
                Name: 'Test 20',
                Artist: 'Something'
        },
        {
            Name: 'Test 21',
            Artist: 'Something'
        },
        {
            Name: 'Test 22',
            Artist: 'Something'
        },        
        {
            Name: 'Test 23',
            Artist: 'Something'
        },
        {
            Name: 'Test 24',
            Artist: 'Something'
        }                                            
    ];

    res.render('pages/djPage', {
        options: options

    });
});

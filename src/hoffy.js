/*
 Ericsson Colborn, NYU '23 Computer & Data Science
 Applied Internet Technology
 Professor Versoza
 New York University
*/

// hoffy.js

function getEvenParam(...args) { // check!

    if (args.length === 0) return [];

    else return args.filter(s => args.indexOf(s) % 2 === 0);
}

function maybe(fn) { // check!

    return function newFn(...args) {
        if (args.includes(null)) return undefined;
        else return fn(...args);
    }
}

function filterWith(fn) { // check!

    return function newFn(arg) { // assume newFn take one param, an array
        return arg.filter(fn);
    }
}

function repeatCall(fn, n, arg) { // check!

    function newFn (arg, m) {

        if (m > 0) {
            
            m--;
            fn(arg);
            newFn(arg, m);
        
        } else return undefined;
    
    } newFn(arg, n)
}

function largerFn(fn, gn) { // checK!

    return function newFn(arg1, arg2) {

        if (fn(arg1) > gn(arg2)) return fn;
        else return gn;
    }
}

function limitCallsDecorator(fn, n) { //check!

    times_called = 0;
    function newFn (...args) {
        
        if (times_called < n) {
            
            times_called ++;
            return fn(...args);

        } else return undefined

    } return newFn
}

fs = require('fs')
function myReadFile(filename, successFn, errorFn) { // check!

    fs.readFile(filename, 'utf-8', (err, data) => {

        if (err) return errorFn(err);
        else return successFn(data);
    })
}

function rowsToObjects(data) { // check!

    const headers = data.headers;
    const rows = data.rows;

    return rows.map(row => row.reduce(function (prev, curr, index) {

        prev[headers[index]] = curr;
        return prev;
    
    }, {}))
}
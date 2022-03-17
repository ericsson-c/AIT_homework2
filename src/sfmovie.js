// sfmovie.js

// NOTE: I changed the file name to "sf.csv" to make it easier to read
// NOTE: In order for the functions to work, they MUST be called within
// the 'end' event handler in fs.createReadStream

/*
Source: Node docs
URL: https://www.npmjs.com/package/csv-parser

The docs provided this implementation of the csv parser module
to read a csv file into an array of objects.
*/

const csv = require('csv-parser');
const fs = require('fs');
const results = [];

function driver (path) {
    fs.createReadStream(path)
    .pipe(csv())
    .on('data', (data) => {
        results.push(data)})
    .on('end', () => {

        /*
        PLACE FUNCTION CALLS HERE
        */

        const funFact = longestFunFact(results);
        // print name and release year
        const movies2021 = getMovies2021(results);
        // print them out, formatted nicely
        const prodComp = getProductionCompany(results);
        // print out nicely

        console.log(

            `* The movie ${funFact['Title']} has the longest fun facts, it was filmed in ${funFact['Release Year']}.\n* The movies filmed in 2021 are ${movies2021[0]['Title']}, ${movies2021[1]['Title']}, ${movies2021[2]['Title']}.\n* Three production companies are: ${prodComp[0]}, ${prodComp[1]}, ${prodComp[2]}.`
        );
    });
}


function longestFunFact(data) {
    let max = {"Fun Facts": ''};
    data.reduce(function (prev, curr) {
        if (curr['Fun Facts'].length > max['Fun Facts'].length) {
            max = curr;
        }
    }, max);
    return max;
}   

function getMovies2021(data) {
    
    const movies2021 = [];
    data.reduce(function (prev, curr) {
        if (curr['Release Year'] === '2021' && !(movies2021.some((movie) =>
        movie['Title'] == curr['Title']))) {
            movies2021.push(curr);
        }
    });
    return movies2021;
}


function getProductionCompany(data) {

    const prod_comp = [];
    data.reduce(function (prev, curr) {
        if (!(prod_comp.some((comp) => curr['Production Company'] === comp))) {
            prod_comp.push(curr['Production Company']);
        }
    });
    return prod_comp;
}

function mostPopularActors(data) {
    let actors = [];
    data.reduce(function (prev, curr) {

        actors.push(curr['Actor 1'], curr['Actor 2'], curr['Actor 3']);
    })

    occurences = {};
    actors.reduce(function (prev, actor) {

        if (occurences.hasOwnProperty(actor)) {
            occurences[actor] = occurences[actor] + 1;
        
        } else {
            occurences[actor] = 0;
        }
    });

    // ignore empty string
    delete occurences[''];

    best_actors = {'foo': 0, 'bar': 0, 'baz': 0};
    Object.values(occurences).reduce(function (prev, num, index) {
    
        if (Object.values(best_actors).some((ele) => num > ele)) {
            
            let min = 100000;
            let worst_actor = 'me';
            Object.keys(best_actors).reduce(function(prev, actor) {

                if (best_actors[actor] < min) {

                    min = best_actors[actor];
                    worst_actor = actor;
                }
            }, best_actors[0]);

            delete best_actors[worst_actor];
            best_actors[Object.keys(occurences)[index]] = num;
        }
    });

    return best_actors;
}

module.exports = {
    longestFunFact: longestFunFact,
    getMovies2021: getMovies2021,
    getProductionCompany: getProductionCompany,
    mostPopularActors: mostPopularActors,
    driver: driver
}
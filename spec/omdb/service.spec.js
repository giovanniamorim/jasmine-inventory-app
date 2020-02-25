describe('omdb service', function(){
    var movieData = { Search: [ {"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","Rated":"PG","Released":"25 May 1977","Runtime":"121 min","Genre":"Action, Adventure, Fantasy, Sci-Fi","Director":"George Lucas","Writer":"George Lucas","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing","Plot":"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.","Language":"English","Country":"USA","Awards":"Won 6 Oscars. Another 52 wins & 28 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.6/10"},{"Source":"Rotten Tomatoes","Value":"93%"},{"Source":"Metacritic","Value":"90/100"}],"Metascore":"90","imdbRating":"8.6","imdbVotes":"1,170,893","imdbID":"tt0076759","Type":"movie","DVD":"21 Sep 2004","BoxOffice":"N/A","Production":"20th Century Fox","Website":"N/A","Response":"True"}] }
    var movieDatabyId = {"Title":"Stand Up, Virgin Soldiers","Year":"1977","Rated":"N/A","Released":"05 Apr 1977","Runtime":"90 min","Genre":"Comedy, War","Director":"Norman Cohen","Writer":"Leslie Thomas (novel), Leslie Thomas (screenplay)","Actors":"Robin Askwith, Nigel Davenport, George Layton, John Le Mesurier","Plot":"Two soldiers stationed in Singapore set off in pursuit of the fairer sex instead of carrying out their orders. Soon after their arrival on the exotic island, the two visit a local brothel and there encounter a pair of lusty nurses.","Language":"English","Country":"UK","Awards":"N/A","Poster":"https://m.media-amazon.com/images/M/MV5BZThkNTg5MzItODE2Yi00MjA1LTk5MzItNGI3ZGNlZDJlMDViXkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"4.5/10"}],"Metascore":"N/A","imdbRating":"4.5","imdbVotes":"135","imdbID":"tt0076758","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}
    var omdbApi = {};
    var $httpBackend;

    beforeEach(module('omdb'));
    beforeEach(inject(function(_omdbApi_, _$httpBackend_){
        omdbApi     = _omdbApi_;
        $httpBackend = _$httpBackend_;
    }));

    it('Should return movieData', function(){
        var response;

        var expectedUrl =  'http://www.omdbapi.com/?v=1&s=star%20wars'
        // var expectedUrl = function(url) {
        //     return url.indexOf('http://www.omdbapi.com') !== -1;
        // }

        $httpBackend.when('GET', expectedUrl)
            .response(200, movieData);

        omdbApi.search('star wars')
            .then(function(data) {
                response = data;
            });
        $httpBackend.flush();
        expect(response).toEqual(movieData);
    });

    it('Should handle error', function(){
        var response;
        $httpBackend.expect('GET', 'http://www.omdbapi.com/?v=1&i=tt0076758')
            .response(500);
        omdbApi.find('tt0076758')
            .then(function(data){
                response = data;
            })
            .catch(function(){
                response = 'Error!'
            });
        $httpBackend.flush();
        expectedUrl(response).toEqual('Error!');
    });

    it('should return a movieData by id', function() {
        var response;

        $httpBackend.expect('GET', 'http://www.omdbapi.com/?v=1&i=tt0076758')
            .response(200, movieDatabyId);
        omdbApi.find('tt0076758')
            .then(function(data){
                response = data;
            });
        $httpBackend.flush();
        expect(response).toEqual(movieDatabyId);
    });


});
(function () {
    angular
        .module('Moviez')
        .factory('movieService',movieService);

    function movieService($http) {

        var api={
            searchMovies: searchMovies,
            getMovie: getMovie
        };

        return api;

        function searchMovies(searchtext) {
            var url = 'https://api.themoviedb.org/3/search/movie?api_key=5a57d87cef01b95a12c3ca8862bf24f7' +
                '&language=en-US&query='+searchtext;
            return $http.get(url)
                .then(search);

            function search(resp) {
                return(resp.data);
            }
        }

        function getMovie(movieId) {
            var url = 'https://api.themoviedb.org/3/movie/'+ movieId +
                '?api_key=5a57d87cef01b95a12c3ca8862bf24f7&language=en-US';
            return $http.get(url)
                .then(renderMovie);

            function renderMovie(resp) {
                return(resp.data);
            }
        }

    }
})();
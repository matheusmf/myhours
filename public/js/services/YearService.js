angular.module('myhours').factory('Year',
                                    function($resource) {
    return $resource('/years/:id');
});
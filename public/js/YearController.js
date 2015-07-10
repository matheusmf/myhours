angular.module('myhours').controller('YearController', 
    function($scope, $routeParams, Year) {
        $scope.mensagem = {texto: ''};
        
        if($routeParams.yearid) {
            Year.get({id: $routeParams.yearid},
                function(year) {
                    $scope.year = year;
                },
                function(erro) {
                    $scope.mensagem = {
                        texto: 'Não foi possível obter o year.'
                    };
                    console.log(erro);
                }
            );
        } else {
            $scope.year = new Year();
        }
    
        $scope.salva = function() {
            $scope.year.$save()
                .then(function() {
                    $scope.mensagem = {
                        texto: 'Salvo com sucesso.'
                    };
                    $scope.year = new Year();
                    $scope.$broadcast('yearSalvo');
                })
                .catch(function(erro) {
                    $scope.mensagem = {
                        texto: 'Não foi possível salvar'
                    };
                });
        };
    
        Year.query(function(years) {
            $scope.years = years;
        });
    }
);
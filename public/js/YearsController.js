angular.module('myhours').controller('YearsController', 
    function($scope, Year) {
        $scope.years = [];

        $scope.filtro = '';
    
        $scope.mensagem = {texto: ''};

        function buscaYears() {
            Year.query(function(years) {
                $scope.years = years;
                $scope.mensagem = {};
            },
            function(erro) {
               console.log(erro);
               $scope.mensagem = {
                   texto: 'Não foi possível obter a lista.'
               };
            });
        }
        buscaYears();

        $scope.remove = function(year) {
            Year.delete({id: year._id}, 
                buscaYears, 
                function(erro) {
                    $scope.mensagem = {
                        texto: 'Não foi possível remover o ano.'
                    };
                    console.log(erro);
                }
            );
        }
    
});
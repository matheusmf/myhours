var sanitize = require('mongo-sanitize');

module.exports = function(app) {
    var Year = app.models.year;
    var Month = app.models.month;
    
    var controller = {};
  
    controller.listYears = function(req, res) {
        Year.find().exec()
            .then(
                function(years) {
                    res.json(years);
                },
                function(erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
             );
    };
  
    controller.getYear = function(req, res) {
        var _id = req.params.id;
        Year.findById(_id).exec()
            .then(
                function(year) {
                    if(!year) throw new Error('Ano não encontrado.');
                    res.json(year);
                },
                function(erro) {
                    console.log(erro);
                    res.status(404).json(erro);
                }
            );
    };
    
    controller.removeYear = function(req, res) {
        var _id = sanitize(req.params.id);
        Year.findById(_id).exec()
            .then(
                function(year) {
                    Month.remove({'year': year}).exec();
                    Year.remove({'_id' : _id}).exec()
                    .then(
                        function() {
                            res.end();
                        },
                        function(erro) {
                            return console.error(erro);
                        }
                    );
                },
                function(erro) {
                    console.log(erro);
                    res.status(404).json(erro);
                }
            );
    };
    
    controller.saveYear = function(req, res) {

        var _id = req.body._id;
        req.body.emergencia = req.body.emergencia || null;
        
        var dados = {
            "name": req.body.name
        };

        if(_id) {
         Year.findByIdAndUpdate(_id, {$set: dados}).populate('months').exec()
         .then(
          function(year) {
            res.json(year);
          }, 
          function(erro) {
            console.error(erro)
            res.status(500).json(erro);
          }
         );
        } else {
          Year.create(dados)
          .then(
            function(year) {
              year = saveYearWithMonth(year);
              res.status(201).json(year);
            }, 
            function(erro) {
              console.log(erro);
              res.status(500).json(erro);
            }
          );
        }
      };

      var saveYearWithMonth = function(year) {
          var months = createMonths(year);
          var dados = {
            "name": year.name,
            "months": months
          };
          Year.findByIdAndUpdate(_id, {$set: dados}).exec()
           .then(
            function(yearWithMonth) {
              return yearWithMonth;
            }, 
            function(erro) {
              console.error(erro);
              return year;
            }
          );
      };

      var createMonths = function(year) {
          var months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
          var index, len;
          var listMonths = [];
          for (index = 0, len = months.length; index < len; ++index) {
              var month = {
                "name": months[index],
                "number": index,
                "year": year
              };
              saveMonth(month);
              listMonths.push(month);
          }
          return listMonths;
      };

      var saveMonth = function(month) {
          Month.create(month);
      };

        
    return controller;
};
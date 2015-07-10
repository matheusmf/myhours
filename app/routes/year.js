function verificaAutenticacao(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}

module.exports = function(app) {
    var controller = app.controllers.year;
    
    app.route('/years')
        .get(verificaAutenticacao, controller.listYears)
        .post(verificaAutenticacao, controller.saveYear);
    
    app.route('/years/:id')
        .get(verificaAutenticacao, controller.getYear)
        .delete(verificaAutenticacao, controller.removeYear);
};
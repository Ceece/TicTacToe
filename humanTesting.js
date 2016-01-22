describe('TicTacToeController', function() {
    beforeEach(module('TicTacToe'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('stategy', function() {
        it('win return 1\nXX_ => XXX\nOO_ => OO_\n___ => ___', function() {
            var $scope = {};
            var controller = $controller('TicTacToeController', { $scope: $scope });
            $scope.game.playerTurn = false;
            $scope.game.marks = ['X','X',null,'O','O',null,null,null,null];
            expect($scope.game.maxScoreHumanAt(2) >= 1).toBe(true);
        });

        it('block return 0.1\nOO_ => OOX\nXX_ => XX_\n___ => ___', function() {
            var $scope = {};
            var controller = $controller('TicTacToeController', { $scope: $scope });
            $scope.game.playerTurn = false;
            $scope.game.marks = ['O','O',null,'X','X',null,null,null,null];
            expect($scope.game.maxScoreHumanAt(2) >= 0.1).toBe(true);
        });

        it('fork return 0.01\nX__ => X_X\nO__ => O__\n___ => ___', function() {
            var $scope = {};
            var controller = $controller('TicTacToeController', { $scope: $scope });
            $scope.game.playerTurn = false;
            $scope.game.marks = ['X',null,null,'O',null,null,null,null,null];
            expect($scope.game.maxScoreHumanAt(2) >= 0.01).toBe(true);
        });

        it('block fork return 0.001\nO__ => O_X\nX__ => X__\n___ => ___', function() {
            var $scope = {};
            var controller = $controller('TicTacToeController', { $scope: $scope });
            $scope.game.playerTurn = false;
            $scope.game.marks = ['O',null,null,'X',null,null,null,null,null];
            expect($scope.game.maxScoreHumanAt(2) >= 0.001).toBe(true);
        });

        it('fork and block fork return 0.011\nX__ => X_X\n__O => __O\n___ => ___', function() {
            var $scope = {};
            var controller = $controller('TicTacToeController', { $scope: $scope });
            $scope.game.playerTurn = false;
            $scope.game.marks = ['X',null,null,null,null,'O',null,null,null];
            expect($scope.game.maxScoreHumanAt(2) >= 0.011).toBe(true);
        });

        it('center return 0.0001\n___ => ___\n___ => _X_\n___ => ___', function() {
            var $scope = {};
            var controller = $controller('TicTacToeController', { $scope: $scope });
            $scope.game.playerTurn = false;
            $scope.game.marks = [null,null,null,null,null,null,null,null,null];
            expect($scope.game.maxScoreHumanAt(4)).toEqual(0.0001);
        });

        it('find best indexes', function() {
            var $scope = {};
            var controller = $controller('TicTacToeController', { $scope: $scope });
            $scope.game.playerTurn = false;
            $scope.game.marks = ['X','X',null,'O','O',null,null,null,null];
            expect($scope.game.maxScoreHumanIndexes()).toEqual([2]);
        });
    });
});
describe('TicTacToeController', function() {
	beforeEach(module('TicTacToe'));

	var $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	describe('minimax', function() {
		it('score return 10 if marks = \nXXX\nOO_\n___', function() {
			var $scope = {};
			var controller = $controller('TicTacToeController', { $scope: $scope });
			$scope.game.marks = ['X','X','X','O','O',null,null,null,null];
			expect($scope.game.score()).toEqual(10);
		});

		it('score return 10 if marks = \nXX_\nOOO\n___', function() {
			var $scope = {};
			var controller = $controller('TicTacToeController', { $scope: $scope });
			$scope.game.marks = ['X','X',null,'O','O','O',null,null,null];
			expect($scope.game.score()).toEqual(-10);
		});

		it('minimax return 9 if marks = \nOO_\nXX_\nOXO', function() {
			var $scope = {};
			var controller = $controller('TicTacToeController', { $scope: $scope });
			$scope.game.playerTurn = false;
			$scope.game.marks = ['O','O',null,'X','X',null,'O','X','O'];
			expect($scope.game.minimax()).toEqual(9);
		});

		it('minimax return -6 if marks = \n_O_\n__O\nXXO', function() {
			var $scope = {};
			var controller = $controller('TicTacToeController', { $scope: $scope });
			$scope.game.playerTurn = false;
			$scope.game.marks = [null,'O',null,null,null,'O','X','X','O'];
			expect($scope.game.minimax()).toEqual(-6);
		});
	});
});
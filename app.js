var app = angular.module('TicTacToe', ['ui.bootstrap']);

app.controller('TicTacToeController', ['$scope', '_', '$uibModal', function($scope, _, $uibModal){
	$scope.marks = ['O', 'X'];
	$scope.game = {
		playerMark: $scope.marks[0],
		computerMark: $scope.marks[1],
		playerFirst: true,
		winCases: [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],
		marks: ["T","I","C","T","A","C","T","O","E"],
		reds: [true,false,false,true,false,false,true,false,false],
		__done: true,
		startGame: function() {
			this.__done = false;
			this.playerTurn = this.playerFirst;
			this.marks = [null,null,null,null,null,null,null,null,null];
			this.reds = [false,false,false,false,false,false,false,false,false]
			this.computerTurn();
		},
		isPlayerTurn: function(){
			return this.playerTurn;
		},
		isComputerTurn: function(){
			return !this.isPlayerTurn()
		},
		isDone: function(){
			var wonCases = this.getWonCases();
			var isFull = this.isFull();
			return wonCases.length || isFull;
		},
		isPlayerWin: function(){
			var wonCases = this.getWonCases();
			return wonCases.length && this.marks[wonCases[0][0]] == this.playerMark;
		},
		isComputerWin: function(){
			var wonCases = this.getWonCases();
			return wonCases.length && this.marks[wonCases[0][0]] == this.computerMark;
		},
		score: function(depth){
			depth = depth || 0;
			if ( this.isComputerWin() )
				return 10 - depth;
			else if ( this.isPlayerWin() )
				return depth - 10;
			else
				return 0;
		},
		getAvailableIndexes: function(){
			var marks = this.marks;
			return [0,1,2,3,4,5,6,7,8].filter(function(index) {
				return marks[index] === null;
			});
		},
		minimax: function(depth){
			depth = depth || 0;
			
			if (this.isDone())
				return this.score(depth)
		    
		    depth += 1;
		    
		    var scores = [], moves = [], possibleGame;
		    var game = this;
		    this.getAvailableIndexes().forEach(function(move){
		        possibleGame = angular.copy(game);
		        possibleGame.marks[move] = game.playerTurn ? possibleGame.playerMark : possibleGame.computerMark;
		        possibleGame.playerTurn = !possibleGame.playerTurn;
		        var score = possibleGame.minimax(depth);		        
		        scores.push(score);
		        moves.push(move);
		    });

			var targetScore = scores.reduce(function(a,b){
				return game.playerTurn ? Math.min(a,b) : Math.max(a,b);
			});

			var targetScoreIndex;
			scores.forEach(function(score, index) {
				if (targetScore == score)
					targetScoreIndex = index;
			});
			return scores[targetScoreIndex];
		},
		minimaxIndexes: function(){
			var scores = [], moves = [], possibleGame;
		    var game = this;
		    var depth = 1;
		    this.getAvailableIndexes().forEach(function(move){
		        possibleGame = angular.copy(game);
		        possibleGame.marks[move] = game.playerTurn ? possibleGame.playerMark : possibleGame.computerMark;
		        possibleGame.playerTurn = !possibleGame.playerTurn;
		        var score = possibleGame.minimax(depth);		        
		        scores.push(score);
		        moves.push(move);
		    });

		    var targetScore = scores.reduce(function(a,b){
				return Math.max(a,b);
			});

			var indexes = [];
			scores.forEach(function(score, index) {
				if (targetScore == score)
					indexes.push(moves[index]);
			});
			return indexes;
		},
		switchTurn: function() {
			var wonCases = this.getWonCases();
			var reds = this.reds;
			this.playerTurn = !this.playerTurn;

			if(this.isDone()) {
				this.__done = true;
				this.playerFirst = !this.playerFirst;
				wonCases.forEach(function(wonCase){
					wonCase.forEach(function(index){
						reds[index] = true;
					});
				});
			} 

			if (this.isComputerTurn()) {
				this.computerTurn();
			}
		},
		clickOn: function(index){
			if (this.__done) {
				this.startGame();
			} else if (this.playerTurn) {
				this.writeMark(index);
			}
		},
		writeMark: function(index){
			if (!this.marks[index]){
				this.marks[index] = this.playerTurn ? this.playerMark : this.computerMark;
				this.switchTurn();
				return true;
			}
			return false;
		},
		isFull: function(){
			var playerMark = this.playerMark;
			var computerMark = this.computerMark;
			return this.marks.filter(function(mark) {
				return [playerMark, computerMark].indexOf(mark) !== -1;
			}).length == 9;
		},
		getWonCases: function(){
			var marks = this.marks;
			var playerMark = this.playerMark;
			var computerMark = this.computerMark;
			return this.winCases.filter(function(winCase) {
				return [playerMark, computerMark].indexOf(marks[winCase[0]]) !== -1 && 
				marks[winCase[0]] == marks[winCase[1]] && 
				marks[winCase[1]] == marks[winCase[2]];
			});
		},
		computerTurn: function(){
			if (this.playerTurn || this.__done)
				return false;
			if(this.getAvailableIndexes().length > 7) {
				var avaiable = this.maxScoreHumanIndexes()
			} else {
				var avaiable = this.minimaxIndexes();
			}
			var index = avaiable[Math.floor(Math.random() * avaiable.length)];

			this.writeMark(index);
		},
		maxScoreHumanAt: function(index){
			
			var win = 0;
			var block = 0;
			var fork = 0;
			var blockFork = 0;
			var center = 0;
			var oppositeCorner = 0;
			var corner = 0;

			var game = angular.copy(this);
			var marks = game.marks;
			var computerMark = game.computerMark;
			var playerMark = game.playerMark;
			var cases = game.winCases.filter(function(c) {
				return c.indexOf(index) !== -1
			});

			marks[index] = computerMark;
			cases.forEach(function(c) {
				var countPlayerMarks = c.filter(function(i) {
					return marks[i] == playerMark;
				}).length;

				var countComputerMarks = c.filter(function(i) {
					return marks[i] == computerMark;
				}).length;

				if (countComputerMarks == 3)
					win++;
				
				if (countComputerMarks == 1 && countPlayerMarks == 2)
					block++;

				if (countComputerMarks == 2 && countPlayerMarks == 0)
					fork++;

				if (countComputerMarks == 1 && countPlayerMarks == 1)
					blockFork++;
			});

			if (index == 4) {
				center ++;
			} else if (index % 2 === 0) {
				corner ++;
				if (
					index == 0 && marks[8] == playerMark ||
					index == 2 && marks[6] == playerMark ||
					index == 6 && marks[2] == playerMark ||
					index == 8 && marks[0] == playerMark
				)
					oppositeCorner ++;
			}

			var score = 1 * win + 
						0.1 * block + 
						0.01 * fork +
						0.001 * blockFork +
						0.0001 * center +
						0.00001 * oppositeCorner +
						0.000001 * corner;

			return score;
		},
		maxScoreHumanIndexes: function(){
			var that = this;
			var indexes = [0,1,2,3,4,5,6,7,8].filter(function(index) {
				return that.marks[index] === null;
			});

			var scores = indexes.map(function(index) {
				return that.maxScoreHumanAt(index);
			});

			var max = scores.reduce(function(a,b) {
				return Math.max(a,b);
			});

			return indexes.filter(function(index, i) {
				return scores[i] == max;
			});
		}
	};

	$scope.openModal = function() {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'modal.html',
			controller: 'TicTacToeModalController',
			resolve: {
				marks: function(){
					return $scope.marks;
				}
			}
		});

		modalInstance.result.then(function(marks) {
			$scope.marks = marks;
			$scope.game.playerMark = $scope.marks[0];
			$scope.game.computerMark = $scope.marks[1];
		});
	};

	$scope.openModal();
}]);

app.controller('TicTacToeModalController', ['$scope', '$uibModalInstance', 'marks', function($scope, $uibModalInstance, marks){
	$scope.marks = marks;
	$scope.select = function(index){
		if (index == 0)
			$uibModalInstance.close($scope.marks);
		else
			$uibModalInstance.close($scope.marks.reverse());
	}
}]);

app.factory('_', ['$window', function($window){
	return $window._;
}]);
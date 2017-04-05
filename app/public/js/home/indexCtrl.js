 'use strict';

angular.module('AppHome')
  .controller('indexCtrl',['$scope','$http', '$uibModal', '$log','cursoFactory' , function ($scope,$http, $uibModal, $log, cursoFactory) {

  	 cursoFactory.list(function (curso) {
        $scope.curso = curso;
   
    });

	function GetAllCurso() {
		  $http.get('/curso/getall').success(function (data, status, headers, config) {
			  $scope.cursos = data;
		  })
		  .error(function (data, status, header, config) {
			  $scope.ResponseDetails = "Data: " + data +
				  "<br />status: " + status +
				  "<br />headers: " + jsonFilter(header) +
				  "<br />config: " + jsonFilter(config);
		  });
	  };
	GetAllCurso();




	  $scope.myInterval = 5000;
	  $scope.noWrapSlides = false;
	  $scope.active = 0;
	  var slides = $scope.slides = [];
	  var currIndex = 0;

	$scope.addSlide = function() {
		var newWidth = 600 + slides.length + 1;
		slides.push({
		  image: '//unsplash.it/' + newWidth + '/300',
		  text: ['Fundación Jaspe','Fundación Jaspe','That is so cool','I love that'][slides.length % 4],
		  id: currIndex++
		});
	};

  	$scope.randomize = function() {
		var indexes = generateIndexesArray();
		assignNewIndexesToSlides(indexes);
  	};

	for (var i = 0; i < 2; i++) {
		$scope.addSlide();
  	}

  // Randomize logic below

	function assignNewIndexesToSlides(indexes) {
		for (var i = 0, l = slides.length; i < l; i++) {
		  slides[i].id = indexes.pop();
		}
	  }

	  function generateIndexesArray() {
		var indexes = [];
		for (var i = 0; i < currIndex; ++i) {
		  indexes[i] = i;
		}
		return shuffle(indexes);
	}

  // http://stackoverflow.com/questions/962802#962890
	function shuffle(array) {
		var tmp, current, top = array.length;

		if (top) {
		  while (--top) {
			current = Math.floor(Math.random() * (top + 1));
			tmp = array[current];
			array[current] = array[top];
			array[top] = tmp;
		  }
		}

		return array;
	  }


  }]);

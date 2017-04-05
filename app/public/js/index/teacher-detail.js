

angular.module('App')
  .controller('teacher-detail',['teacherFactory', '$scope' , '$routeParams','$http', function (teacherFactory, $scope, $routeParams, $http) {

  	teacherFactory.find($routeParams.id , function (teacher) {
  		$scope.p = teacher;
  	});
  $scope.rate = 0;
  $scope.max = 10;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    //$scope.percent = 10;
    $scope.percent = 10 * (value / $scope.max);
  };

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];



  $scope.enviar = function () {
   // document.getElementById('lineChart').style.display = 'block';
   // document.getElementById('calificacion').style.display = 'none';
    var elObjeto = new Object();
      elObjeto.id = $scope.p.id;
      elObjeto.rate = $scope.rate;
      elObjeto.user = document.getElementById("id").innerHTML;
      
    //var idUser = document.getElementById("id").firstChild.data;

    $scope.data =elObjeto;
    console.log("data",$scope.data);
    $http.put('/profesor/updatevotos/' + $scope.data.id, $scope.data).success(function(response) {
       // GetAllTeacherSuplent();


      teacherFactory.resultados($routeParams.id, function (datos) {
        $scope.datos = datos;
        var numero = $scope.datos.promedio;
        $scope.datos.promedio = numero.toFixed(1);
       //console.log("datos sin cache", datos);
       /************************************/
      const CHART = document.getElementById("lineChart").getContext('2d');
      var lineChart = new Chart(CHART, {
      type:'horizontalBar',
      data : {
      labels: ["10", "9", "8", "7", "6", "5", "4","3","2","1"],
      datasets: [
              {
                  label: "Total de votos del profesor",
                  backgroundColor: [
                      'rgba(0, 255, 0, 0.4)',
                      'rgba(50, 255, 50, 0.4)',
                      'rgba(125, 255, 125, 0.4)',
                      'rgba(75, 125, 255, 0.4)',
                      'rgba(50, 80, 255, 0.4)',
                      'rgba(100, 50, 255, 0.4)',
                      'rgba(200, 102, 200, 0.4)',
                      'rgba(255, 150, 155, 0.4)',
                      'rgba(255, 100, 100, 0.4)',
                      'rgba(255, 0, 0, 0.4)'
                  ],
                  borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  fill: false,
                  lineTension: 0.1,
                  //backgroundColor: "rgba(75,192,192,0.4)",
                  //borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: [datos.ten, datos.nine, datos.eight, datos.seven, datos.six, datos.five, datos.fourth, datos.three,datos.two,datos.one],
              }
            ]
          }
        });
       /************************************/
    });

      });

  


  };


  var config = { headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}}; 
  function GetResultados() {
        $http.get('/profesor/calificacion').success(function (data, status, headers, config) {
            $scope.profesor = data;
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<br />status: " + status +
                "<br />headers: " + jsonFilter(header) +
                "<br />config: " + jsonFilter(config);
        });

    };



  }]);

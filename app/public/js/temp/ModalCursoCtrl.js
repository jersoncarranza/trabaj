 'use strict';

angular.module('App')
    .controller('ModalCursoCtrl',['$scope','$http' , '$uibModalInstance', 'upload2',  function ($scope, $http, $uibModalInstance, upload2 ) {

	
        // console.log("desde modal curso", localStorage.getItem("id"));
        var id = localStorage.getItem("id");
        GetIdCurso();
        //listar
        function GetIdCurso() {
            $http.get('/curso/getid/'+ id).success(function (data, status, headers, config) {
                $scope.curso = data[0];
               // $scope.dt = $scope.curso.fecha_inicio;
        
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + jsonFilter(header) +
                    "<br />config: " + jsonFilter(config);
            });
        };

        //Editar
        $scope.Edit = function () {

            $scope.curso.fecha_inicio= $scope.dt;
            var curso = $scope.curso;
            var file  = $scope.file;

            //console.log("Fecha de inicio id ", $scope.curso.fecha_inicio);
            //console.log("id : ", file);
            
            upload2.uploadFile2(file, curso).then(function(res)
            {
                GetAllCurso();
                console.log(res);
                $uibModalInstance.dismiss('cancel');
            })
            
        };
        //actualizar Curso
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
        //boton cancelar
        $scope.cancel = function () {
    		$uibModalInstance.dismiss('cancel');
    	};

        //Calendario
            $scope.today = function() {
                $scope.dt = new Date();
                $scope.dt2 = new Date();
            };

            $scope.today();

             $scope.clear = function() {
                $scope.dt = null;
                $scope.dt2 = null;
            };

            $scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
            };

            $scope.dateOptions = {
                //dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

          // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            $scope.toggleMin = function() {
                $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
            };

            $scope.toggleMin();

            $scope.open1 = function() {
                $scope.popup1.opened = true;
            };

            $scope.open2 = function() {
                $scope.popup2.opened = true;
            };

            $scope.setDate = function(year, month, day) {
                $scope.dt = new Date(year, month, day);
                $scope.dt2 = new Date(year, month, day);
            };

            $scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];

            $scope.popup1 = {
                opened: false
            };

            $scope.popup2 = {
                opened: false
            };

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            $scope.events = [
                {
                date: tomorrow,
                status: 'full'
                },
             {
                date: afterTomorrow,
                status: 'partially'
                }
            ];

            function getDayClass(data) {
                $http.get('/curso/getid/'+ id).success(function (data, status, headers, config) {
                    $scope.curso = data[0];
                    $scope.fecha = $scope.curso.fecha_inicio;
                })
                .error(function (data, status, header, config) {
                    $scope.ResponseDetails = "Data: " + data +
                        "<br />status: " + status +
                        "<br />headers: " + jsonFilter(header) +
                        "<br />config: " + jsonFilter(config);
                });

                return fecha; 
            }

        //
 }])

    .directive('uploaderModel2',["$parse", function ($parse) {
    return{
        restrict: 'A',
        link: function (scope, iElement, iAttrs) {
            iElement.on("change", function (e) 
                {
                    $parse(iAttrs.uploaderModel2).assign(scope, iElement[0].files[0]);
                });
            }
        };
    }])
//subir imagenes
    .service('upload2',["$http", "$q", function ($http, $q) {
        this.uploadFile2 = function (file, curso)
        {   
            var id = curso._id;
            var deferred = $q.defer();
            var formData = new FormData();
            formData.append("file", file);
            formData.append("nombre", curso.nombre);
            formData.append("descripcion", curso.descripcion);
            formData.append("fecha_inicio", curso.fecha_inicio);
            return $http.put("/curso/edit/" + id , formData,{
                headers:{
                    "Content-type": undefined
                },
                transformRequest: angular.identity
            })
            .success(function (res) {
                deferred.resolve(res);
            })
            .error(function(msg, code) {
                deferred.reject(msg);
            })
            return deferred.promise;
        }
    }])

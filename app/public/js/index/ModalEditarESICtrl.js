 'use strict';
angular.module('App')
  .controller('ModalEditarESICtrl', [ '$scope','$http', '$uibModalInstance','$rootScope', '$uibModal', function ($scope,$http, $uibModalInstance, $rootScope, $uibModal) {
    var existecuenta=-1;
    var bandera = -1;
    var cuenta = [];
    $scope.activo = [];
    $scope.pasivo = [];
    $scope.patrimonio = [];
    
    //BEGIN <ACTIVO>
    $scope.add = function () {
        if($scope.cuenta.nombre != undefined && $scope.cuenta.valor != undefined){
            if($scope.cuenta.valor > 0){
                var cuenta = $scope.cuenta;
                validarInsertar(cuenta);
               
            }else{
                alertify.notify("Ingrese un número mayor a cero");
            }
        }
        else{
            alertify.notify("llene todos los datos");
        } 
    };

    function resetear() {
        $scope.cuenta = "";
        $scope.cuentapasivo = "";
        $scope.cuentapatrimonio = "";
        document.getElementById("name").value = "";
        document.getElementById("numero").value = "";
        existecuenta=-1;
        bandera = -1;
    };

    function validarInsertar (cuenta) {
        $http.get('/cuenta/list').success(function (datos) {
            $scope.datos = datos;
            if (datos != null) {

                for (var i = 0; i < datos.length; i++) { 
                    if (datos[i].nombrecuenta.toLowerCase() == cuenta.nombre.toLowerCase()) {
                        
                        existecuenta = 1;
                        if ($scope.activo.length == 0) {
                             $scope.activo.push({
                                cuenta:cuenta.nombre.toLowerCase(),
                                cantidad:cuenta.valor,
                                codigoCuenta:datos[i].codigocuenta
                            });
                            color();
                           
                        }else{

                            for (var j = 0; j < $scope.activo.length; j++) {

                                if ($scope.activo[j].cuenta.toLowerCase() == cuenta.nombre.toLowerCase()) {
                                    bandera = 1;
                                }

                            }//FOR $scope.activo
                          
                          if (bandera != 1) {
                                 $scope.activo.push({
                                    cuenta:cuenta.nombre.toLowerCase(),
                                    cantidad:cuenta.valor,
                                    codigoCuenta:datos[i].codigocuenta
                                });
                                color();
                            }

                        }//ELSE
                    }
                }//FOR API REST

                if (existecuenta == -1) {
                    alertify.error("No existe esa cuenta, no se inserto");
                }else{
                    if (bandera == 1 ) {
                        alertify.error("Esta cuenta ya esta en el Estado de Situación Inicial ");
                    }else{
                        alertify.success("Ingreso con exito");
                        sumarActivo();
                        resetear();
                    }
                }

            }else{
                alertify.notify("conectese a internet");
            }
        });
    };

    function sumarActivo() {
        var sumaTotalCapital = 0;
        for (var i = 0; i < $scope.activo.length; i++) {
            sumaTotalCapital = sumaTotalCapital + $scope.activo[i].cantidad;
        }
        $scope.suma = sumaTotalCapital;
    };
    //END </ACTIVO>

    //BEGIN <PASIVO>
    $scope.addpasivo = function () {
        if($scope.cuentapasivo.nombre != undefined && $scope.cuentapasivo.valor != undefined){
            if($scope.cuentapasivo.valor > 0){
                var cuentapasivo = $scope.cuentapasivo;
                validarInsertarPasivo(cuentapasivo);
            }else{
                alertify.notify("Ingrese un número mayor a cero");
            }
        }
        else{
            alertify.notify("llene todos los datos");
        } 
    }

    function validarInsertarPasivo (cuenta) {
        $http.get('/cuenta/list').success(function (datos) {
            $scope.datos = datos;
            if (datos != null) {

                for (var i = 0; i < datos.length; i++) { 
                    if (datos[i].nombrecuenta.toLowerCase() == cuenta.nombre.toLowerCase()) {
                        
                        existecuenta = 1;
                        if ($scope.pasivo.length == 0) {
                             $scope.pasivo.push({
                                cuenta:cuenta.nombre.toLowerCase(),
                                cantidad:cuenta.valor,
                                codigoCuenta:datos[i].codigocuenta
                            });
                           color();
                        }else{

                            for (var j = 0; j < $scope.pasivo.length; j++) {

                                if ($scope.pasivo[j].cuenta.toLowerCase() == cuenta.nombre.toLowerCase()) {
                                    bandera = 1;
                                }

                            }//FOR $scope.pasivo
                          
                          if (bandera != 1) {
                                 $scope.pasivo.push({
                                    cuenta:cuenta.nombre.toLowerCase(),
                                    cantidad:cuenta.valor,
                                    codigoCuenta:datos[i].codigocuenta
                                });
                                 color();
                            }

                        }//ELSE
                    }
                }//FOR API REST

                if (existecuenta == -1) {
                    alertify.error("No existe esa cuenta, no se inserto");
                }else{
                    if (bandera == 1 ) {
                        alertify.error("Esta cuenta ya esta en el Estado de Situación Inicial ");
                    }else{
                        alertify.success("Ingreso con exito");
                        sumarPasivo();
                        resetear();
                    }
                }

            }else{
                alertify.notify("conectese a internet");
            }
        });
    };

    function sumarPasivo() {
        var sumarTotalPasivo = 0;
        for (var i = 0; i < $scope.pasivo.length; i++) {
            sumarTotalPasivo = sumarTotalPasivo + $scope.pasivo[i].cantidad;
        }
        $scope.sumapasivo = sumarTotalPasivo;
    };
    //END </PASIVO>

    //<PATRIMONIO>
    $scope.addpatrimonio = function () {
        if($scope.cuentapatrimonio.nombre != undefined && $scope.cuentapatrimonio.valor != undefined){
            if($scope.cuentapatrimonio.valor > 0){
                var cuentapatrimonio = $scope.cuentapatrimonio;
                validarInsertarPatrimonio(cuentapatrimonio);
            }else{
                alertify.notify("Ingrese un número mayor a cero");
            }
        }
        else{
            alertify.notify("llene todos los datos");
        } 
    };

    function validarInsertarPatrimonio (cuenta) {
        $http.get('/cuenta/list').success(function (datos) {
            $scope.datos = datos;
            if (datos != null) {

                for (var i = 0; i < datos.length; i++) { 
                    if (datos[i].nombrecuenta.toLowerCase() == cuenta.nombre.toLowerCase()) {
                        
                      
                        existecuenta = 1;
                        if ($scope.patrimonio.length == 0) {
                            $scope.patrimonio.push({
                                cuenta:cuenta.nombre.toLowerCase(),
                                cantidad:cuenta.valor,
                                codigoCuenta:datos[i].codigocuenta
                            });
                           color();
                        }else{

                            for (var j = 0; j < $scope.patrimonio.length; j++) {

                                if ($scope.patrimonio[j].cuenta.toLowerCase() == cuenta.nombre.toLowerCase()) {
                                    bandera = 1;
                                }

                            }//FOR $scope.patrimonio
                          
                          if (bandera != 1) {
                                $scope.patrimonio.push({
                                    cuenta:cuenta.nombre.toLowerCase(),
                                    cantidad:cuenta.valor,
                                    codigoCuenta:datos[i].codigocuenta
                                });
                                color();
                            }

                        }//ELSE
                    }
                }//FOR API REST

                if (existecuenta == -1) {
                    alertify.error("No existe esa cuenta, no se inserto");
                }else{
                    if (bandera == 1 ) {
                        alertify.error("Esta cuenta ya esta en el Estado de Situación Inicial ");
                    }else{
                        alertify.success("Ingreso con exito");
                        sumarPatrimonio();
                        resetear();
                    }
                }

            }else{
                alertify.notify("conectese a internet");
            }
        });
    };

    function sumarPatrimonio() {
        var sumarTotalPatrimonio = 0;
        for (var i = 0; i < $scope.patrimonio.length; i++) {
            sumarTotalPatrimonio = sumarTotalPatrimonio + $scope.patrimonio[i].cantidad;
        }
        $scope.sumapatrimonio = sumarTotalPatrimonio;
        color();
    };
    //END<PATRIMONIO>
    function color() { 
        if (($scope.sumapatrimonio + $scope.sumapasivo) == $scope.suma) {
            document.getElementById("color").style.borderColor  = "green";
        }else{
            document.getElementById("color").style.borderColor  = "red";
        }
    };

    //
    var aux = 0;
    $scope.guardar = function () {
        sumarPasivo();
        sumarActivo();
        sumarPatrimonio();
        var aux = $scope.sumapatrimonio + $scope.sumapasivo;
         if ((aux) == $scope.suma) {

                var json = {
                    activo:$scope.activo,
                    pasivo:$scope.pasivo,
                    patrimonio:$scope.patrimonio
                }  

                console.log($scope.id);

                
                $http.put('contabilidad/situacioninicial/edit/'+ $scope.id, json ).success(function (datos) {
                    $scope.res = datos;
                    console.log(datos);
                    if (datos.estado == 0) {
                        alertify.success("correctamente modificado");
                        $uibModalInstance.close();
                    }else{
                        alertify.error("Error no se modificó");
                    }
                });
                
               

        }else{
            alertify.error("Algo esta mal revise");
        }
    };

     $scope.insertarCuenta = function () {
 
        var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/index/modalopenCuenta.html',
        controller: "modalopenCuentaCtrl",
        size: "sm",
        });
         modalInstance.result.then(function () { 
            getCuentas();
        });
    };
    $scope.cancel = function () {
        $uibModalInstance.close();
    };

    //remover capital
    $scope.removeAct = function (item) {
        var index = $scope.activo.indexOf(item);
        $scope.activo.splice(item, 1);
        sumarActivo();
    };

    $scope.removePas = function (item) {
        var index = $scope.pasivo.indexOf(item);
        $scope.pasivo.splice(item, 1);
        sumarPasivo();
    };
    
    $scope.removePat = function (item) {
        var index = $scope.patrimonio.indexOf(item);
        $scope.patrimonio.splice(item, 1);
        sumarPatrimonio();
    };


    function getData() {

        $http.get('/contabilidad/situacioninicial/list' ).success(function (data) {
            $scope.esiEditar = data;
            $scope.id = data.id;
            $scope.activo = data.activo;
            $scope.pasivo = data.pasivo;
            $scope.patrimonio = data.patrimonio;

            sumarPasivo();
            sumarActivo();
            sumarPatrimonio();
    
        });
    };

    getData();

    //=======================Autocompletar Activo================
    getCuentas();
    function getCuentas() {
        $http.get('/cuenta/list').success(function (data) {
            $scope.cursos = data;
        for (var i = 0; i < $scope.cursos.length; i++) {
            cuenta.push($scope.cursos[i].nombrecuenta)
        }
      });
    };

    $rootScope.searchItems =  cuenta;
        
    
    //Sort Array
    $rootScope.searchItems.sort();
    //Define Suggestions List
    $rootScope.suggestions = [];
    //Define Selected Suggestion Item
    $rootScope.selectedIndex = -1;
    
    //Function To Call On ng-change
    $rootScope.search = function(){
        $rootScope.suggestions = [];
        var myMaxSuggestionListLength = 0;
        for(var i=0; i<$rootScope.searchItems.length; i++){
            var searchItemsSmallLetters = angular.lowercase($rootScope.searchItems[i]);
            var searchTextSmallLetters = angular.lowercase($scope.cuenta.nombre);
            if( searchItemsSmallLetters.indexOf(searchTextSmallLetters) !== -1){
                $rootScope.suggestions.push(searchItemsSmallLetters);
                myMaxSuggestionListLength += 1;
                if(myMaxSuggestionListLength === 5){
                    break;
                }
            }
        }
    };
    
    //Keep Track Of Search Text Value During The Selection From The Suggestions List  
    $rootScope.$watch('selectedIndex',function(val){
        if(val !== -1) {
            $scope.cuenta.nombre = $rootScope.suggestions[$rootScope.selectedIndex];
        }
    });
    
    
    //Text Field Events
    //Function To Call on ng-keydown
    $rootScope.checkKeyDown = function(event){
        if(event.keyCode === 40){//down key, increment selectedIndex
            event.preventDefault();
            if($rootScope.selectedIndex+1 < $rootScope.suggestions.length){
                $rootScope.selectedIndex++;
            }else{
                $rootScope.selectedIndex = 0;
            }
        }else if(event.keyCode === 38){ //up key, decrement selectedIndex
            event.preventDefault();
            if($rootScope.selectedIndex-1 >= 0){
                $rootScope.selectedIndex--;
            }else{
                $rootScope.selectedIndex = $rootScope.suggestions.length-1;
            }
        }else if(event.keyCode === 13){ //enter key, empty suggestions array
            event.preventDefault();
            $rootScope.suggestions = [];
            $rootScope.selectedIndex = -1;
        }else if(event.keyCode === 27){ //ESC key, empty suggestions array
            event.preventDefault();
            $rootScope.suggestions = [];
            $rootScope.selectedIndex = -1;
        }else{
            $rootScope.search();    
        }
    };
    
    //ClickOutSide
    var exclude1 = document.getElementById('textFiled');
    $rootScope.hideMenu = function($event){
        $rootScope.search();
        //make a condition for every object you wat to exclude
        if($event.target !== exclude1) {
            $rootScope.suggestions = [];
            $rootScope.selectedIndex = -1;
        }
    };
    //======================================
    
    //Function To Call on ng-keyup
    $rootScope.checkKeyUp = function(event){ 
        if(event.keyCode !== 8 || event.keyCode !== 46){//delete or backspace
            if($scope.cuenta.nombre === ""){
                $rootScope.suggestions = [];
                $rootScope.selectedIndex = -1;
            }
        }
    };
    //======================================
    
    //List Item Events
    //Function To Call on ng-click
    $rootScope.AssignValueAndHide = function(index){
         $scope.cuenta.nombre = $rootScope.suggestions[index];
         $rootScope.suggestions=[];
         $rootScope.selectedIndex = -1;
    };

     //============================Autocompletar Pasivo==============

    //Define suggestions2 List
    $rootScope.suggestions2 = [];
    //Define Selected Suggestion Item
    $rootScope.selectedIndex2 = -1;
    
    //Function To Call On ng-change
    $rootScope.search2 = function(){
        $rootScope.suggestions2 = []
        var myMaxSuggestionListLength = 0;
        for(var i=0; i<$rootScope.searchItems.length; i++){
            var searchItemsSmallLetters = angular.lowercase($rootScope.searchItems[i]);
            var searchTextSmallLetters = angular.lowercase($scope.cuentapasivo.nombre);
            if( searchItemsSmallLetters.indexOf(searchTextSmallLetters) !== -1){
                $rootScope.suggestions2.push(searchItemsSmallLetters);
                myMaxSuggestionListLength += 1;
                if(myMaxSuggestionListLength === 5){
                    break;
                }
            }
        }
    };
    
    //Keep Track Of Search Text Value During The Selection From The suggestions2 List  
    $rootScope.$watch('selectedIndex2',function(val){
        if(val !== -1) {
            $scope.cuentapasivo.nombre = $rootScope.suggestions2[$rootScope.selectedIndex2];
        }
    });
    
    
    //Text Field Events
    //Function To Call on ng-keydown
    $rootScope.checkKeyDown2 = function(event){
        if(event.keyCode === 40){//down key, increment selectedIndex2
            event.preventDefault();
            if($rootScope.selectedIndex2+1 < $rootScope.suggestions2.length){
                $rootScope.selectedIndex2++;
            }else{
                $rootScope.selectedIndex2 = 0;
            }
        }else if(event.keyCode === 38){ //up key, decrement selectedIndex2
            event.preventDefault();
            if($rootScope.selectedIndex2-1 >= 0){
                $rootScope.selectedIndex2--;
            }else{
                $rootScope.selectedIndex2 = $rootScope.suggestions2.length-1;
            }
        }else if(event.keyCode === 13){ //enter key, empty suggestions2 array
            event.preventDefault();
            $rootScope.suggestions2 = [];
            $rootScope.selectedIndex2 = -1;
        }else if(event.keyCode === 27){ //ESC key, empty suggestions2 array
            event.preventDefault();
            $rootScope.suggestions2 = [];
            $rootScope.selectedIndex2 = -1;
        }else{
            $rootScope.search2();    
        }
    };
    
    //ClickOutSide
    var exclude1 = document.getElementById('numero');
    $rootScope.hideMenu = function($event){
        $rootScope.search2();
        //make a condition for every object you wat to exclude
        if($event.target !== exclude1) {
            $rootScope.suggestions2 = [];
            $rootScope.selectedIndex2 = -1;
        }
    };
    //======================================
    
    //Function To Call on ng-keyup
    $rootScope.checkKeyUp2 = function(event){ 
        if(event.keyCode !== 8 || event.keyCode !== 46){//delete or backspace
            if($scope.cuentapasivo.nombre === ""){
                $rootScope.suggestions2 = [];
                $rootScope.selectedIndex2 = -1;
            }
        }
    };
    //======================================
    
    //List Item Events
    //Function To Call on ng-click
    $rootScope.AssignValueAndHide2 = function(index){
         $scope.cuentapasivo.nombre = $rootScope.suggestions2[index];
         $rootScope.suggestions2=[];
         $rootScope.selectedIndex2 = -1;
    };

       //============================Autocompletar Patrimonio==============

    //Define suggestions3 List
    $rootScope.suggestions3 = [];
    //Define Selected Suggestion Item
    $rootScope.selectedIndex3 = -1;
    
    //Function To Call On ng-change
    $rootScope.search3 = function(){
        $rootScope.suggestions3 = []
        var myMaxSuggestionListLength = 0;
        for(var i=0; i<$rootScope.searchItems.length; i++){
            var searchItemsSmallLetters = angular.lowercase($rootScope.searchItems[i]);
            var searchTextSmallLetters = angular.lowercase($scope.cuentapatrimonio.nombre);
            if( searchItemsSmallLetters.indexOf(searchTextSmallLetters) !== -1){
                $rootScope.suggestions3.push(searchItemsSmallLetters);
                myMaxSuggestionListLength += 1;
                if(myMaxSuggestionListLength === 5){
                    break;
                }
            }
        }
    };
    
    //Keep Track Of Search Text Value During The Selection From The suggestions3 List  
    $rootScope.$watch('selectedIndex3',function(val){
        if(val !== -1) {
            $scope.cuentapatrimonio.nombre = $rootScope.suggestions3[$rootScope.selectedIndex3];
        }
    });
    
    
    //Text Field Events
    //Function To Call on ng-keydown
    $rootScope.checkKeyDown3 = function(event){
        if(event.keyCode === 40){//down key, increment selectedIndex3
            event.preventDefault();
            if($rootScope.selectedIndex3+1 < $rootScope.suggestions3.length){
                $rootScope.selectedIndex3++;
            }else{
                $rootScope.selectedIndex3 = 0;
            }
        }else if(event.keyCode === 38){ //up key, decrement selectedIndex3
            event.preventDefault();
            if($rootScope.selectedIndex3-1 >= 0){
                $rootScope.selectedIndex3--;
            }else{
                $rootScope.selectedIndex3 = $rootScope.suggestions3.length-1;
            }
        }else if(event.keyCode === 13){ //enter key, empty suggestions3 array
            event.preventDefault();
            $rootScope.suggestions3 = [];
            $rootScope.selectedIndex3 = -1;
        }else if(event.keyCode === 27){ //ESC key, empty suggestions3 array
            event.preventDefault();
            $rootScope.suggestions3 = [];
            $rootScope.selectedIndex3 = -1;
        }else{
            $rootScope.search3();    
        }
    };
    
    //ClickOutSide
    var exclude1 = document.getElementById('numero');
    $rootScope.hideMenu = function($event){
        $rootScope.search3();
        //make a condition for every object you wat to exclude
        if($event.target !== exclude1) {
            $rootScope.suggestions3 = [];
            $rootScope.selectedIndex3 = -1;
        }
    };
    //======================================
    
    //Function To Call on ng-keyup
    $rootScope.checkKeyUp3 = function(event){ 
        if(event.keyCode !== 8 || event.keyCode !== 46){//delete or backspace
            if($scope.cuentapatrimonio.nombre === ""){
                $rootScope.suggestions3 = [];
                $rootScope.selectedIndex3 = -1;
            }
        }
    };
    //======================================
    
    //List Item Events
    //Function To Call on ng-click
    $rootScope.AssignValueAndHide3 = function(index){
         $scope.cuentapatrimonio.nombre = $rootScope.suggestions3[index];
         $rootScope.suggestions3=[];
         $rootScope.selectedIndex3 = -1;
    };
    //======================================


}])
    .filter('setDecimal', function ($filter) {
    return function (input, places) {
        if (isNaN(input)) return input;
        var factor = "1" + Array(+(places > 0 && places +1)).join("0");
        return Math.round(input * factor) / factor;
    };
})

    .filter('singleDecimal', function ($filter) {
    return function (input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
    };
})
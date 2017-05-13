 'use strict';

angular.module('App')
  .controller('ModalMatriculaCtrl', [ '$scope','$http', '$uibModalInstance', function ($scope,$http, $uibModalInstance) {


    var id = localStorage.getItem("id_estudiante");
    var j;
    var k;
    GetIdEstudiante();
    var estudiante ;
    //listar todos los estudiantes
    function GetIdEstudiante() {
        $http.get('/estudiante/list/'+ id).success(function (data, status, headers, config) {
            
        estudiante = data;
        $scope.estudiante = data;

        $scope.datos2 = data;
        $scope.datos2.curso =  [];

        $scope.datos3 = data;
        $scope.datos3.curso2 =  [];
        
        j = -1;
        k = -1;
        for (var i = 0; i < data.cursos.length; i++) {
            //$scope.estudiante.auxcursos[i].id_curso =data.cursos[i].id_curso; 
            $scope.estudiante.cursos[i].id_curso = data.cursos[i].id_curso;
            //$scope.estudiante.cursos[i].id_curso = data.cursos[i].id_curso.substr(-4);

                if (data.cursos[i].estado === "0") { 
                    j=j+1;
                    $scope.datos2.curso[j] = data.cursos[i];
                }

                if (data.cursos[i].estado === "1") {
                    k=k+1;
                    $scope.datos3.curso2[k] = data.cursos[i];
                }

        }

            llenarDatos();    
        }).error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<br />status: " + status +
                "<br />headers: " + jsonFilter(header) +
                "<br />config: " + jsonFilter(config);
        });
    };

    //lenar datos
    function llenarDatos() {
            document.getElementById('cedula').innerHTML = estudiante.cedula;
            document.getElementById('nombres').innerHTML = estudiante.apellido1.toUpperCase() + " " + estudiante.apellido2.toUpperCase() + " " +estudiante.nombres.toUpperCase();  
            //fecha actual
            var hoy = new Date();
            var dd = hoy.getDate();
            var mm = hoy.getMonth()+1; //hoy es 0!
            var yyyy = hoy.getFullYear();
            if(dd<10) {
                dd='0'+dd;
            } 

            if(mm<10) {
                mm='0'+mm;
            }
            var fecha = mm+'/'+dd+'/'+yyyy;
            document.getElementById('fecha').innerHTML = fecha;
            //terminos de pago

        
    };
    //terminos
     $scope.options = [
        {
          name: 'Efectivo',
          value: 'Caja'
        }, 
        {
          name: 'Recibo',
          value: 'Bancos'
        }
    ];

    $scope.selectedOption = $scope.options[0];
    //boton cancelar
    $scope.cancel = function () {
    };
  
    //obtener la lista de curso
    GetCursos();
    var cursosall=[]; 
    var datos_cursos;

    function GetCursos() {
        $http.get('/curso/getall').success(function (data, status, headers, config) {
            $scope.cursos = data;
            datos_cursos=data;
           // cursosall = new array(4);
            for (var i = 0; i <  data.length ; i++) {
               cursosall[i] = data[i].nombre;
                //cursosall.push(data[i].nombre);
            }
              //Listar los cursos
            $scope.placement = {
                options: [
                  cursosall[0],
                  cursosall[1],
                  cursosall[2],
                  cursosall[3],
                  cursosall[4],
                ],
                selected: cursosall[0]
            };

        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<br />status: " + status +
                "<br />headers: " + jsonFilter(header) +
                "<br />config: " + jsonFilter(config);
        });
    };


      //ng-change select de cursos
    $scope.change = function(matricula){

        localStorage['myKey'] = JSON.stringify(datos_cursos); //guardar los datos en cache 
        ir(matricula);
    }

        //boton cancelar
    $scope.ir= function(matricula){
        ir(matricula);
    }

    var preciocurso;
    var fechainiciocurso;
    var id_curso;
    var codigo;//codigo del curso

    function ir (matricula) {
        var valor = document.getElementsByName("curso")[0].value;
       if (matricula.curso !== null) {//si esta lleno entra

            for (var i = 0; i <  datos_cursos.length ; i++) {
                
                if (matricula.curso == datos_cursos[i].nombre) {
                    var fecha = convertirFecha(datos_cursos[i].fecha_inicio);
                    
                    //los datos que se guardaran
                    preciocurso = datos_cursos[i].precio;
                    fechainiciocurso =fecha;
                    id_curso = datos_cursos[i]._id;
                    var curso_pantalla= id_curso.substr(-4);


                    //Solo para que se muestre en la pantalla
                     document.getElementById('codigo').innerHTML = curso_pantalla;
                     document.getElementById('precio').innerHTML = preciocurso;

                    //document.form.precio.value = preciocurso;
                    //document.form.fecha_inicio.value = fecha;
                }
            }
            
       }else{
        alert("Seleccion un curso");
       }

    };

    //cortar codigo de curso
    function codigo(codigo) {
        var codigonew = codigo.substr(-4);
        return codigonew;
    }

    //funcion para convertir la fecha
    function convertirFecha(fecha){
        var cadenaAnalizar = fecha;
        var aux_fecha = "";
        var dia="";
        var mes="";
        var ao="";
        
        for(var i=0; i<cadenaAnalizar.length; i++) 
            {
                if (i<=9) {
                    aux_fecha = aux_fecha + cadenaAnalizar.charAt(i);
                    if(i>=0 && i<=3 ){
                        ao = ao + cadenaAnalizar.charAt(i)
                    }
                    if(i==5 || i==6 ){
                        mes = mes + cadenaAnalizar.charAt(i)
                    }
                    if(i==8 || i==9 ){
                        dia = dia + cadenaAnalizar.charAt(i)
                    }
                }
            }

        //mes
        switch (mes) {
            case '01':
                mes = "Enero";
                break;
            case '02':
                mes = "Febrero";
                break;
            case '03':
                mes = "Marzo";
                break;
            case '04':
                mes = "Abril";
                break;
            case '05':
                mes = "Mayo";
                break;
            case '06':
                mes = "Junio";
                break;
            case '07':
                mes = "Julio";
                break;
            case '08':
                mes = "Agosto";
                break;
            case '09':
                mes = "Septiembre";
                break;
            case '10':
                mes = "Octubre";
                break;
            case '11':
                mes = "Noviembre";
                break;
            case '12':
                mes = "Diciembre";
                break;
            default:
                console.log("Error");
        }
        ao=" del " + ao;
        mes = " de " + mes; 
        var res = dia.concat(mes,ao);
        return res;
    }

    //boton matricular
    var auxMatricula=[];
    $scope.Save = function(matricula){ //matricula reemplaza a estudiantes
        
        var f = new Date();
        var fecha = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();
        matricula.fecha_matricula = fecha;
        auxMatricula=matricula;
        
        $http.post('/matricula/new/', matricula).success(function (data, status, headers, config) {
            $scope.respuesta = data;
            
            //cuando el estado es 0 el estudiante se matriculo con exito
            //cuando el estado es 1 el estudiante ya se encuentra matriculado
            //cuando el estado es 2 error del servidor

            
            var estado =$scope.respuesta.estado;
            var mensaje =$scope.respuesta.mensaje;
            console.log(mensaje);
           switch(estado){
                case "0":
                      alertify.success('Matriculado correctamenta');
                      reporte();
                      
                      $uibModalInstance.close();
                      break;
                case "1":
                     alertify.error("la respuesta es  "+ mensaje);
                    break;
                case "2":
                    alertify.warning("la respuesta es  "+ mensaje);
                    break;
                default:
                    alertify.error("Error!!");
            }
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<br />status: " + status +
    
                 "<br />headers: " + jsonFilter(header) +
                "<br />config: " + jsonFilter(config);
        });
        
    };
    
 


    //funcion click
          var numero2=0;
        $scope.sumar = function ()
            { 
            numero2 = numero2+1;
            addCodigo();
            addFields();//selected  donde estan todos los curso
            document.getElementById('btn-minus').style.display = 'block';
            }
        $scope.restar = function ()
            {
            if(numero2 > 0)
            {   
                numero2 = numero2-1;
               addCodigo();
               addFields();
               if (numero2 == 0) {
                document.getElementById('btn-minus').style.display = 'none';
               }
            }
            else{
                document.getElementById('btn-minus').style.display = 'none';
            }
         }

         /*Añadir precios*/
        function addFields(){
            var number = numero2;
            // Container <div> where dynamic content will be placed
            var container = document.getElementById("container");
            // Clear previous contents of the container
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }
            for (var i=1;i<=number;i++){

       
 
                // Create an <input> element, set its type and name attributes
                var input = document.createElement("select");
                //añadir elementos
                input.setAttribute("id", "mySelect" + i );
                document.body.appendChild(input);


                for (var jk = 0 ; jk < datos_cursos.length ; jk++) {
                    
                    input.value1 = document.createElement("option" );
                    input.value1.setAttribute("value", datos_cursos[jk].nombre);
                    var t= document.createTextNode(datos_cursos[jk].nombre);
                    input.value1.appendChild(t);
                    document.getElementById("mySelect" + i).appendChild(input.value1);
                }
               
               
                //añadir el atributo class
               var classes = document.createAttribute("class"); 
                classes.value = "form-control b-cbx";    
                input.setAttributeNode(classes); 
                //añadir atributo ng-model="matricula.curso"
               var ngmodel = document.createAttribute("ng-model"); 
                ngmodel.value = "matricula.curso";    
                input.setAttributeNode(ngmodel); 
                //añadir el atributo ng-options
           /*
                var ngchange = document.createAttribute("ng-change"); 
                ngchange.value = "change(matricula)";    
                input.attr(ngchange); 
              */
                //añadir atributo ng-change="change(matricula)"
                var ngchange = document.createAttribute("onchange");
                ngchange.value = "myFunction()";  
                input.setAttributeNode(ngchange); 
                
                var d = document.getElementById("mySelect" + i); 
                d.setAttribute("ng-change", 'change(matricula)');
                
                container.appendChild(input);
                container.appendChild(document.createElement("br"));

            }
        }
    ////

    /*Añadir el campo codigo_del_curso*/
           function addCodigo(){
            // Number of inputs to create
            var number = numero2;
            // Container <div> where dynamic content will be placed
            var container = document.getElementById("aux_codigo");
            // Clear previous contents of the container
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }
            for (var i=0;i<number;i++){
                // Create an <input> element, set its type and name attributes
                var input = document.createElement("b");
                //input.type = "text";
                input.name = "input" + i;
                input.id = "codigo" + i;
                input.value="";
                container.appendChild(input);
            
            }
        }
        
        /*Añadir el campo precio_del_curso*/
        function addPrecio(){
            // Number of inputs to create
            var number = numero2;
            // Container <div> where dynamic content will be placed
            var container = document.getElementById("aux_precio");
            // Clear previous contents of the container
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }
            for (var i=0;i<number;i++){
                // Create an <input> element, set its type and name attributes
                var input = document.createElement("b");
                //input.type = "text";
                input.name = "precio" + i;
                input.id = "precio" + i;
                container.appendChild(input);
            
            }
        }

        //onchange
      
    //sacar un curso de un estudiante del administrador
    $scope.sacar = function (c) {
        var id = c._id;
        var id_estudiante = localStorage.getItem("id_estudiante");
        $scope.estudiante.cedula2 = id_estudiante;

        
        $http.put('/estudiante/removecursoadmin/'+ id,  $scope.estudiante ).success(function (data, status, headers, config) {
            $scope.datoscursos = data;
            GetIdEstudiante();
         })
        .error(function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
              "<br />status: " + status +
              "<br />headers: " + jsonFilter(header) +
              "<br />config: " + jsonFilter(config);
        })
        

    };
    ///=======================Reporte=================
  

    function reporte() {
        var doc = new jsPDF();
        console.log("matricula2",auxMatricula);
        doc.setFontSize(16);
        doc.setFontType("bolditalic");
        doc.text(80 , 20 , "Fundación 'JASPE'");
        doc.text(70 , 30 , "Comprobante de matricula");

        doc.setFontSize(12);
        doc.setFontType("");
        let x = 30;
        let y = 50;

        doc.text(x, y ,    "Cédula   : " + auxMatricula.cedula);
        doc.text(x, y +10 , "Nombres : " + (auxMatricula.nombres).toUpperCase()+" "+ (auxMatricula.apellido1).toUpperCase()+" "+(auxMatricula.apellido2).toUpperCase());

        doc.text(x+90,y, "Fecha de emisión : "+auxMatricula.fecha_matricula);
        doc.text(x+90,y+10,"Atentido por : Carolina Alban");
        y=y+30;
        doc.setFontType("bold");
        doc.text(x,y,"Detalle");
        doc.text(x+100,y,"Precio");
        doc.setFontType("");
        var suma = 0;
        for (var i = 0; i < auxMatricula.curso.length; i++) {
            
            y=y+10;
            doc.text(x,y, (auxMatricula.curso[i].nombre_curso).toUpperCase() ) ;
            suma =  suma + parseInt(auxMatricula.curso[i].precio_curso);
            doc.text(x + 100,y, "$ " + (auxMatricula.curso[i].precio_curso).toString()) ;

        }
        doc.setLineWidth(1);
        doc.text(x,y +20, "Total");
        doc.line(x, y +  10 , x + 150, y + 10 );
        doc.text(x + 100,y +20, "$ " + suma.toString());
        doc.save('Matricula');
        
    };

}]);


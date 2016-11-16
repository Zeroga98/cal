app.controller('mainCtrl', function($scope,$rootScope, $ionicPopup, $timeout, $ionicSlideBoxDelegate, $ionicPopover) {

    $rootScope.totally=0;
    $scope.Datos = [0, 0];
    $scope.Datosx = [];
    $scope.Datosy = [];

    $scope.addDatos = function(tipe) {

        $scope.Datos.push(0);
    }
    $scope.showGraphisDivider = true;
    $scope.showGraphis = true;
    $scope.toggleGraphis = function() {
        $scope.showGraphis = !$scope.showGraphis;
    }


    $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.showFooter = true;
    $scope.toggleFooter = function() {
        console.log('Toggling footer');
        $scope.showFooter = !$scope.showFooter;
    }
    $scope.showInput = false;
    $scope.toggleInput = function() {
        console.log('Toggling input');
        $scope.showInput = !$scope.showInput;
    }
    $scope.showInputDivider = true;
    $scope.toggleInputDivider = function() {
        console.log('Toggling input');
        $scope.showInputDivider = !$scope.showInputDivider;
    }







    $scope.colorKeyboard = function(value) {
        for (var i = 0; i < 10; i++) {
            if (value == i) {
                return true;
            } else if (value == '.') {
                return true;
            }
        }
        return false;
    }

    $scope.operations = function(value) {
        var input = value;
        console.log(input);
        if (value == '=') {
            logic();

        } else if (value.ico == 'backspace') { //Borra secuencialmente
            $scope.totally = $scope.totally.substring(0, $scope.totally.length - 1);

        } else if (value == 'AC') { //Cambia el teclado
            // $ionicSlideBoxDelegate.previous([1]) devovler pestaña
            // $ionicSlideBoxDelegate.next(); //Cambiar pestaña
            $scope.totally = "";

        } else if (value.ico == 'arrow-left-a') {
            console.log(document.getElementById('texto'));
            document.getElementById('texto').select();


        } else {
            $scope.totally += value;
        }
    }
    $scope.eva = function() {
        $scope.r = 0;
        $scope.r = $scope.fa + $scope.fb * $rootScope.totally;
        $scope.r = $scope.r.toFixed(2);
        console.log("\n " + $scope.fa);
        console.log("\n " + $scope.fb);
        console.log("\n " + $rootScope.totally);
        $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Estimacion',
                template: $scope.r
            });

            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        };
        $scope.showAlert();
    };

    $scope.regresionLineal = function() {
        $scope.myPopup.close();
        console.log($scope.Datosx);
        console.log($scope.Datosy)

        $scope.sumx = 0;
        $scope.sumy = 0;
        $scope.sumx2 = 0;
        $scope.sumy2 = 0;

        function sumatotal(numero, vector) { //sumatoria de vector x o y
            r = 0;
            for (var i = 0; i < numero; i++) {
                r += vector[i];
            }
            return r;
        }

        function sumaxy(numero, vector, vector2) { //  sumatoria de vectores XY
            r = 0;
            for (var i = 0; i < numero; i++) {
                r += vector[i] * vector2[i];
            }
            return r;
        }

        function sumacu(numero, vector) { // sumatoria de x^2
            r = 0;
            for (var i = 0; i < numero; i++) {
                r += Math.pow(vector[i], 2);
            }
            return r;
        }

        function ygo(numero, numero1, numero2, vector) {
            r = 0;
            for (var i = 0; i < numero; i++) {
                r = numero1 + numero2 * vector[i];
                r = r.toFixed(2);
                console.log("\n " + r);
            }
            return r;
        }

        function yt(numero, numero1, numero2, vector, vector2) {
            r = 0;
            for (var i = 0; i < numero; i++) {
                r = vector2[i] - (numero1 + numero2 * vector[i]);
                r = r.toFixed(2);
                console.log("\n " + r);
            }
            return r;
        }

        function ev(numero1, numero2, numero3) { //  funcion para evaluar 
            r = 0;
            r = numero1 + numero2 * numero3;
            r = r.toFixed(2);
            console.log("\n " + r);
            return r;
        }

        for (var i = 0; i < n; i++) {
            alert("x y \n" + b[i] + "-" + c[i]);
        }
        // var suxy=0
        var n = $scope.Datos.length;
        $scope.sux = sumatotal(n, $scope.Datosx);
        console.log(" sumatoria de x= ", $scope.sux);
        $scope.suy = sumatotal(n, $scope.Datosy);
        console.log(" sumatoria de y= ", $scope.suy);
        $scope.sumxy = sumaxy(n, $scope.Datosx, $scope.Datosy);
        console.log(" sumatoria de XY= ", $scope.sumxy);
        $scope.sumx2 = sumacu(n, $scope.Datosx);
        $scope.sumy2 = sumacu(n, $scope.Datosy); // estas tambien agregala
        console.log(" sumatoria de x^2= ", $scope.sumx2);
        $scope.fb = (n * $scope.sumxy - $scope.sux * $scope.suy) / (n * $scope.sumx2 - Math.pow($scope.sux, 2))
        console.log(" B= ", $scope.fb);
        $scope.fa = ($scope.suy - $scope.fb * $scope.sux) / n;
        console.log(" A= ", $scope.fa);
        console.log(" y gorro")
        $scope.yg = ygo(n, $scope.fa, $scope.fb, $scope.Datosx);
        console.log(" y aproxi")
        $scope.ya = yt(n, $scope.fa, $scope.fb, $scope.Datosx, $scope.Datosy);
        console.log(" a evaluar")
        $scope.rec = $scope.sumxy - (($scope.sux * $scope.suy) / n)
        $scope.reco = $scope.rec / Math.sqrt(($scope.sumx2 - (Math.pow($scope.sux, 2) / n)) * ($scope.sumy2 - (Math.pow($scope.suy, 2) / n)))
        $scope.reco = Math.pow($scope.reco, 2);
        console.log(" est es r tan aclamado " + $scope.reco);
        $scope.t1 = $scope.Datosx[0];
        $scope.eva1 = ev($scope.fa, $scope.fb, $scope.t1);
        $scope.eva1 = parseFloat($scope.eva1);
        $scope.t2 = $scope.Datosx[$scope.Datosx.length - 1];
        $scope.eva2 = ev($scope.fa, $scope.fb, $scope.t2);
        $scope.eva2 = parseFloat($scope.eva2);
        console.log($scope.eva1);
        $scope.puntos = [

            [$scope.t1, $scope.eva1],
            [$scope.t2, $scope.eva2]
        ];
        $scope.hola = [
            [0, 1.11],
            [5, 4.51]
        ];
        console.log($scope.puntos);
        console.log($scope.hola);
        $scope.Datosnew = []
        for (var i = $scope.Datosx.length - 1; i >= 0; i--) {
            $scope.Datosnew.push($scope.Datosx[i]);
            $scope.Datosnew.push($scope.Datosy[i]);
        }
        console.log($scope.Datosnew);
        $scope.graphips();
    };

    var logic = function() {
        var temporal = [];
        var intTemp = 0;
        for (var i = 0; i < $scope.totally.length; i++) {
            if (temporal[0] != undefined && isNaN($scope.totally[i])) {
                temporal.push($scope.totally[i]);
            } else {
                if (!isNaN(temporal[temporal.length - 1])) {
                    temporal[temporal.length - 1] += $scope.totally[i];
                } else {
                    temporal.push($scope.totally[i]);

                }

            }

        }
        var holita = $scope.totally.split("+");
        console.log(temporal);
        console.log((parseFloat(holita[0]) + parseFloat(holita[1])));
    }


    $scope.showPopup = function() {
        //   $scope.totally="Regression Lineal";
        $scope.data = {};

        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
            templateUrl: 'templates/pupup.html',
            title: 'Datos',
            subTitle: 'x  -   y',
            scope: $scope
        });

        $scope.myPopup.then(function(res) {
            console.log('Tapped!', res);
        });


    };


    /*      Highcharts.chart('container', {

                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },

                series: [{
                    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                }]
            });*/

    $scope.graphips = function() {
        Highcharts.chart('container', {
            xAxis: {
                min: -0.5,
                max: 5.5
            },
            yAxis: {
                min: 0
            },
            title: {
                text: 'Scatter plot with regression line'
            },
            series: [{
                type: 'line',
                name: 'Regression Line',
                data: $scope.puntos,
                marker: {
                    enabled: false
                },
                states: {
                    hover: {
                        lineWidth: 0
                    }
                },
                enableMouseTracking: false
            }, {
                type: 'scatter',
                name: 'Observations',
                data: $scope.Datosnew,
                marker: {
                    radius: 4
                }
            }]
        });

    }



});

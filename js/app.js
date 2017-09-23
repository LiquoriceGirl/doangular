(function(){//ana fonksiyon başı
    'use strict';
  var app = angular.module('mainApp', []);

  app.controller('DoCtrl',['$scope','$http',function($scope,$http){//app controller
        $scope.todos =[];

//------Array'a veri ekleniyor --  bu fonksiyonu ekle buttonu kullanıyor----
        $scope.addDoAngular = function() {

          // Tekrar giriş kontrolü
          // *************************
          $scope.isExist = false;
          angular.forEach($scope.todos, function (item) {
            console.log(item);
            if (item.title == $scope.newToDo)
            {
                $scope.isExist = true;
            }
          });
          //*********************************



          //verinin olması durumunda verilecek hatalar
          if ($scope.isExist)
          {
              console.log("bu kayıt zaten var");
              $scope.newToDo = '';
          }
          else {//kayıt yoksa
             $scope.todos.push({'id':$scope.todos.length,'title':$scope.newToDo,'done':false});
             //JSON veritabanı post işlemi
             //*************************

             $http.post('data.json',$scope.todos).success(function(data) {
               $scope.todos = data;
             });
             //************************
              $scope.newToDo = '';
          }
        }
//--------------------------------------------------------------

//JSON veritabanı get işlemi
//*************************
$http.get('data.json').success(function(data) {
  $scope.todos = data;
});

//************************



//-----------------------enter ile veri ekleme------------------
        $scope.sumbitDoAngular = function() {
          if ($scope.newToDo) {
            $scope.sumbit.push({'id':$scope.todos.length,'title':$scope.newToDo,'done':false});
          }
        }
//--------------------------------------------------------------

//-----------Girilen veriler arrayden temizleniyor-------------
        $scope.clearDoAngular = function() {
          $scope.todos = $scope.todos.filter(function(item){
            return !item.done;
          });

          $scope.selectedAll = false;
        }
//--------------------------------------------------------------



//-----------Bayraklı olanlar-------------
        $scope.getFlagTodos = function() {
          $scope.flagTodos = $scope.todos.filter(function(item){
            return item.flag;
          });
        }
        // Eğer rengi kırmızı ise farklı listeye eklemek için fonksiyon yaz todo clasında dünkü yöntem ile çağır


//----------seçilenlerin hepsini temizlemek için*----------------
        $scope.selectAllDoAngular = function(){
          angular.forEach($scope.todos, function (item) {
            item.done = $scope.selectedAll;
          });
        }
//--------------------------------------------------------------

  }]); //app controller

})();//ana fonksiyon sonu

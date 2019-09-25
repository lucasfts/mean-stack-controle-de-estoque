(function () {
    'use strict';

    angular
        .module('app')
        .controller('Roupas.IndexController', Controller);

    function Controller($window, UserService, RoupaService) {
        // var Swal = require('sweetalert2');
        var vm = this;

        vm.user = null;
        vm.roupa = null;

        vm.roupas = [];

        vm.saveRoupa = saveRoupa;
        vm.deleteRoupa = deleteRoupa;
        vm.editRoupa = editRoupa;
        vm.addRoupa = addRoupa;
        vm.searchRoupas = searchRoupas;

        vm.searchTerm = "";

        initUser();
        getRoupas();

        function initUser() {
            // get current user data in the API
            UserService.GetUserId().then(function (userId) {
                UserService.GetCurrent(userId).then(function (user) {
                        vm.user = user;
                    });
            });
        }

        function searchRoupas(){
            RoupaService.GetAll().then(function (roupas) {
                vm.roupas = roupas.filter(contaisTerm);
            });
        }

        function getRoupas() {
            vm.searchTerm = "";
            // get current user data in the API
            RoupaService.GetAll().then(function (roupas) {
                vm.roupas = roupas;
            });
        }

        function saveRoupa() {
            if(vm.roupa._id){
                RoupaService.Update(vm.roupa)
                .then(function () {
                    vm.roupa = null;
                    $("#modalNovoItem").modal("hide");
                    swal("", "Roupa atualizada com sucesso","success");
                    getRoupas();
                })
                .catch(function (error) {
                    swal("", error, "error");
                });
            }
            else{
                RoupaService.Create(vm.roupa)
                .then(function () {
                    vm.roupa = null;
                    $("#modalNovoItem").modal("hide");
                    swal("", "Roupa adicionada com sucesso","success");
                    getRoupas();
                })
                .catch(function (error) {
                    swal("", error, "error");
                });
            }    
        }

        function deleteRoupa(elem){
            RoupaService.Delete(elem.r._id)
                .then(function () {
                    swal("", "Roupa excluída com sucesso","success");
                    getRoupas();
                })
                .catch(function (error) {
                    swal("", error, "error");
                });
        }

        function editRoupa(elem){
           elem.r.dataEntrada = new Date(elem.r.dataEntrada);
           vm.roupa = elem.r;
           $("#modalNovoItem").modal("show");
        }

        function addRoupa(){
            vm.roupa = { cor: "#000000"};
         }

         function contaisTerm(roupaParam) {
            return roupaParam.nome.toUpperCase().includes(vm.searchTerm.toUpperCase());
          }

    }

})();
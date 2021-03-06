(function() {
    'use strict';

    angular
        .module('bisaiApp')
        .controller('JuegoDialogController', JuegoDialogController);

    JuegoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Juego', 'Torneo'];

    function JuegoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Juego, Torneo) {
        var vm = this;

        vm.juego = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.torneos = Torneo.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.juego.id !== null) {
                Juego.update(vm.juego, onSaveSuccess, onSaveError);
            } else {
                Juego.save(vm.juego, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('bisaiApp:juegoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setFoto = function ($file, juego) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        juego.foto = base64Data;
                        juego.fotoContentType = $file.type;
                    });
                });
            }
        };

        vm.setQr = function ($file, juego) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        juego.qr = base64Data;
                        juego.qrContentType = $file.type;
                    });
                });
            }
        };

    }
})();

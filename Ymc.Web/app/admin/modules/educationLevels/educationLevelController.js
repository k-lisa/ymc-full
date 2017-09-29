(function () {
    "use strict"

    angular.module(ymcGlobals.appName)
        .controller('educationLevelController', EducationController);

    EducationController.$inject = ['educationService']

    function EducationController(educationService) {
        var vm = this;
        vm.swal = swal;
        vm.educationService = educationService;
        vm.postUpdateEducation = _postUpdateEducation;
        vm.getById = _select;
        vm.$onInit = _getAll;
        vm.select = _select;
        vm.items = [];
        vm.item = null;
        vm.showForm = true;
        vm.addForm = _addForm;
        vm.buttonText = "Save";
        vm.buttonStyle = "primary";
        vm.delete = _delete;
        vm.cancel = _cancel;


        function _cancel() {
            vm.showForm = true;

        }
        function _addForm() {
            _refresh()
            vm.showForm = false;
            vm.item = { inactive: false };


        }
        function _delete(item) {
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            }).then(function () {
                swal(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                vm.educationService.delete(item.id)
                    .then(_deleteSuccess, _deleteError);
            })

        }
        function _deleteSuccess(data) {

            _refresh();
            console.log("DELETE Successful");
            console.log(data);


        }
        function _deleteError() {
            console.log("Delete Failed")

        }
        function _postUpdateEducation() {
            if (vm.item.id) {
                vm.educationService.put(vm.item)
                    .then(_putSuccess, _putError);
            }
            else {
                vm.userData = {
                    Code: vm.item.code,
                    LevelOfEducation: vm.item.levelOfEducation,
                    DisplayOrder: vm.item.displayOrder,
                    Inactive: vm.item.inactive
                }

                vm.educationService.postLanguage(vm.userData)
                    .then(_submitComplete, _submitFailed);
            }
        }
        function _submitComplete(userData) {
            _refresh();
            console.log("Post Successful");
            console.log(userData);


            $.growl({
                message: 'Education Level added successfully.',

            }, {
                    element: 'body',
                    type: 'success',
                    allow_dismiss: true,

                    offset: {
                        x: 20,
                        y: 85
                    },
                    spacing: 10,
                    z_index: 1031,
                    delay: 2000,

                    url_target: '_blank',
                    mouse_over: false,

                });

        }
        function _submitFailed() {
            console.log("Post Failed")

        }
        function _putSuccess(data) {
            console.log(data);
            _refresh();
            $.growl({
                message: 'Education Level updated successfully',

            }, {
                    element: 'body',
                    type: 'success',
                    allow_dismiss: true,

                    offset: {
                        x: 20,
                        y: 85
                    },
                    spacing: 10,
                    z_index: 1031,
                    delay: 2000,

                    url_target: '_blank',
                    mouse_over: false,

                });
        }

        function _putError(error) {
            console.log("Error");

        }
        function _refresh() {
            vm.showForm = true;
            vm.createEditForm.$setPristine();
            vm.createEditForm.$setUntouched();
            vm.item = null;
            vm.buttonText = "Save";
            vm.buttonStyle = "primary";
            _getAll();

        }
        function _getAll() {
            vm.educationService.getAll()
                .then(_getAllSuccess, _getAllError)
        }
        function _getAllSuccess(data) {
            if (data && data.items) {
                vm.items = data.items;

            } else {
                vm.items = null
            }

        }

        function _getAllError(error) {
            if (error && error.message) {
                console.log("error");
            }
            else {
                console.log("there has been an error")
            }
        }
        function _select(item) {
            vm.showForm = false;
            vm.buttonText = "Update";
            vm.buttonStyle = "warning";
            vm.educationService.getById(item.id)
                .then(_getByIdSuccess, _getByIdError)

        }

        function _getByIdSuccess(data) {
            if (data && data.item) {
                vm.item = data.item;
            }
            else {
                console.log("error in success");
            }
        }

        function _getByIdError(error) {
            if (error && error.message) {
                console.log("error");
            }
            else {
                console.log("error");
            }
        }
    }
})();
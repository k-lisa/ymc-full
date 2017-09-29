(function() {
    angular.module(ymcGlobals.appName)
        .controller('accountController', AccountController);
    AccountController.$inject = ['accountService', '$window', '$scope'];

    function AccountController(accountService, $window, $scope) {
        var vm = this;
        vm.accountService = accountService;
        vm.postRegister = _postRegister;
        vm.submitEmail = _submitEmail;
        vm.postLogin = _postLogin;
        vm.items = [];
        vm.item = null;
        //vm.$onInit = _getRoles;
        vm.checkEmail = _checkEmail;
        vm.id = null;
        vm.showRoleOptions = true;
        vm.keepSignedIn = false;
        vm.$scope = $scope;
        vm.guid = [];
       


        //$scope.$watch(function () {
        //    $(".dropDownRefresh").selectpicker("refresh");

        //});
        //send ajax call on touched once
        //var checkingEmail = $scope.$watch(function () {
        //    if (vm.registerForm.registerEmail.$touched) {
        //        _checkEmail();
        //        checkingEmail();
        //    }

        //})
        function _checkEmail() {
            vm.accountService.getNameByEmail(vm.registerEmail).then(_getEmailSuccess, _getEmailFailed);
        }
        function _getEmailSuccess(data) {
            console.log("getEmail successfull!");
            console.log(data);
            if (data.item.passwordHash) {
                _getEmailFailed();
            } else if (data.item.person === null) {
                console.log("new user");
            } else {

                swal({
                    title: 'Is this you?',
                    text: data.item.person.firstName + " " + data.item.person.lastName,
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function () {
                    vm.$scope.$apply(function () {
                        vm.registerName = data.item.person.firstName;
                        vm.registerLastName = data.item.person.lastName;
                        vm.registerRoles = data.item.roleIds;
                        vm.id = data.item.person.id;
                        vm.showRoleOptions = false;
                    });
                }, function (dismiss) {

                    if (dismiss === 'cancel') {
                        swal(
                            'There has been an error!',
                            'Your email is already in use! Please contact a staff member to help you.',
                            'error'
                        );
                    }
                    vm.$scope.$apply(function () {
                        vm.registerEmail = null;
                        vm.registerForm.$setUntouched();
                        vm.registerForm.$setPristine();

                    });
                });
            }
        }
        function _getEmailFailed() {
            swal(
                'Wait!',
                'You have already completed an account registration. If you have forgotten your password, click the question mark at the bottom of the page.',
                'error'
            );
            console.log("getEmail has failed.");
        }

        //function _getRoles() {
        //    vm.accountService.getRole().then(_getRoleSuccess, _getRoleFailed);
        //}
        //function _getRoleSuccess(data) {
        //    console.log("getRole successfull!");
        //    console.log(data);
        //    vm.items = data.items;
        //}
        //function _getRoleFailed() {
        //    console.log("getRole has failed.");
        //}
        function _postLogin() {
           
            vm.userData = {
                Email: vm.loginEmail,
                Password: vm.loginPassword,
                IsPersistent: vm.keepSignedIn
            };
            vm.accountService.postLogin(vm.userData)
                .then(_postLoginSuccess, _postLoginFailed);
        }
       
        function _postLoginSuccess(userData) {

            console.log("Post Successful");
            console.log(userData);
            $window.location.href = "/admin/userHome/";
            $.growl({
                message: 'Welcome ' + vm.registerName + ' !'
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
                    mouse_over: false
                });

        }
        function _postLoginFailed() {
            swal(
                'Wait',
                'There has been an error!' +
                ' If you would like to register, click the + button below. If you have registered, please check your email for a confirmation link.',
                'error'
            )
            vm.registerForm.$setUntouched();
            vm.registerForm.$setPristine();
            console.log("Post Failed");
        }

        function _postRegister() {
            vm.userData = {
                Id: vm.id,
                FirstName: vm.registerName,
                LastName: vm.registerLastName,
                Email: vm.registerEmail,
                Password: vm.registerPassword,
                RoleId: parseInt(vm.roleOptions)
            };
            vm.accountService.postRegistration(vm.userData)
                .then(_postRegisterSuccess, _postRegisterFailed);
        }

        function _postRegisterSuccess(userData) {

            console.log("Post Successful");
            console.log(userData);
            $.growl({
                message: 'A confirmation email has been sent!'

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
                    mouse_over: false
                });
        }
        function _postRegisterFailed() {
            vm.registerForm.$setUntouched();
            vm.registerForm.$setPristine();
            console.log("Register has Failed");
            swal(
                'There has been an error.',
                'You may already have an account. If you forgot your password, click the question mark at the bottom of the form. If your email is already in use and its not you, contact a staff member to help you.',
                'error'
            );
            //$.growl({
            //    message: 'An error has occurred. You may already have an account. If you forgot your password, click the question mark at the bottom of the form.',
            //}, {
            //        element: 'body',
            //        type: 'danger',
            //        allow_dismiss: true,
            //        offset: {
            //            x: 20,
            //            y: 85
            //        },
            //        spacing: 10,
            //        z_index: 1031,
            //        delay: 2000,
            //        url_target: '_blank',
            //        mouse_over: false,

            //    });
        }
        function _submitEmail() {
            console.log("Forgotten pass button clicked!");

            var data = {
                UserEmail: vm.forgottenEmail,
                TokenTypeId: "2"
            };
            vm.accountService.postSecurityToken(data).then(_tokenSuccess, _tokenError);
        }
        function _emailSuccess(response) {
            console.log("controller email success");
        }
        function _emailError(error) {
            console.log("controller email error");
        }
        function _tokenSuccess(response) {
            console.log("controller token success");
            console.log(response.data.item);
            vm.guid = response.data.item;
            var message = "<body style='margin: 0; padding: 0; background:#ccc;'><table cellpadding=0 cellspacing=0 style='width: 100%;'><tr><td style='padding: 12px 2%;'><table cellpadding=0 cellspacing=0 style='margin:auto; background: #fff; width: 96%;'><tr><td style='padding: 12px 2%;'><div><h1 style='color:white;background-color:#1E90FF;'>Youth Mentoring Connection</h1></div > <div><h2 style='margin-top: 0;'>Congratulations</h2><p>You've successfully registered. Please confirm your email with Youth Mentoring Connection.To confirm your email click the link below:<br/></br> <span style='text-align:center; margin:0;'><a href=http://localhost:3024/app/public/index.html#!/confirmationPages?guid=" + vm.guid + ">Click Here To Confirm Email</a></p><p>...</p></div><div><h4 style='margin-top: 0;'>Sawubona!</h4><p></p></div><div style='border-top: solid 1px #ccc;'><p></p></div></td ></tr ></table ></td ></tr ></table ></body > ";

            var email = {
                From: "josephrtomas@gmail.com",
                To: "josephrtomas@gmail.com", /*vm.forgottenEmail*/
                Subject: "YMC Password Reset",
                Body: message
            };
            vm.accountService.sendForgottenPassEmail(email)
                .then(_emailSuccess, _emailError)
        }
        function _tokenError(error) {
            console.log("controller token error");
            console.log(error);
        }
    }

})();
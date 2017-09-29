(function () {
    angular.module(ymcGlobals.appName)
        .controller('chatController', ChatController);
    ChatController.$inject = ["chatService", "userService"];
    function ChatController(chatService, userService) {
        var vm = this;
        vm.chats = chatService;
        vm.userService = userService;
        _getUser();
        vm.username = null;
        vm.photo = null;
        
        vm.sendChat = function () {
            vm.chats.send(vm.username, vm.message, vm.photo);
            $('#message').val('').focus();
        }
        function _getUser() {
            vm.userService.getUserInfo()
                .then(_getUserInfoSuccess, _getUserInfoError);

        }
        function _getUserInfoSuccess(response) {
            console.log(response.item); 
            vm.username = response.item.firstName;
            vm.photo = response.item.photoUrl;
            console.log(response.item.photoUrl);
        }
        function _getUserInfoError(error) {
            console.log(error);

        }
    };
})();
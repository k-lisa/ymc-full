(function () {
    angular.module(ymcGlobals.appName)
        .factory('chatService', chatService);
    chatService.$inject = ["$http", "$rootScope", "$location", "Hub", "$timeout"];
        function chatService ($http, $rootScope, $location, Hub, $timeout) {
            var Chats = this;

            //Chat ViewModel
            var Chat = function (chat) {
                if (!chat) chat = {};

                var Chat = {
                    UserName: chat.UserName || 'UserX',
                    ChatMessage: chat.ChatMessage || 'MessageY',
                    Photo: chat.Photo || 'Photo'
                }

                return Chat;
            }

            //Hub setup
            var hub = new Hub("chatHub", {
                listeners: {
                    'addNewMessageToPage': function (userName, chatMessage, photo) {
                        Chats.add(userName, chatMessage, photo);
                        $rootScope.$apply();
                    }
                },
                methods: ['send'],
                errorHandler: function (error) {
                    console.error(error);
                },
                hubDisconnected: function () {
                    if (hub.connection.lastError) {
                        hub.connection.start();
                    }
                },
                transport: 'webSockets',
                logging: true
            });

            Chats.all = [];
            Chats.add = function (userName, chatMessage, photo) {
                Chats.all.push(new Chat({ UserName: userName, ChatMessage: chatMessage, Photo: photo}));
            }
            Chats.send = function (userName, chatMessage, photo) {
                hub.send(userName, chatMessage, photo);
            }

            return Chats;
        };
})();
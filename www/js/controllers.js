angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, product, $ionicModal, total, $ionicPopup) {
        $scope.items = [];
        $scope.subtotal = 0;
        $scope.iva = 0;
        $scope.total = 0;
        $scope.listCanSwipe = true;
        $scope.shouldShowDelete = false;
        
        var query = product.get(function() {
            $scope.products = query.product;
        });
    
        $ionicModal.fromTemplateUrl('templates/product_search.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal = modal
        })

        $scope.openModal = function() {
            $scope.modal.show()
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
        }

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        })
        
        // Perform the update action when the user submits the form
        $scope.doAdd = function(product_id) {
            
            var item = product.get({ id: product_id }, function() {
                var row = {};
                    row.product_id = item.product[0].product_id;
                    row.product_name = item.product[0].product_name;
                    row.product_price = item.product[0].product_price_1;
                    row.unit_name = item.product[0].unit_name;
                    row.product_qty = '1';
                $scope.items.push(row);
                updateTotals();
                console.log('add; ' + JSON.stringify($scope.items));
            });
 
            $scope.closeModal();
        }
        
        $scope.openQty = function(index) {
            var qty = Number($scope.items[index].product_qty);
            
            $scope.quantity = { value: qty }
            var promptPopup = $ionicPopup.prompt({
                title: 'Modificar cantidad',
                templateUrl : 'popup-template.html',
                scope: $scope,
                inputPlaceholder: 'Cantidad numerica'
            });
            
            promptPopup.then(function(res) {
                $scope.items[index].product_qty = $scope.quantity.value;
                updateTotals();
            });   
        }
        
        $scope.deleteItem = function(item) {
            $scope.items.splice(item,1);
            updateTotals();
        };
        
        function updateTotals() {
            $scope.subtotal = total($scope.items);
            $scope.iva = 0;
            $scope.total = total($scope.items);
        }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

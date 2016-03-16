angular.module('main.models', ['ngResource'])
.constant("server_config",{url : "https://goritec.com:3000", key : "84656ca7c7ccc6b44523a18b6bdf94140220bfc8"})

.factory('customer', function($resource) {
	return $resource('https://goritec.com:8100/customer/:id', { id: '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('invoice', function($resource) {
	return $resource('https://goritec.com:8100/invoice/:id');
})

.factory('product', function($resource, server_config) {
	return $resource(server_config.url + '/product/:id', {account_key : server_config.key});
})

.factory('detail', function($resource) {
	return $resource('https://goritec.com:8100/detail/:id');
})

.factory('total', function() {
    return function (items) {
            var total =  0;
            for(var i=0;i<items.length;i++)  
            {                    
                  console.log('item; ' + items[i].product_price);
                  total += Number(items[i].product_price * items[i].product_qty);  
            }  
            return total;
        };
});
(function () {
    'use strict';

    function GroceriesController($scope, $http) {
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

        $http.get('/api/groceries').then(function (response) { $scope.groceryList = response.data; });

        $scope.add = function() {
            if (!$scope.groceryName) {
                alert('Please insert grocery name');
            }
            else {
                var lastItem = _.max($scope.groceryList, function (item) { return item.Order; });
                if (lastItem == -Infinity)
                    lastItem = { Order: 0 };

                var nextOrder = ++lastItem.Order;

                $http({
                        method: 'POST',
                        url: '/api/groceries/add',
                        data: $.param({ name: $scope.groceryName, order: nextOrder }),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function (response) {
                        $scope.groceryName = '';
                        $http.get('/api/groceries').then(function (response) { $scope.groceryList = response.data; });
                    });
            }
        }

        $scope.done = function (item) {
            $http({
                method: 'POST',
                url: '/api/groceries/done',
                data: $.param({ id: item.Id }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function (response) {
                    $http.get('/api/groceries').then(function (response) { $scope.groceryList = response.data; });
                });
        }

        $scope.delete = function(item) {
            if (confirm('Are you sure?')) {
                $http({
                    method: 'POST',
                    url: '/api/groceries/delete',
                    data: $.param({ id: item.Id }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function (response) {
                    $http.get('/api/groceries').then(function (response) { $scope.groceryList = response.data; });
                });
            }
        }

        $scope.moveUp = function(item) {
            var prevItens = _.select($scope.groceryList, function(g) { return g.Order < item.Order });
            if (prevItens.length == 0)
                alert('Already first item');
            else
            {
                var prevItem = _.max(prevItens, function (g) { return g.Order });
                var prevOrder = prevItem.Order;

                $http({
                    method: 'POST',
                    url: '/api/groceries/move',
                    data: $.param({ sourceId: item.Id, targetOrder:prevOrder }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function (response) {
                    $http.get('/api/groceries').then(function (response) { $scope.groceryList = response.data; });
                });
            }
        }

        $scope.moveDown = function(item) {
            var nextItens = _.select($scope.groceryList, function(g) { return g.Order > item.Order });
            if (nextItens.length == 0)
                alert('Already last item');
            else
            {
                var nextItem = _.min(nextItens, function(g) { return item.Order });
                var nextOrder = nextItem.Order;

                $http({
                    method: 'POST',
                    url: '/api/groceries/move',
                    data: $.param({ sourceId: item.Id, targetOrder: nextOrder }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function (response) {
                    $http.get('/api/groceries').then(function (response) { $scope.groceryList = response.data; });
                });
            }
        }
    }

    angular
    .module('groceries', [])
    .controller('GroceriesController', GroceriesController);
})();
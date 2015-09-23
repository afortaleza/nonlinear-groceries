(function () {
    'use strict';

    function Grocery(id, name, order, done) {
        this.id = id;
        this.name = name;
        this.order = order;
        this.done = done;
    }


    function GroceriesController ($scope) {
        $scope.groceryList = [
            new Grocery('a', 'Watermellon', 1, false),
            new Grocery('b', 'Orange', 2, false),
            new Grocery('c', 'Apples', 3, true),
            new Grocery('d', 'Peanut butter', 4, false)
        ];

        $scope.orderedGroceryList = function() {
            return 
        }

        $scope.add = function() {
            if (!$scope.groceryName) {
                alert('Please insert grocery name');
            }
            else {
                var lastItem = _.max($scope.groceryList, function(item) { return item.order; });
                var grocery = new Grocery('', $scope.groceryName, lastItem.order + 1, false);
                $scope.groceryList.push(grocery);
                $scope.groceryName = '';
            }
        }

        $scope.done = function(item) {
            item.done = !item.done;
        }

        $scope.delete = function(item) {
            if (confirm('Are you sure?')) {
                $scope.groceryList.pop(item);
            }
        }

        $scope.moveUp = function(item) {
            var prevItens = _.select($scope.groceryList, function(g) { return g.order < item.order });
            if (prevItens.length == 0)
                alert('Already first item');
            else
            {
                var prevItem = _.max(prevItens, function (g) { return g.order });
                var prevOrder = prevItem.order;
                prevItem.order = item.order;
                item.order = prevOrder;
            }
        }

        $scope.moveDown = function(item) {
            var nextItens = _.select($scope.groceryList, function(g) { return g.order > item.order });
            if (nextItens.length == 0)
                alert('Already last item');
            else
            {
                var nextItem = _.min(nextItens, function(g) { return item.order });
                var nextOrder = nextItem.order;
                nextItem.order = item.order;
                item.order = nextOrder;
            }
        }
    }

    angular
    .module('groceries', [])
    .controller('GroceriesController', GroceriesController);
})();
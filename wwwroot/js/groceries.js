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
    }

    angular
    .module('groceries', [])
    .controller('GroceriesController', GroceriesController);
})();
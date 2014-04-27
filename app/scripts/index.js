var app = angular.module('jvViewApp', ['ngAnimate', 'fx.animations', 'infinite-scroll']);

angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250)

app.controller('mainCtrl', function($scope, $http, $timeout, ListViewAPI) {
    $scope.listView = new ListViewAPI();
});

app.factory('ListViewAPI', function($http) {
    var ListView = function() {
        this.items = [];
        this.busy = false;
        this.links;
    };

    ListView.prototype.nextPage = function() {
        if (this.busy) return;
        this.busy = true;

        var url = "/api/v1/most_wanted";
        if (this.links && this.links.next) {
            url = this.links.next.href;
        }
        $http.get(url).then(function(resp) {
            this.items = this.items.concat(resp.data._items);
            this.links = resp.data._links;
            this.busy = false;
        }.bind(this));
    };

    return ListView;
});

angular.bootstrap(document, ['jvViewApp']);
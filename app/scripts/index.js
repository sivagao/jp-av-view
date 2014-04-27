var app = angular.module('jvViewApp', ['ngAnimate', 'fx.animations', 'infinite-scroll', 'angularSpinkit']);

angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 2500)

app.controller('mainCtrl', function($scope, $timeout, ListViewAPI) {
    $scope.listView = new ListViewAPI();

    $scope.$watch('listView.newItems', function(val) {
        if (!val) return;
        _.each(val, function(item, idx) {
            $timeout(function() {
                $scope.listView.items.push(item);
            }, idx * 300);
        });
        $timeout(function() {
            $scope.listView.finishUX = true;
        }, val.length * 300);
    }, true);

    $scope.$watch('listView.finishUX', function(val) {
        if (!val) return;
        $('#gallery').photobox('a', {
            time: 0
        });
    });
});

app.factory('ListViewAPI', function($http, $timeout) {
    var ListView = function() {
        this.newItems = [];
        this.items = [];
        this.busy = false;
        this.links;
        this.timer;
        this.finishUX = false;
    };

    ListView.prototype.nextPage = function() {
        if (this.busy) return;
        this.busy = true;
        this.timer = (new Date()).getTime();

        var url = "/api/v1/most_wanted";
        if (this.links && this.links.next) {
            url = this.links.next.href;
        }
        $http.get(url).then(function(resp) {
            this.newItems = resp.data._items;
            this.links = resp.data._links;
            if ((new Date()).getTime() - (this.timer + 3000)) {
                this.busy = false;
            } else {
                $timeout(function() {
                    this.busy = false;
                }, (this.timer + 3000) - (new Date()).getTime());
            }
        }.bind(this));
    };

    return ListView;
});

angular.bootstrap(document, ['jvViewApp']);
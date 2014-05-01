var app = angular.module('jvViewApp', ['ngAnimate', 'fx.animations', 'infinite-scroll', 'angularSpinkit']);

angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 2500)

app.controller('mainCtrl', function($scope, $timeout, ListViewAPI, $http) {
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

    $scope.favHandler = function(item) {
        console.log(item);
        $http({
            data: {
                fav: true
            },
            url: 'http://is26.com:5000/api/v1/genre_office_lady/' + item._id,
            headers: {
                'if-match': item._etag
            },
            method: 'PATCH'
        }).then(function(resp) {
            console.log(resp);
        });
    };

    $scope.openMagLink = function(magnet) {
        magnet = 'magnet:?xt=urn:btih:D78C500FEBC3843CD3BF4196E6E1FB59D748C8D0&amp;dn=%E8%B8%8F%E9%9B%AA%E5%AF%BB%E7%AC%94%40www.SexInSex.net%40SAMA-385+%E6%B5%81%E5%87%BA%E6%98%A0%E5%83%8F%E5%A5%B3%E5%AD%90%E6%A0%A1%E7%94%9F%E5%9C%A8%E4%BE%BF%E5%88%A9%E5%95%86%E5%BA%97%E9%81%AD%E6%80%A7%E4%BE%B5%E7%A7%98%E5%AF%86%E6%98%A0%E5%83%8F%E3%80%90%E4%B8%AD%E6%96%87%E5%AD%97%E5%B9%95%E3%80%91';
        var i = ["share.html?", "&url=", encodeURIComponent(magnet), "&from=", encodeURIComponent('un_987212')].join('');
        openLink(i, 'TD_CLOUD_VOD');
    };

    var openLink = function(url, name) {
        name = name || "_blank";
        window.open(url, name);
        return;
        // 检查IE - window.open
        var h = document.createElement("a");
        h.href = url, h.target = name, document.body.appendChild(h), h.click();
    };
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

        var url = "http://siva.is26.com:5000/api/v1/genre_office_lady";
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
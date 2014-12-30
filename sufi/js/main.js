app = angular.module('sufi', []);

app.images = images;
app.items = items['en'];
app.items = items['ru'];
app.itemIndex = 0;

app.getRandomImage = function(){
  return app.images[app.getRand(images.length)]["image"];
}

app.nextIndex = function(){
  app.itemIndex++;
  if (app.itemIndex >= app.items.length){
    app.itemIndex = 0;
  }
}

app.onFadeInComplete = function(){
}

app.onFadeOutComplete = function(){
  app.nextIndex();
  
  var result = document.getElementById("main");
  el = angular.element(result);
  var quote = app.getQuote();
  var sc = el.scope();

  sc.quote = quote.name;
  sc.$apply();
  el.removeClass('fadeOut');
  el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', app.onFadeInComplete);
}

app.getRand = function(maxIndex){
  var min = 0
  var max = maxIndex - 1;
  return Math.floor(Math.random()*(max-min+1)+min);
}

app.getQuote = function(){
  var min = 0
  var max = app.items.length - 1;
  var index = Math.floor(Math.random()*(max-min+1)+min);
  return app.items[index];
}


app.controller("MyController", ['$scope', function($scope){
  var updateQuote = function($scope){
    var quote = app.getQuote();
    $scope.quote = quote.name;
  }

  var result = document.getElementById("main");
  var wrappedResult = angular.element(result);
  wrappedResult.addClass('animated fadeIn');

  wrappedResult.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', app.onFadeInComplete);

  updateQuote($scope);
  $scope.next = function(){
    wrappedResult.addClass('animated fadeOut');
    wrappedResult.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', app.onFadeOutComplete);
  }

}]);

app.directive('backImg', function($window){
    return function(scope, element, attrs){
        var img_name = app.getRandomImage();
        var url = 'images/roerich/'+img_name;
        // attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')'
            // ,
            // 'background-size' : 'cover'
            // 'background-size' : 'auto'
            // 'background-size' : '300%'
        });
    };
});
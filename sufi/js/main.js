app = angular.module('sufi', []);

app.images = images;
app.items = items;
app.lang = '';
app.itemIndex = 0;


//app.initItems = function(lang){
//  app.items = items[lang];
//}

app.showIndexPage = function(){
  var result = document.getElementById("index");
  var wrappedResult = angular.element(result);
  wrappedResult.addClass('animated fadeIn');
  wrappedResult.css('display', 'block');
  wrappedResult.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', app.onFadeInComplete);
}

app.hideIndexPage = function(){
  var result = document.getElementById("index");
  var wrappedResult = angular.element(result);
  wrappedResult.addClass('animated fadeOut');
  wrappedResult.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', app.onIndexFadeOutComplete);
}

app.onIndexFadeOutComplete = function(){

  //app.onFadeOutComplete();
  app.showQuote();
}


// TODO refactoring
app.showQuote = function(){
  app.nextIndex();

  var result = document.getElementById("main");
  el = angular.element(result);
  var quote = app.getQuote();
  var sc = el.scope();

  sc.quote = quote.name;
  sc.$apply();

  var result = document.getElementById("main");
  var wrappedResult = angular.element(result);
  wrappedResult.addClass('animated fadeIn');
  wrappedResult.css('display', 'block');
  wrappedResult.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', app.onFadeInComplete);
}


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

// TODO refactoring
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
  var max = app.items[app.lang].length - 1;
  var index = Math.floor(Math.random()*(max-min+1)+min);
  return app.items[app.lang][index];
}




app.controller("MyController", ['$scope','$sce', function($scope,$sce){
  var updateQuote = function($scope){
    var quote = app.getQuote();
    $scope.quote = quote.name;
    // $scope.quote = $sce.trustAsHtml("test <b>bold</b>");
  }

  app.showIndexPage();

  var result = document.getElementById("main");
  var wrappedResult = angular.element(result);
  
  $scope.next = function(){
    wrappedResult.addClass('animated fadeOut');
    wrappedResult.css('display', 'block');
    wrappedResult.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', app.onFadeOutComplete);
  }

  $scope.setLang = function(lang){
    app.lang = lang;
    app.hideIndexPage();
    updateQuote($scope);
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
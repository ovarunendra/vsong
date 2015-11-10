angular.module('vsong.controllers', ['ionic', 'vsong.services'])
.controller('DiscoverCtrl', function($scope, $timeout, User, Recommendations) {
  // get our first songs
  Recommendations.getNextSongs().then(function(){
  	//initialize the current song
  	$scope.currentSong = Recommendations.queue[0];
  });
  
  // fired when we favorite / skip a song.
  $scope.sendFeedback = function (bool) {
  	// first, add to favorites if they favorited
  	if (bool) User.addSongToFavorites($scope.currentSong);
  	//set variable for the correct animation sequence
  	$scope.currentSong.rated = bool;
  	$scope.currentSong.hide = true;

  	// preare the next song
  	Recommendations.nextSong();

  	$timeout(function() {
  		//$timeout to allow animation to complete
	  	$scope.currentSong = Recommendations.queue[0];
  	}, 250);
  };

  // used for retrieving the next album image.
  // if there isn't an album image available next, return empty string.
  $scope.nextAlbumImg = function() {
  	if (Recommendations.queue.length > 1) {
  		return Recommendations.queue[1].image_large;
  	}
  	return ''
  };
})
.controller('FavoritesCtrl', function($scope, User) {
	//get the list of our favorites from the user service
	$scope.favorites = User.favorites;
	$scope.removeSong = function(song, index) {
		User.removeSongFromFavorites(song, index);
	};
})
.controller('TabsCtrl', function($scope) {

})
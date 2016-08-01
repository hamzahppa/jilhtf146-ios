angular.module('app.controllers', [])

.controller('restoransCtrl', function($scope, $stateParams, Services, $ionicLoading, 
	$cordovaToast, $ionicTabsDelegate, $cordovaSocialSharing) {

	$ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });

	$scope.category = $stateParams.name;
	var category = $stateParams.category;
	switch(category) {
		default: {
			// console.log(category);
			Services.getRestoranCategory(category).then(function(restorans) {
				if(restorans) {
					$scope.restorans = [];

					for(var r in restorans) {
						// console.log(r);
						Services.getRestoranDetails(r).then(function(restoran) {
							$scope.restorans.push(restoran);

							$ionicLoading.hide();
						});
					}

					// $scope.restorans = listRestorans;

					// for (var i = 0; i < restorans.length; i++) {
					// 	console.log(restorans[i].index);
					// 	Services.getRestoranDetails(restorans[i].index).then(function(restoran) {
					// 		$scope.restorans.push(restoran);
					// 	});
					// }
					// console.log('success');
					// console.log($scope.restorans);

				}
			});
		} break;
	}

	$scope.saveRestoran = function(index) {
		if(Services.checkSavedRestoran(index)) {
			Services.deleteRestoran(index).then(function() {
				makeToast('Restoran telah dihapus', 1500, 'bottom');
			});
		} else {
			Services.saveRestoran(index).then(function(result) {
				if(result) {
					makeToast('Restoran berhasil disimpan', 1500, 'bottom');
				} else {
					makeToast('Restoran gagal disimpan', 1500, 'bottom');
					console.log('this should not ever happen.');
				}
			}, function(reason) {
				makeToast('Penyimpanan restoran penuh (max. 5)', 1500, 'bottom');
			});
		}
	}

	$scope.shareRestoran = function(index) {
		// create storage ref
		// var storage = firebase.storage();
		// var storageRef = storage.ref();

		// // get data resto
		var resto = $scope.restorans[index];

		// // firebase get url
		// var starsRef = storageRef.child(resto.gambar[2]);
		// var refUrl = storage.refFromURL(resto.gambar[0]);

		// // get Data URI
		// function getDataUri(url, callback) {
		//     var image = new Image();
		//     image.setAttribute('crossOrigin', 'anonymous');
		//     image.onload = function () {
		//         var canvas = document.createElement('canvas');
		//         canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
		//         canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size
		//         canvas.getContext('2d').drawImage(this, 0, 0);
		//         // Get raw image data
		//         // callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
		//         // ... or get as Data URI
		//         callback(canvas.toDataURL('image/png'));
		//     };

		//     image.src = url;
		// }

		// // get firebase download URL
		// refUrl.getDownloadURL().then(function(url) {
		// 	// Insert url into an <img> tag to "download"
		// 	console.log(url);
		// 		// getDataUri(url, function(dataUri) {
		// 		// // Do whatever you'd like with the Data URI!
		// 		// // console.log(dataUri);
		// 		// 	console.log('sukses')
		// 		// 	var link = 'www.mobilepangan.com/downloads';
		// 		// 	$cordovaSocialSharing.share(resto.keteranganResto, resto.namaResto, dataUri, link)
		// 		// 	.then(function(result) {
		// 		// 		console.log('shared');
		// 		// 	}, function(err) {
		// 		// 		console.log('error');
		// 		// 	});;
		// 		// });
		// }).catch(function(error) {
		//   switch (error.code) {
		//     case 'storage/object_not_found':
		//       // File doesn't exist
		//       console.log('not found');
		//       break;

		//     case 'storage/unauthorized':
		//       // User doesn't have permission to access the object
		//       console.log('unauthorized');
		//       break;

		//     case 'storage/canceled':
		//       // User canceled the upload
		//       console.log('cancel');
		//       break;
		//     case 'storage/unknown':
		//       // Unknown error occurred, inspect the server response
		//       console.log('unknown');
		//       break;
		//   }
		// });


		// var imagesrc = storage.refFromURL(resto.gambar[1]);
		// imagesrc.getDownloadURL().then(function(urlgambar) {
		// 	getDataUri(urlgambar, function(dataUri) {
		// 	    // Do whatever you'd like with the Data URI!
		// 	    // console.log(dataUri);
		// 	    console.log('sukses')
		// 	    var link = 'www.mobilepangan.com/downloads';
		// 		$cordovaSocialSharing.share(resto.keteranganResto, resto.namaResto, dataUri, link)
		// 		.then(function(result) {
		// 			console.log('shared');
		// 		}, function(err) {
		// 			console.log('error');
		// 		});;
		// 	});
			
		// });

		// var urlImg = resto.gambar[0];
		// var targetPath = "www/img/"+ resto.namaResto;
		// var trustHost = true;
		// var options = {};

		// $cordovaFileTransfer.download(urlImg, targetPath, options, trustHosts)
		// .then(function(result) {
			// var optionShare = {
			// 	message: resto.keteranganResto,
			// 	subject: resto.namaResto,
			// 	files: [resto.gambar[0]],
			// 	url: 'www.mobilepangan.com/downloads',
			// 	chooserTitle: 'Bagikan restoran'
			// };

			// window.plugins.socialsharing.shareWithOptions(options, function() {
			// 	console.log('shared');
			// }, function() {
			// 	console.log('error');
			// });
	// usable
			// var link = 'www.mobilepangan.com/downloads';
			var link = 'Kunjungi mobilepangan.com untuk download aplikasinya.';
			var gambar = null;
			var textshared = resto.namaResto+" - "+resto.keteranganResto;

			if(resto.gambar[3]) {
				gambar = resto.gambar[3];
			}

			$cordovaSocialSharing.share(textshared, resto.namaResto, gambar, link)
			.then(function(result) {
				console.log('shared');
			}, function(err) {
				console.log('error');
			});
	// end usable
		// });
		// $cordovaSocialSharing.share(resto.keteranganResto, resto.namaResto, resto.gambar[0], link)
		// .then(function(result) {
		// 	console.log('shared');
		// }, function(err) {
		// 	console.log('error');
		// });
	}

	$scope.checkSavedRestoran = function(index) {
		// if(Services.checkSavedRestoran(index)) {
		// 	return true;
		// } else {
		// 	return false;
		// }
		return Services.checkSavedRestoran(index);
	}

	function makeToast(_message) {
		window.plugins.toast.showWithOptions({
			message: _message,
			duration: 1500,
			position: 'bottom',
			addPixelsY: -40
		});
	}
})

.controller('restoranCtrl', function($scope, $stateParams, Services, $ionicLoading, 
	$ionicModal, $state) {

	$ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });
	// console.log("index:'"+ $stateParams.index +"'");

	$scope.restoran = null;
	$scope.menus = null;
	$scope.reviews = null;
	$scope.user = {
		rating: 5
	};

	Services.getRestoranDetails($stateParams.index).then(function(restoran) {
		if(restoran) {
			$scope.restoran = restoran;
			// console.log(restoran);

			Services.getRestoranMenus($stateParams.index).then(function(menus) {
				if(menus) {
					$scope.menus = menus;

					Services.getRestoranReviews($stateParams.index).then(function(reviews) {
						if(reviews) {
							for(var r in reviews) {
								if(reviews[r].review == undefined || reviews[r].review == null) {
									delete reviews[r];
								}
							}
							$scope.reviews = reviews;

							// console.log('success');
						}
					});

					$ionicLoading.hide();
				}
			});
		}
	});

	
	///////////////////////////////////////////////////////////
	//
	// RATING SECTION
	//
	///////////////////////////////////////////////////////////
	$scope.ratingsObject = {
		iconOn: 'ion-ios-star',
		iconOff: 'ion-ios-star-outline',
		iconOnColor: 'orangered',
		iconOffColor: 'grey',
		rating: $scope.user.rating,
		minRating: 1,
		callback: function(rating) {
			$scope.ratingsCallback(rating);
		}
	};

	$scope.ratingsCallback = function(rating) {
		// console.log('Select', rating);
		$scope.user.rating = rating;
	};

	$scope.saveRatingReview = function() {
		// console.log(uid);
		// console.log('\t'+ $scope.user.review);
		// console.log('\t'+ $scope.user.rating);

		Services.updateRatingReview($scope.restoran.index, $scope.user.reviewer, $scope.user.rating, $scope.user.review);
		$scope.modalRating.hide();

		$scope.reviews[$scope.user.reviewer] = {
			reviewer: $scope.user.reviewer,
			review: $scope.user.review
		};
	};


	///////////////////////////////////////////////////////////
	//
	// MODAL SECTION
	//
	///////////////////////////////////////////////////////////
	$ionicModal.fromTemplateUrl('templates/ulasanResto.html', {
		scope: $scope,
		animation: 'slide-in-up' 
	}).then(function(modal) { $scope.modalReview = modal; });

	$ionicModal.fromTemplateUrl('templates/ulasanMenu.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) { $scope.modalMenu = modal; });

	$ionicModal.fromTemplateUrl('templates/rating.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) { $scope.modalRating = modal; });

	$scope.openReview = function() {
		$scope.modalReview.show();
	};

	$scope.closeReview = function() {
		$scope.modalReview.hide();
	};

	$scope.openMenu = function(index) {
		$scope.selectedMenu = $scope.menus[index];
		// console.log($scope.selectedMenu);
		$scope.modalMenu.show();
	};

	$scope.closeMenu = function() {
		$scope.modalMenu.hide();
	};

	$scope.openRating = function() {
		// check whether current user has already review this resto or not
		// Services.getRatingReview($scope.restoran.namaResto, uid).then(function(result) {
		// 	if(result) {
		// 		console.log(result.reviewer);
		// 		console.log('success');
		// 	} else {
		// 		console.log('no review yet');
		// 	}
		// 	$scope.modalRating.show();
		// }, function(reason) {
		// 	console.log('error');
		// 	$scope.modalRating.show();
		// });
		
		$scope.modalRating.show();
	};
})

.controller('menusCtrl', function($scope, $stateParams, Services, $ionicModal) {

	Services.getRestoranMenus($stateParams.index).then(function(menus) {
		if(menus) {
			$scope.menus = menus;
		}
	});

	$ionicModal.fromTemplateUrl('templates/ulasanMenu.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) { $scope.modalMenu = modal; });

	$scope.openMenu = function(index) {
		$scope.selectedMenu = $scope.menus[index];
		// console.log($scope.selectedMenu);
		$scope.modalMenu.show();
	};
})
  
.controller('jelajahCtrl', function($scope, $ionicSlideBoxDelegate, Services, $state, $ionicLoading) {
	$ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });

	$scope.options = {
		loop: true,
		autoplay: true,
		speed: 3000,
	};

	$scope.user = {};

	$scope.searchQuery = function() {
		$state.go('tabsController.pencarian', {'query': $scope.user.query});
		delete $scope.user.query;
	};

	Services.getCategories().then(function(categories) {
		if(categories) {
			// for(var category in categories) {
			// 	// categories[category].namaUp = categories[category].nama.toUpperCase();
			// 	console.log(categories[category]);
			// }
			$scope.categories = categories;
		}

		$ionicLoading.hide();
	});
})

.controller('pencarianCtrl', function($scope, $stateParams, $ionicLoading, Services, $cordovaToast, $cordovaSocialSharing) {
	$scope.category = 'Pencarian';
	$scope.user = {};
	$scope.user.query = $stateParams.query;
	
    $scope.searchQuery = function() {
    	$ionicLoading.show({
	      template: '<ion-spinner icon="android"></ion-spinner>'
	    });

		Services.searchQuery($scope.user.query).then(function(inputQuery) {
			// console.log($scope.user.query);
			if(inputQuery) {
				// console.log(result);

				Services.getRestoranKeyword().then(function(result) {
					if(result) {
						$scope.restorans = [];
						var isFound = false;
						// console.log('mulai cari');

						for(var id in result) {
							// console.log(result[id].keyword);
							if(result[id].keyword.indexOf($scope.user.query) >= 0) {
								// console.log('HASIL:\t'+ id);
								isFound = true;
								// resultList.push(id);
								Services.getRestoranDetails(id).then(function(result) {
									// console.log(result.namaResto);
									$scope.restorans.push(result);

									$ionicLoading.hide();
								});
							}
						}
						// console.log('isFound: '+ isFound);
						if(!isFound) {
							delete $scope.restorans;
							$ionicLoading.hide();
						}
					}
				});
			}
		});
	}

	$scope.checkSavedRestoran = function(index) {
		return Services.checkSavedRestoran(index);
	}

	$scope.saveRestoran = function(index) {
		if(Services.checkSavedRestoran(index)) {
			Services.deleteRestoran(index).then(function() {
				makeToast('Restoran telah dihapus', 1500, 'bottom');
			});
		} else {
			Services.saveRestoran(index).then(function(result) {
				if(result) {
					makeToast('Restoran berhasil disimpan', 1500, 'bottom');
				} else {
					makeToast('Restoran gagal disimpan', 1500, 'bottom');
					console.log('this should not be done.');
				}
			}, function(reason) {
				makeToast('Penyimpanan restoran penuh (max. 5)', 1500, 'bottom');
			});
		}
	}

	$scope.shareRestoran = function(index) {
		// console.log('share: '+ index);

		var resto = $scope.restorans[index];
		var link = 'Kunjungi mobilepangan.com untuk download aplikasinya.';
		var gambar = null;
		var textshared = resto.namaResto+" - "+resto.keteranganResto;

		if(resto.gambar[3]) {
			gambar = resto.gambar[3];
		}

		$cordovaSocialSharing.share(textshared, resto.namaResto, gambar, link)
		.then(function(result) {
			console.log('shared');
		}, function(err) {
			console.log('error');
		});
	}

    $scope.searchQuery();

    function makeToast(_message) {
		window.plugins.toast.showWithOptions({
			message: _message,
			duration: 1500,
			position: 'bottom',
			addPixelsY: -40
		});
	}
})
   
.controller('tersimpanCtrl', function($scope, Services, $cordovaToast, $state, $cordovaSocialSharing, $ionicLoading) {
	$scope.category = 'Tersimpan';

	var savedRestorans = [];
	$scope.restorans = [];

	$scope.$on('$ionicView.enter', function() {
		$ionicLoading.show({
	      template: '<ion-spinner icon="android"></ion-spinner>'
	    });

		var temp = Services.getSavedRestorans();
		savedRestorans = temp.slice(0);
		savedRestorans.reverse();
		// console.log(savedRestorans.length +" | "+ temp.length);
		// if(savedRestorans.length !== temp.length) {
		// 	updateSavedRestorans(temp);
		// } else {
		// 	var diff = false;
		// 	var prev = savedRestorans.slice(0);
		// 	var next = temp.slice(0);
		// 	prev.sort();
		// 	next.sort();

		// 	for(var i=0; i<prev.length; i++) {
		// 		if(prev[i] !== next[i]) {
		// 			updateSavedRestorans(temp);
		// 			break;
		// 		}
		// 	}
		// }

		updateSavedRestorans(savedRestorans);
	});

	$scope.saveRestoran = function(index) {
		Services.deleteRestoran(index).then(function() {
			window.plugins.toast.showWithOptions({
				message: 'Restoran berhasil dihapus',
				duration: 1500,
				position: 'bottom',
				addPixelsY: -40
			});
			$state.go($state.current, {}, {reload: true});
		});
	}

	$scope.shareRestoran = function(index) {
		// console.log('share: '+ index);

		var resto = $scope.restorans[index];
		var link = 'Kunjungi mobilepangan.com untuk download aplikasinya.';
		var gambar = null;
		var textshared = resto.namaResto+" - "+resto.keteranganResto;

		if(resto.gambar[3]) {
			gambar = resto.gambar[3];
		}

		$cordovaSocialSharing.share(textshared, resto.namaResto, gambar, link)
		.then(function(result) {
			console.log('shared');
		}, function(err) {
			console.log('error');
		});

		// var resto = $scope.restorans[index];
		// var link = 'www.mobilepangan.com/downloads';
		// var image = 'www/img/cafe.jpg';
		// $cordovaSocialSharing.share(resto.reviewTim, resto.namaResto, image, link).then(function(result) {
		// console.log(resto.keteranganResto);
		// console.log(resto.namaResto);
		// console.log(resto.gambar[0]);
		// console.log(link);
		// $cordovaSocialSharing.share(resto.keteranganResto, resto.namaResto, null, link)
		// .then(function(result) {
		// 	console.log('shared');
		// }, function(err) {
		// 	console.log('error');
		// });

		// var optionShare = {
		// 	message: resto.keteranganResto,
		// 	subject: resto.namaResto,
		// 	files: [resto.gambar[0]],
		// 	url: link,
		// 	chooserTitle: 'Bagikan restoran'
		// };

		// window.plugins.socialsharing.shareWithOptions(options, function() {
		// 	console.log('shared');
		// }, function() {
		// 	console.log('error');
		// });
	// })
	}

	$scope.checkSavedRestoran = function(index) {
		return Services.checkSavedRestoran(index);
	}

	function updateSavedRestorans(news) {
		console.log('update');
		savedRestorans = news;
		$scope.restorans = [];
		if(news && news.length > 0) {
			for(var i=0; i<news.length; i++) {
				Services.getRestoranDetails(news[i]).then(function(restoran) {
					if(restoran) {
						$scope.restorans.push(restoran);
						// console.log(restoran);
						console.log('success');
					} else {
						console.log('failure');
					}

					$ionicLoading.hide();
				});
			}
		} else {
			$ionicLoading.hide();
		}
		// console.log($scope.restorans);
	}
})

.controller('petaCtrl', function($scope, $state, $stateParams, Services, $cordovaGeolocation, $ionicPopup) {

	// console.log($stateParams.index);

	var options = {timeout: 10000, enableHighAccuracy: true};

	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
		Services.getRestoranDetails($stateParams.index).then(function(restoran) {
			if(restoran) {
				$scope.restoran = restoran;
				var restoLat = restoran.map.lat;
				var restoLng = restoran.map.long;

				var latLng = new google.maps.LatLng(restoLat, restoLng); 
				console.log(restoran.map.lat);
				console.log(restoran.map.long); 

				var mapOptions = {
					center: latLng,
					zoom: 15,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};

				$scope.map = new google.maps.Map(document.getElementById("mangan-peta"), mapOptions);
				//Wait until the map is loaded
				google.maps.event.addListenerOnce($scope.map, 'idle', function(){
					var marker = new google.maps.Marker({
						map: $scope.map,
						animation: google.maps.Animation.DROP,
						position: latLng,
						icon: 'img/marker.png'
					});

					var contentString = '<p><b>'+restoran.namaResto+'</b></p>';

					var infoWindow = new google.maps.InfoWindow({
						content: contentString,
						maxWidth: 500
					});

					google.maps.event.addListener(marker, 'click', function () {
						infoWindow.open($scope.map, marker);
					});

					infoWindow.open($scope.map, marker);
				});

				$scope.openUrl = function() {
					var lat = position.coords.latitude;
					var lng = position.coords.longitude;
					window.open('http://maps.google.com/maps?saddr=+'+lat+'+,+'+lng+'+&daddr=+'+restoLat+'+,+'+restoLng+'+&dirflg=d', '_system', 'location=yes');
					// window.open('geo:'+lat+','+lng+'?q='+restoLat+','+restoLng+'('+restoran.namaResto+')', '_system', 'location=yes');
					return false;
				}
			} else {
				console.log('failure');
			}
		}, function(reason) {	
			$scope.restoran = null;
			console.log('error');
		});
	}, function(error){
		console.log("Could not get location");
		$ionicPopup.alert({
			title: 'Error',
			template: 'Tidak dapat menggunakan GPS, hidupkan setting GPS anda',
			okText: 'OK',
			okType: 'button-balanced'
		});
	});
})
 
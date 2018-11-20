// self.addEventListener('install', function (event) {
//     Notification.requestPermission(function (result) {
//       console.log(result)
//     })
//
// })

// self.addEventListener('push', function(event) {
//   event.waitUntil(
//     Notification.requestPermission().then(function (permission) {
//       console.log("requsting permisson: ", permission)
//     })
//   )
// });



// Install Service Worker not necessary if cache is not needed

// Fired when the Service Worker starts up
self.addEventListener('activate', function(event) {

  console.log('Service Worker: Activating....');


});

self.addEventListener('push', function(event) {

  console.log('Service Worker: Pushing....', event);

});
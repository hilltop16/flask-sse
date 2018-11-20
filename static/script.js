var source = new EventSource("stream")
console.log(source)

if ('serviceWorker' in navigator) {
  // we are checking here to see if the browser supports the  service worker api
  // Notification.requestPermission().then(function (permission) {
  //   console.log("requsting permisson: ", permission)
  // })
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('../sw.js').then(function(registration) {
      // Registration was successful
      Notification.requestPermission().then(function (result) {
        if (result === 'granted') {
          navigator.serviceWorker.ready.then(function(registration){
            source.addEventListener('greeting', function(event) {
              var data = JSON.parse(event.data);
              console.log("The server says " + data.message);
              registration.showNotification(data.message)
            }, false);
            source.addEventListener('error', function(event) {
              console.log("Failed to connect to event stream. Is Redis running?");
            }, false);

          })
        }
      })
      registration.pushManager.getSubscription().then(function (subscription) {
        console.log("subscription state: ",subscription)
      })
      console.log('Service Worker registration was successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}




function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("blah blah blah");
      }
    });
  }
  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

function requestNotificationPermission() {
  if (Notification.requestPermission) {
    Notification.requestPermission(function(result) {
      console.log("Notification permission : ", result);
    });
  } else {
    console.log("Notifications not supported by this browser.");
  }
}


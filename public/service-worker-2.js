/* eslint-disable */

const cacheName = 'pomona2-v1'

const fileToCache = [
  'js/main.js',
  'main.css',
  'offline.html',
  'index.html',
  'static/media/image/svg/pomona-icon.svg',
  'static/media/image/svg/ic_step-1.svg',
  'static/media/image/svg/ic_step-2.svg',
  'static/media/image/svg/ic_step-3.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(fileToCache))
      .then()
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (cacheName !== key) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('V2 now ready to handle fetches!');
    })
  )
});

function addToCache(cacheName, request, response) {
  caches.open(cacheName)
    .then(cache => cache.put(request, response));
}

self.addEventListener('fetch', (event) => {
  // response from cache file

  if (event.request.url.includes(event.request.referrer)) {
    event.respondWith(caches.match(event.request.url).then((responseCache) => {
      if (responseCache) {
        return responseCache
      }
      return fetch(event.request)
        .then(responseFetch => responseFetch)
        .catch(err => {
          console.log('no network ', event.request, err);
          return caches.match('offline.html').then(offlineresponse => offlineresponse)

        })
    })
    )
  }

  //   update cache
  const mainRegx = new RegExp(/main.[js,css]$/)
  if (mainRegx.test(event.request.url)) {
    fetch(event.request).then((response) => {
      if (response.status !== 200) {
        console.log('masuk sini')
      } else {
        addToCache(cacheName, event.request, response.clone())
      }
    })
  }
})


self.addEventListener('message', function (event) {
  // console.log('message', event);

  if (event.data.action === 'skipWaiting') {
    self.skipWaiting()
  }
})
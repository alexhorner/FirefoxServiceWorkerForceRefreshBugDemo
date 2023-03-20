self.addEventListener("install", function(event) {
    console.log("ServiceWorker install");
    self.skipWaiting();
});

self.addEventListener("activate", function(event) {
    console.log("ServiceWorker activate");
});

async function handleFetchEvent(event) {
    console.log("[ServiceWorker] Request for: " + event.request.url);

    if (event.request.url.toLowerCase().startsWith(self.location.origin + "/content.txt")) {
        console.log("ServiceWorker content modification fired");

        return new Response(new Blob([ "This content has been modified by the ServiceWorker" ], { type: "text/plain" }));
    } else {
        return fetch(event.request);
    }
}

self.addEventListener("fetch", event => {
    event.respondWith(handleFetchEvent(event));
});
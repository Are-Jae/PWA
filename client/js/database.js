import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// // TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');

// // TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error('getDb not implemented');

initdb();

export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  await tx.store.put({ content, id: 1 });
  await tx.done;
  console.log('Data saved to IndexedDB:', content);
};
import { openDB } from 'idb';

// const initdb = async () => ;


export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const data = await tx.store.getAll();
  console.log('Data retrieved from IndexedDB:', data);
  return data && data.length > 0 ? data[0].content : null;
};

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
});

const butInstall = document.getElementById('buttonInstall');

butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('User choice:', outcome);
    deferredPrompt = null;
  }
});

window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed successfully.');
});

registerRoute(
  ({ url }) =>
    url.origin === location.origin &&
    (url.pathname.startsWith('C:\Users\raven\Desktop\PWA\client\css\style.css') ||
      url.pathname.startsWith('C:\Users\raven\Desktop\PWA\client\imgs') ||
      url.pathname.startsWith('client/index.html')),
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);







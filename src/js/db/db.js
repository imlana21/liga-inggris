//import { openDB, deleteDB, wrap, unwrap } from 'idb';
import {openDB} from 'idb';

const dbPromised = openDB('football-info', 1, {
  upgrade(db) {
    const store = db.createObjectStore('favorite', {
      keyPath: 'id'
    });
    store.createIndex('name', 'name', { unique: false });
  }
});

function saveFavorite(team) {
  dbPromised
    .then( db => {
      // Define Transaction
      const tx = db.transaction("favorite", "readwrite");
      // Define StoreName
      const store = tx.objectStore("favorite");

      // Add Data 'article.result' to objectStore 'articles'
      store.add(team);
      console.log(team);

      return tx.complete;
    })
    .then( () => {
      console.log("Berhasil Menyimpan");
    })
    .catch( error => {
      console.log(`Gagal Menyimpan ${error}`);
    })
}

// Get All Data from Database
function getAllSaved() {
  return new Promise( (resolve, reject) => {
    dbPromised
      .then( db => {
        var tx = db.transaction("favorite", "readonly");
        var store = tx.objectStore("favorite");
        return store.getAll();
      })
      .then( team => {
        resolve(team);
      });
  });
}

function getByIdSaved(id) {
  return new Promise( (resolve, reject) => {
    dbPromised
      .then( db => {
        var tx = db.transaction("favorite", "readonly");
        var store = tx.objectStore("favorite");

        return store.get(parseInt(id));
      })
      .then( team => {
        resolve(team);
      });
  });
}

export {saveFavorite, getAllSaved, getByIdSaved}

const idbPromised = idb.open("RaksyeFootball", 1, (upgradeDB) => {
  const teamsObjectStore = upgradeDB.createObjectStore("teams", {
    keyPath: "id",
  });

  teamsObjectStore.createIndex("name", "name", {
    unique: false,
  });
});

const saveForClick = (team) => {
  idbPromised
    .then((db) => {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");

      store.put(team);

      return tx.complete;
    })
    .then(() => {
      console.log("Team berhasil disimpan");
    });
};

const deleteFromDB = (id) => {
  idbPromised
    .then((db) => {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");

      store.delete(id);
      return tx.complete;
    })
    .then(() => {
      window.location.reload();
    });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    idbPromised
      .then((db) => {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");

        return store.getAll();
      })
      .then((team) => {
        resolve(team);
      });
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    idbPromised
      .then((db) => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");

        return store.get(id);
      })
      .then((team) => resolve(team));
  });
};

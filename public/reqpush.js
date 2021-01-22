/* 
  Adding serviceWorker
*/

const registerServiceWorker = () => {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then((res) => {
      console.log("register serviceWorker berhasil !");
      return res;
    })
    .catch((err) => console.error("register serviceWorker gagal", err));
};

/* 
  Adding push API 
*/

const requestPermission = () => {
  if ("Notification" in window) {
    Notification.requestPermission().then((result) => {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }

      if ("PushManager" in window) {
        navigator.serviceWorker
          .getRegistration()
          .then((reg) => {
            reg.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                  "BA7n4DEOEb9CZhpCAWACeV52IUM1bMQXyF4DFRI5JP7TAJYBoQJPVo-Zfz2ux0rdifsZvqiwxa3qVNuz3La2Pl4"
                ),
              })
              .then((subs) => {
                console.log(
                  "Berhasil melakukan subscribe dengan endpoint",
                  subs.endpoint
                );
                console.log(
                  "Berhasil melakukan subscribe dengan p256dh key: ",
                  btoa(
                    String.fromCharCode.apply(
                      null,
                      new Uint8Array(subs.getKey("p256dh"))
                    )
                  )
                );
                console.log(
                  "Berhasil melakukan subscribe dengan auth key: ",
                  btoa(
                    String.fromCharCode.apply(
                      null,
                      new Uint8Array(subs.getKey("auth"))
                    )
                  )
                );
              });
          })
          .catch((err) =>
            console.log("Tidak dapat melakukan subscribe", err.message)
          );
      }
    });
  }
};

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

if (!("serviceWorker" in navigator)) {
  console.log("browser tidak mendukung ServiceWorker !");
} else {
  registerServiceWorker();
  requestPermission();
}

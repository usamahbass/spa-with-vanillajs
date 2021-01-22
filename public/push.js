const webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BA7n4DEOEb9CZhpCAWACeV52IUM1bMQXyF4DFRI5JP7TAJYBoQJPVo-Zfz2ux0rdifsZvqiwxa3qVNuz3La2Pl4",
  privateKey: "1tQjnHGMxBuvJ3_076CIkz3qA3I-IdTCLW_RvmMQACo",
};

webPush.setVapidDetails(
  "mailto:basalamahusamah7@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/ePmKR7WA9io:APA91bHgZcZ4wIQmY4QWgxhIV4qBwH-9IzhWCl4cpobn_vfgGiCHSmbb53ubwq0mVsijfqh0Y0Wn_MfHN1Bxjkdamd2Xs-qgeXkJvnfNU2969_c8JysxVQrcid3kuxKP0CUbwcDdpKsm",
  keys: {
    p256dh:
      "BDKiRQ1cgaCeE4fhzfpkvVdbwXA1DnIHYEykAE6koCTrYzqlyJBzuF4EzXrXaT7I30k1w7nfzo9kDpf8qWMT8Hk=",
    auth: "eZtL7xHlUsxSUjCbvYjeew==",
  },
};
const payload = "RaksyeFootball , ini hanya pesan notifikasi";

const options = {
  gcmAPIKey: "643168128018",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);

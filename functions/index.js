const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();


exports.pushNotification = functions.firestore
    .document('noticias/{noticiaId}')
    .onCreate( async event => {
        
    const data = event.data();

    const titulo = data.titulo
    const texto = data.texto

    // Notification content
    const payload = {
      notification: {
          title: titulo,
          body: texto
      }
    }

    // ref to the device collection for the user
    const db = admin.firestore()
    const devicesRef = db.collection('devices')


    // get the user's tokens and send notifications
    const devices = await (devicesRef.get());

    const tokens = [];

    devices.forEach(result => {
        const token = result.data().token;

        tokens.push(token);
    })
    // send a notification to each device token
 	/*let devicesRef = db.collection(`devices`);
    let dev = devicesRef.get();
    dev.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tokens.push(doc.data().token);
        console.log(doc.data().token);
      })
       return admin.messaging().sendToDevice(tokens, payload)
    });*/
    return admin.messaging().sendToDevice(tokens, payload)
});
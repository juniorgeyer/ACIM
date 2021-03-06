const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();


exports.pushNotification = functions.firestore
    .document('noticias/{noticiaId}')
    .onCreate( async event => {
        
    const data = event.data();

    const titulo = data.titulo

    // Notification content
    const payload = {
      notification: {
          title: "Nova Notícia",
          body: titulo
      },
      data: {
      	"acao": "novaNoticia",
        "titulo": titulo
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

    return admin.messaging().sendToDevice(tokens, payload)
});


exports.pushNotificationCurso = functions.firestore
    .document('cursos/{cursoId}')
    .onCreate( async event => {
        
    const data = event.data();

    const titulo = data.titulo
    const texto = data.textoNotificacao

    // Notification content
    const payload = {
      notification: {
          title: "Novo Curso Disponível",
          body: titulo
      },
      data: {
      	"acao": "novoCurso",
        "titulo": titulo
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

    return admin.messaging().sendToDevice(tokens, payload)
});


exports.pushNotificationCurso = functions.firestore
    .document('agenda/{agendaId}')
    .onCreate( async event => {
        
    const data = event.data();

    const titulo = data.titulo

    // Notification content
    const payload = {
      notification: {
          title: "Novo Evento na Agenda",
          body: titulo
      },
      data: {
      	"acao": "novaAgenda",
        "titulo": titulo
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

    return admin.messaging().sendToDevice(tokens, payload)
});
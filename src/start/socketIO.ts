import { Server, Socket } from "socket.io";
import { notificationServices } from '../api/v1/services/notification.Service';
export const startSocketIO = (server: any) => {
    //initializing the socket io connection 
    const io = new Server(server, {
        // ...
      });
    io.on('connect', (socket: any) => {
        console.log(`Client connected ${socket.id}`);
        socket.on("getNotification", async(_id: any) => {
            //const data = await notificationController.getNotificationByIDUser(_id);
            const { data, message, status } =
                await notificationServices.getNotificationByIDUser(_id._id);
            console.log("hihi", _id._id);
            socket.join(_id._id);
            io.to(_id._id).emit('dataNotification', { data: data });
        });

        //add notification and send notification
        socket.on("sendNotification", async (
            notification: any) => {
            //send notification
            console.log("huhu", notification.recipientID)
            const noti = await notificationServices.addNotification(notification.notificationType,
                notification.createDate,
                notification.read,
                notification.recipientID,
                notification.senderID,
                notification.message,
                notification.className,
                notification.url)
                console.log(noti);
                const data = [noti.data]
            io.to(notification.recipientID).emit('dataNotification', {
                data: data
                // NotificationType: notificationType,
                // CreateDate: createDate,
                // Read: read,
                // RecipientID: recipientID,
                // SenderID: senderID,
                // Message: message,
                // ClassName: className,
                // Url: url,
            });
            socket.broadcast.to(notification.recipientID).emit('dataNotification', {data: data });
        });
        socket.on("updateNotification", (notification: object, key: object) => {
            notificationServices.updateNotification(notification, key);
        })

        //when the user exits the room
        socket.on("disconnect", () => {
            //the user is deleted from array of users and a left room message displayed

        });
    });
}
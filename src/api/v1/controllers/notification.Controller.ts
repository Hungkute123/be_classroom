// dependencies
import { Request, Response } from "express";
// Interfaces

// Middlewares
import { asyncMiddleware } from "../middlewares/async.Middleware";
// services
import { notificationServices } from "../services/notification.Service";
class NotificationController {
    addNotification = async (req: Request, res: Response): Promise<void> => {
        const notificationType = req.body.notificationType;
        const createDate = req.body.createDate;
        const read = req.body.read;
        const recipientID = req.body.recipientID;
        const senderID = req.body.senderID;
        const message = req.body.message;
        const className = req.body.className;
        const url = req.body.url;
        const { data, status } = await notificationServices.addNotification(
            notificationType,
            createDate,
            read,
            recipientID,
            senderID,
            message,
            className,
            url,
        )
        res.status(status).send({ data });
    };
    getClassByCodeClass = asyncMiddleware(
        async (req: Request, res: Response): Promise<void> => {
            const id = req.body._id;
            const { data, message, status } =
                await notificationServices.getNotificationByIDUser(id);

            res.status(status).send({ data, message });

        }
    );
    updateNotification = asyncMiddleware(
        async (req: Request, res: Response): Promise<void> => {
            const body = req.body;
            const key = { ...body.key };
            const notification = { ...body.notification };

            console.log(key, notification);

            const { data, message, status } = await notificationServices.updateNotification(
                notification,
                key
            );

            res.status(status).json({ data, message });
        }
    );
}
export const otificationController = new NotificationController();

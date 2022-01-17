import { NotificationModel } from "../models";


class NotificationServices {
    addNotification = async (
        notificationType: string,
        createDate: string,
        read: boolean,
        recipientID: string,
        senderID: string,
        message: string,
        className: string,
        url: string,
    ) => {
        try {
            const addNotification = new NotificationModel({
                NotificationType: notificationType,
                CreateDate: createDate,
                Read: read,
                RecipientID: recipientID,
                SenderID: senderID,
                Message: message,
                ClassName: className,
                Url: url,
            });
            const saveNotification = await addNotification.save();
            return {
                data: saveNotification,
                message: "Lưu thông báo thành công",
                status: 200,
            };
        } catch (error: any) {
            throw new Error(error.messages);
        }
    };

    getNotificationByIDUser = async (id: string) => {
        try {
            const notifications = await NotificationModel.find({ RecipientID: id });
            return {
                data: notifications,
                message: "Success",
                status: 200,
            };
        } catch (error: any) {
            throw new Error(error.messages);
        }
    };
    updateNotification = async (notification: Object, key: Object) => {
        try {
          const update = await NotificationModel.findOneAndUpdate(
            { ...key },
            { $set: { ...notification } }
          );
    
          if (update) {
            return {
              data: true,
              message: "Notification update successfully",
              status: 200,
            };
          }
    
          return {
            data: false,
            message: "Update failed",
            status: 200,
          };
        } catch (error: any) {
          throw new Error(error.messages);
        }
      };
}
export const notificationServices = new NotificationServices();

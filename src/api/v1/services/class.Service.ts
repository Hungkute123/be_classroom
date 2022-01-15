import { AccountModel } from "../models";
import { ClassModel } from "../models/class.Model/class.Model";
import { MemberModel } from "../models/member.Model/member.Model";
class ClassServices {
  getClassByListCodeClass = async (CodeClass: any) => {
    try {
      const classes = await ClassModel.find({ CodeClass: { $in: CodeClass } });
      if (classes.length === 0) {
        return {
          data: null,
          message: "can not find class",
          status: 400,
        };
      }
      return {
        data: classes,
        message: "Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  createClass = async (
    IDUser: string,
    CodeClass: string,
    Title: string,
    Theme: string,
    Part: string,
    Image: string,
    Room: string
  ) => {
    try {
      const createClass = new ClassModel({
        IDUser: IDUser,
        CodeClass: CodeClass,
        Title: Title,
        Theme: Theme,
        Part: Part,
        Image: Image,
        Room: Room,
      });
      const saveClass = await createClass.save();
      return {
        data: saveClass,
        message: "Create Class Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  getsingleCodeClass = async (CodeClass: string) => {
    try {
      const classes = await ClassModel.find({ CodeClass: CodeClass });
      if (classes.length === 0) {
        return {
          data: null,
          message: "can not find class with codeclass",
          status: 400,
        };
      }
      return {
        data: classes,
        message: "Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  getClassByCodeClass = async (CodeClass: string) => {
    try {
      const classes = await ClassModel.findOne({ CodeClass: CodeClass });
      if (classes === null) {
        return {
          data: null,
          message: "can not find class",
          status: 400,
        };
      }
      return {
        data: classes,
        message: "Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  isOwnerClass = async (IDUser: string, CodeClass: string) => {
    try {
      const classes = await ClassModel.findOne({ CodeClass: CodeClass });
      if (classes !== null && classes.IDUser === IDUser) {
        return {
          data: true,
          message: "owner class",
          status: 400,
        };
      } else {
        return {
          data: false,
          message: "not owner class",
          status: 200,
        };
      }
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  getListClass = async () => {
    try {
      const classes = await ClassModel.aggregate([
        { "$addFields": { "userId": { "$toObjectId": "$IDUser" } } },
        {
          "$lookup":
          {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "info"
          }
        }
      ])
      console.log(classes[0].info[0].Name)
      if (classes.length != 0) {
        return {
          data: classes,
          message: "Success",
          status: 200,
        };
      } else {
        return {
          data: null,
          message: "Fail",
          status: 400,
        };
      }
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  updateClass = async (classroom: Object, key: Object) => {
    try {
      const update = await ClassModel.findOneAndUpdate(
        { ...key },
        { $set: { ...classroom } }
      );

      if (update) {
        return {
          data: true,
          message: "Class update successfully",
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
  deleteClass = async (id: any) => {
    try {
      const del = await ClassModel.deleteOne(
        { _id: id },
      );

      if (del) {
        return {
          data: true,
          message: "Class delete successfully",
          status: 200,
        };
      }

      return {
        data: false,
        message: "Delete failed",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
}
export const classServices = new ClassServices();

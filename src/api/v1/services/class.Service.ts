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
}
export const classServices = new ClassServices();

import { ClassStructureModel } from "../models/classStructure.Model/classStructure.Model";

class ClassStructureServices {
  getClassStructureByCodeClass = async (CodeClass: string) => {
    try {
      const classStructure = await ClassStructureModel.find({
        CodeClass: CodeClass,
      });
      if (classStructure.length === 0) {
        return {
          data: null,
          message: "can not find class structure",
          status: 400,
        };
      }
      return {
        data: classStructure,
        message: "Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  saveClassStructure = async (
    CodeClass: string,
    MarkType: string,
    Mark: number
  ) => {
    try {
      const createClassStructure = new ClassStructureModel({
        CodeClass: CodeClass,
        MarkType: MarkType,
        Mark: Mark,
        Complete: false,
      });
      const saveClassStructure = await createClassStructure.save();
      return {
        data: saveClassStructure,
        message: "Create Class Structure Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  updateClassStructureByID = async (
    Id: string,
    CodeClass: string,
    MarkType: string,
    Mark: number,
    Complete: boolean
  ) => {
    try {
      const classStructure = await ClassStructureModel.findOneAndUpdate(
        { _id: Id },
        {
          $set: {
            CodeClass: CodeClass,
            MarkType: MarkType,
            Mark: Mark,
            Complete: Complete
          },
        }
      );
      if (!classStructure) {
        return {
          data: false,
          message: "update failed",
          status: 400,
        };
      }
      return {
        data: true,
        message: "Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  removeClassStructureByID = async (Id: string) => {
    try {
      const classStructure = await ClassStructureModel.remove({
        _id: Id,
      });
      if (!classStructure) {
        return {
          data: false,
          message: "Failed",
          status: 400,
        };
      }
      return {
        data: true,
        message: "Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
}
export const classStructureServices = new ClassStructureServices();

import { ClassModel, MarkModel } from "../models";
import { MemberModel } from "../models/member.Model/member.Model";

class MemberServices {
  addMember = async (
    IDUser: string,
    CodeClass: string,
    Permission: string,
    Status: boolean,
    Name?: string,
    Image?: string,
    MSSV?: string
  ) => {
    try {
      const addMember = new MemberModel({
        IDUser: IDUser,
        CodeClass: CodeClass,
        Permission: Permission,
        Status: Status,
      });
      const saveMember = await addMember.save();

      if (Permission === "Student") {
        const mark = await MarkModel.findOne({
          Name: Name,
          MSSV: MSSV,
          CodeClass: CodeClass,
        });

        if (!mark) {
          const addMark = new MarkModel({
            Name: Name,
            MSSV: MSSV,
            CodeClass: CodeClass,
            IDUser: IDUser,
            Image: Image,
          });

          await addMark.save();
        }
      }

      return {
        data: saveMember,
        message: "Tham gia lớp học thành công",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  getTeacherByCodeClass = async (CodeClass: string) => {
    try {
      const members = await MemberModel.find({
        CodeClass: CodeClass,
        Permission: "Teacher",
      });
      if (members === null) {
        return {
          dataTeacher: members,
          message: "can not find teacher",
          status: 400,
        };
      }
      return {
        dataTeacher: members,
        message: "Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  getStudentByCodeClass = async (CodeClass: string) => {
    try {
      const members = await MemberModel.find({
        CodeClass: CodeClass,
        Permission: "Student",
      });
      if (members === null) {
        return {
          dataStudent: members,
          message: "can not find student",
          status: 400,
        };
      }
      return {
        dataStudent: members,
        message: "Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  checkMemberValidClassroom = async (IDUser: string, CodeClass: string) => {
    try {
      const members = await MemberModel.findOne({
        IDUser: IDUser,
        CodeClass: CodeClass,
      });
      const classroom = await ClassModel.findOne({
        CodeClass: CodeClass,
      });
      if (classroom === null) {
        return {
          data: "Lớp học không tồn tại",
          message: "Lớp học không tồn tại",
          status: 401,
        };
      }
      if (members === null && classroom != null) {
        return {
          data: "Bạn chưa tham gia lớp học",
          message: "Bạn chưa tham gia lớp học",
          status: 400,
        };
      }
      return {
        data: members,
        message: "Bạn đã tham gia lớp học",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  getClassByIDUser = async (IDUser: string) => {
    try {
      const members = await MemberModel.find({ IDUser: IDUser });
      if (members === null) {
        return {
          dataUser: members,
          message: "can not find teacher",
          status: 400,
        };
      }
      return {
        dataUser: members,
        message: "Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
}
export const memberServices = new MemberServices();

import { MarkModel, AccountModel } from "../models";

class MarkServices {
  addListStudent = async (listStudent: Array<any>, codeClass: string) => {
    try {
      for (let i = 0; i < listStudent.length; i++) {
        const idUser = await AccountModel.findOne(
          {
            Name: listStudent[i].Name,
            MSSV: listStudent[i].MSSV,
          },
          { _id: 1, Image: 1 }
        );

        const listStudentNew = {
          ...listStudent[i],
          IDUser: idUser ? idUser._id : "",
          Image: idUser ? idUser.Image : "",
        };

        await MarkModel.updateOne(
          {
            Name: listStudent[i].Name,
            MSSV: listStudent[i].MSSV,
            CodeClass: codeClass,
          },
          { ...listStudentNew },
          { upsert: true }
        );
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

  addMark = async (
    listMark: Array<any>,
    structure: string,
    listMSSV: Array<any>,
    codeClass: string
  ) => {
    try {
      for (let i = 0; i < listMark.length; i++) {
          const number = listMark[i][structure];
          if (isNaN(number) || typeof number != "number") {
            return {
              data: false,
              message: "Wrong structure",
              status: 200,
            };
          }
      }

      for (let i = 0; i < listMark.length; i++) {
        await MarkModel.findOneAndUpdate(
          { MSSV: listMSSV[i], CodeClass: codeClass },
          { $set: { Point: listMark[i] } }
        );
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

  getAllMark = async (codeClass: string) => {
    try {
      const listMark = await MarkModel.find(
        { CodeClass: codeClass },
        { _id: 0, _v: 0 }
      );

      return {
        data: listMark,
        message: "List mark",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
}

export const markServices = new MarkServices();

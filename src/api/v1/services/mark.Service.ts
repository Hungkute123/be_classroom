import { MarkModel, AccountModel } from "../models";

class MarkServices {
  addListStudent = async (listStudent: Array<any>, codeClass: string) => {
    try {
      for (let i = 0; i < listStudent.length; i++) {
        const idUser = await AccountModel.findOne(
          {
            MSSV: listStudent[i].MSSV,
          },
          { _id: 1, Image: 1 }
        );

        const listStudentNew = {
          ...listStudent[i],
          Name: listStudent[i].Name,
          IDUser: idUser ? idUser._id : "",
          Image: idUser ? idUser.Image : "",
        };

        await MarkModel.updateOne(
          {
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
        const mark: any = await MarkModel.findOne({
          MSSV: listMSSV[i],
          CodeClass: codeClass,
        });

        let point = mark.Point || {};

        if (
          Object.keys(point).length != 0 &&
          Object.keys(point).includes(structure)
        ) {
          delete point[structure];
        }

        Object.assign(point, listMark[i]);

        await MarkModel.findOneAndUpdate(
          { MSSV: listMSSV[i], CodeClass: codeClass },
          { $set: { Point: point } }
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

  getMark = async (codeClass: string, MSSV: string) => {
    try {
      const mark = await MarkModel.findOne(
        { CodeClass: codeClass, MSSV: MSSV },
        { _id: 0, _v: 0 }
      );

      return {
        data: mark,
        message: "Info Mark",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };

  updateMark = async (
    codeClass: string,
    MSSV: string,
    Point: any,
    MarkType: string
  ) => {
    try {
      const mark: any = await MarkModel.findOne({
        MSSV: MSSV,
        CodeClass: codeClass,
      });

      let point = mark.Point || {};
      point[MarkType] = Point;

      const updateMark = await MarkModel.findOneAndUpdate(
        { CodeClass: codeClass, MSSV: MSSV },
        { $set: { Point: point } }
      );

      if (updateMark) {
        return {
          data: true,
          message: "Update success",
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

export const markServices = new MarkServices();

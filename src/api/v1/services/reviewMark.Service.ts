import { ReviewMarkModel } from "../models";

class ReviewMarkServices {
  getAllReviewMark = async (codeClass: string) => {
    try {
      const reviewMark = await ReviewMarkModel.find(
        { CodeClass: codeClass },
        { _id: 0, _v: 0 }
      );

      return {
        data: reviewMark,
        message: "List Review Mark " + { codeClass },
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };

  getReviewMark = async (codeClass: string, MSSV: string) => {
    try {
      const reviewMark = await ReviewMarkModel.find(
        { CodeClass: codeClass, MSSV: MSSV },
        { _id: 0, _v: 0 }
      );

      return {
        data: reviewMark,
        message: "List Review Mark " + { codeClass } + { MSSV },
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };

  addReviewMark = async (reviewMark: any) => {
    try {
      const addReviewMark = new ReviewMarkModel({ ...reviewMark });
      const saveReviewMark = addReviewMark.save();

      return {
        data: true,
        message: "Added successful review mark",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };

  updateReviewMark = async (
    MSSV: string,
    codeClass: string,
    typeMark: string,
    reviewMark: any,
    currentMark: number,
    desiredMark: number,
    commentStudent: string
  ) => {
    try {
      const status = await ReviewMarkModel.findOneAndUpdate(
        {
          MSSV: MSSV,
          CodeClass: codeClass,
          TypeMark: typeMark,
          CurrentMark: currentMark,
          DesiredMark: desiredMark,
          CommentStudent: commentStudent,
        },
        { $set: { ...reviewMark } }
      );

      return {
        data: status != null ? true : false,
        message: "Added successful review mark",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
}

export const reviewMarkServices = new ReviewMarkServices();

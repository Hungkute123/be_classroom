import { AccountModel } from "../models";

class AccountServices {
  getAccountByEmail = async (email: string) => {
    try {
      const account = await AccountModel.findOne(
        { Email: email },
        { __v: 0, Password: 0 }
      );

      return account;
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };

  getPasswordByEmail = async (email: string) => {
    try {
      const password = await AccountModel.findOne(
        { Email: email },
        { Password: 1, _id: 0 }
      );

      return password;
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };

  register = async (account: Object, email: string) => {
    try {
      const isAccount = await AccountModel.find(
        { Email: email },
        { Password: 0, _id: 0, __v: 0 }
      );

      if (isAccount.length != 0) {
        return {
          data: false,
          message: "Account already exists",
          status: 200,
        };
      }

      const createAccount = new AccountModel({ ...account });
      const saveAccount = await createAccount.save();

      return {
        data: true,
        message: "Register Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  getInfoByListID = async (listID: any) => {
    try {
      const info = await AccountModel.find(
        { _id: {$in: listID }  },
        { Password: 0, __v: 0 }
      );

      if (info.length === 0) {
        return {
          data: null,
          message: "Not available",
          status: 400,
        };
      }

      return {
        data: info,
        message: "Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
}
export const accountServices = new AccountServices();

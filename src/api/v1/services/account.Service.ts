import { async } from "crypto-random-string";
import { AccountModel } from "../models";

class AccountServices {
  getAccount = async (key: Object, criteria: Object = { _id: 0, __v: 0 }) => {
    try {
      const account = await AccountModel.findOne({ ...key }, { ...criteria });

      return account;
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };

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

      if (password) {
        return password.Password;
      }

      return "";
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

  updateAccount = async (account: Object, key: Object) => {
    try {
      const update = await AccountModel.findOneAndUpdate(
        { ...key },
        { $set: { ...account } }
      );

      if (update) {
        return {
          data: true,
          message: "Account update successfully",
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

  getInfoByListID = async (listID: any) => {
    try {
      const info = await AccountModel.find(
        { _id: { $in: listID } },
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
getListAccountsWithPermission = async (Permission: string) => {
    try {
      const list = await AccountModel.find(
        { Permission: Permission },
        { Password: 0, __v: 0 }
      );
      if (list.length === 0) {
        return {
          data: null,
          message: "Not available",
          status: 400,
        };
      }

      return {
        data: list,
        message: "Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  deleteAccount = async (id: any) => {
    try {
      const del = await AccountModel.deleteOne(
        { _id: id },
      );

      if (del) {
        return {
          data: true,
          message: "Account delete successfully",
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

  forgotPassword = async (email: string, password: string) => {
    try {
      const update = await AccountModel.findOneAndUpdate(
        { Email: email },
        { $set: { Password: password } }
      );

      if (update) {
        return {
          data: true,
          message: "Successfully updated new password",
          status: 200,
        };
      }

      return {
        data: false,
        message: "New password update failed",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
}
export const accountServices = new AccountServices();

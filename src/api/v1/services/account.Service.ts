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
        { _id: 0, __v: 0, Password: 0 }
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
        message: "Account does not exist",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
}
export const accountServices = new AccountServices();

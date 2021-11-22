import  {MemberModel}  from '../models/member.Model/member.Model';

class MemberServices {
	
	addMember = async (IDUser: number, CodeClass: string, Permission: string, Status: boolean ) => {
		try {
			const addMember = new MemberModel({
                IDUser: IDUser,
                CodeClass: CodeClass,
                Permission: Permission,
                Status: Status
            })
			const saveMember = await addMember.save();
            return {
				data: saveMember,
				message: 'Add member susscess',
				status: 200,
			};

		} catch (error: any) {
			throw new Error(error.messages);
		}
	};
	getTeacherByCodeClass = async (CodeClass: string) => {
		try {
			const members = await MemberModel.find({CodeClass: CodeClass, Permission: 'Teacher'});
			if (members === null) {
				return {
					data: null,
					message: 'can not find teacher',
					status: 400,
				};
			}
			return {
				data: members,
				message: 'Success',
				status: 200,
			};
		} catch (error: any) {
			throw new Error(error.messages);
		}
	};
    getStudentByCodeClass = async (CodeClass: string) => {
		try {
			const members = await MemberModel.find({CodeClass: CodeClass, Permission: 'Student'});
			if (members === null) {
				return {
					data: null,
					message: 'can not find student',
					status: 400,
				};
			}
			return {
				data: members,
				message: 'Success',
				status: 200,
			};
		} catch (error: any) {
			throw new Error(error.messages);
		}
	};
}
export const memberServices = new MemberServices()
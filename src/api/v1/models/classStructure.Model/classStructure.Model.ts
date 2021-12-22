import { Schema, model } from 'mongoose';

interface ClassStructure {
    CodeClass: string,
    MarkType: string,
    Mark: number,
    Complete: boolean,
}
const ClassStructureSchema =  new Schema<ClassStructure>({
    CodeClass: {type: String, require: true},
    MarkType: {type: String, require: true},
    Mark: {type: Number, require: true},
    Complete: {type: Boolean, require: true}
});

export const ClassStructureModel = model<ClassStructure>('classStructure', ClassStructureSchema);

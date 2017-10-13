import Mongoose from './mongodb-connection';

const UserSchema = Mongoose.Schema({
    id: Mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
    i_number: Number,
    admin: Boolean,
    simulation_role: {type: Mongoose.Schema.Types.ObjectId, ref: 'Role'}
});

const UserModel = Mongoose.model('User', UserSchema);

export default UserModel;
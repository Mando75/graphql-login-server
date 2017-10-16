import {findUserById} from "./connectors/userConnector";

const userMap = {
  RootQuery: {
    async user(obj, args) {
        return await findUserById(args.user_id);
      }
    }
  };

export default userMap;

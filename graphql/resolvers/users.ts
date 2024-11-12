import { getOneUser, getUsersFromTeam } from "../../services/users";

const userResolvers = {
  Query: {
    getAllUsersFromTeam: async (_: any, args: { teamId: string }) => {
      return await getUsersFromTeam(args.teamId);
    },
    getOneUser: async (_: any, args: { id: string }) => {
      return await getOneUser(args.id);
    }
  }
};
export default userResolvers;
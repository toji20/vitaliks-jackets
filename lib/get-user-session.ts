import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getUserSession = async () => {
  try {
    const session = await getServerSession(authOptions);
    return session?.user ?? null;
  } catch (error) {
    console.error('Error getting user session:', error);
    return null;
  }
};
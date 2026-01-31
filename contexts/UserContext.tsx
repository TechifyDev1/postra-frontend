import { userContextInterface } from "@/types/userType";
import { createContext } from "react";

export const UserContext = createContext<userContextInterface | null>(null);
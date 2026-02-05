"use client"
import { ProfileCountsContextType } from "@/types/profileCount";
import { createContext } from "react";

export const ProfileCountsContext = createContext<ProfileCountsContextType | null>(null);
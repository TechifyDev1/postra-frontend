"use client"
import MediumButton from "@/components/landing-page/cell/medium-button/MediumButton";
import { useUserContext } from "@/hooks/use-user-context";
import { useRouter } from "next/navigation";
import { FC } from "react";

const EditButton: FC<{ username: string, slug: string }> = ({ username, slug }) => {
    const { push } = useRouter();
    const {user, isLoading} = useUserContext();
    if(isLoading) return;
    if(user?.username != username) {
        return;
    }
    
    const handleEdit = () => {
        push(`/${username}/${slug}/edit`)
    }
    return <MediumButton onClick={handleEdit}>
        Edit
    </MediumButton>
}

export default EditButton;
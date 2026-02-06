import NavBarWrapper from "@/components/main-components/organ/NavBarWrapper";
import PostEditor from "@/components/main-components/organ/PostEditor/PostEditor";

export default function page() {
    return (
        <>
        <NavBarWrapper />
        <PostEditor edit={true}/>
        </>
    )
}
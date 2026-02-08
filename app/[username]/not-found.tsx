import NotFoundUI from "@/components/main-components/organ/NotFoundUI";

export default function UserNotFound() {
    return (
        <NotFoundUI
            title="User Not Found"
            description="The user you are looking for does not exist or has been removed."
            actionText="Go Home"
            actionLink="/"
        />
    );
}

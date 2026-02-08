import NotFoundUI from "@/components/main-components/organ/NotFoundUI";

export default function GlobalNotFound() {
    return (
        <NotFoundUI
            title="Page Not Found"
            description="The page you are looking for does not exist or has been moved."
            actionText="Go Home"
            actionLink="/"
        />
    );
}

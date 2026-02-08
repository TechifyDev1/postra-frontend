import NotFoundUI from "@/components/main-components/organ/NotFoundUI";

export default function PostNotFound() {
    return (
        <NotFoundUI
            title="Post Not Found"
            description="This story might have been deleted or the link is incorrect."
            actionText="Read other stories"
            actionLink="/"
        />
    );
}

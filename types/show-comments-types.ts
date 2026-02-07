import { Dispatch, SetStateAction } from "react";

export interface showCommentContextInterface {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    slug: string | null;
    setSlug: Dispatch<SetStateAction<string | null>>;
}
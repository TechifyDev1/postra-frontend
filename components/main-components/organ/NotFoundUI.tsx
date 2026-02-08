import LargeButton from "@/components/landing-page/cell/large-button/LargeButton";
import LargeText from "@/components/landing-page/cell/large-text/LargeText";
import XlargeText from "@/components/landing-page/cell/xlarge-text/XlargeText";
import NavBarWrapper from "@/components/main-components/organ/NavBarWrapper";
import Link from "next/link";
import React from "react";

interface NotFoundUIProps {
    title: string;
    description: string;
    actionText: string;
    actionLink: string;
}

const NotFoundUI: React.FC<NotFoundUIProps> = ({
    title,
    description,
    actionText,
    actionLink,
}) => {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <NavBarWrapper />
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    textAlign: "center",
                }}
            >
                <XlargeText align="alignCenter">{title}</XlargeText>
                <div style={{ margin: "1rem 0 2rem" }}>
                    <LargeText align="center">{description}</LargeText>
                </div>
                <Link href={actionLink}>
                    <LargeButton>{actionText}</LargeButton>
                </Link>
            </div>
        </div>
    );
};

export default NotFoundUI;

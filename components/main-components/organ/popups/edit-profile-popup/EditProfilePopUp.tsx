'use client';
import { FC, useContext, useState, useEffect, useRef } from "react";
import Modal from "@/components/landing-page/tissue/modal/Modal";
import { ModalContext } from "@/contexts/ModalContext";
import { useUserContext } from "@/hooks/use-user-context";
import style from "./EditProfilePopUp.module.css";
import LargeText from "@/components/landing-page/cell/large-text/LargeText";
import MediumButton from "@/components/landing-page/cell/medium-button/MediumButton";
import { useToast } from "@/contexts/ToastContext";
import { signUrl, updateUserUrl } from "@/utils";
import { Camera, X } from "phosphor-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const EditProfilePopUp: FC = () => {
    const { modals, closeModal } = useContext(ModalContext);
    const { user } = useUserContext();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const bannerInpRef = useRef<HTMLInputElement>(null);
    const profileInpRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        fullName: "",
        bio: "",
        profilePic: "",
        bgImage: "",
    });

    useEffect(() => {
        console.log(user)
        if (user) {
            setFormData({
                fullName: user.fullName || "",
                bio: user.bio || "",
                profilePic: user.profilePictureUrl || "",
                bgImage: user.bgImage || "",
            });
        }
    }, [user, modals.editProfile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (type: 'profilePic' | 'bgImage') => {
        const inputRef = type === 'profilePic' ? profileInpRef : bannerInpRef;
        if (!inputRef.current) return;

        inputRef.current.click();
        inputRef.current.onchange = async (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (!target.files?.length) return;

            const file = target.files[0];
            if (file.size > MAX_FILE_SIZE) {
                showToast("File size exceeds 5MB", "error");
                return;
            }

            setUploading(true);
            try {
                const timestamp = Math.round(new Date().getTime() / 1000);
                const signRes = await fetch(signUrl(), {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ timestamp })
                });

                if (!signRes.ok) throw new Error("Failed to sign URL");

                const { data: { signature } } = await signRes.json();
                const formData = new FormData();
                formData.append("file", file);
                formData.append("api_key", "544934933231257");
                formData.append("timestamp", timestamp.toString());
                formData.append("signature", signature);

                const uploadRes = await fetch("https://api.cloudinary.com/v1_1/dvpkp0u9u/image/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!uploadRes.ok) throw new Error("Upload failed");

                const data = await uploadRes.json();
                setFormData(prev => ({ ...prev, [type]: data.secure_url }));
                showToast("Image uploaded successfully", "success");
            } catch (error) {
                console.error("Upload error:", error);
                showToast("Failed to upload image", "error");
            } finally {
                setUploading(false);
                if (inputRef.current) inputRef.current.value = "";
            }
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(updateUserUrl(), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include"
            });

            if (res.ok) {
                showToast("Profile updated successfully", "success");
                closeModal("editProfile");
                window.location.reload();
            } else {
                const errorData = await res.json();
                showToast(errorData.message || "Failed to update profile", "error");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            showToast("An error occurred while updating profile", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={modals.editProfile} onClose={() => closeModal("editProfile")}>
            <div className={style.container} onClick={(e) => e.stopPropagation()}>
                <LargeText align="center" >Edit Profile</LargeText>

                <input type="file" accept="image/*" ref={bannerInpRef} style={{ display: 'none' }} />
                <input type="file" accept="image/*" ref={profileInpRef} style={{ display: 'none' }} />

                <div className={style.bannerContainer} onClick={() => handleImageUpload('bgImage')}>
                    {formData.bgImage ? (
                        <img src={formData.bgImage} alt="Banner" className={style.bannerImage} />
                    ) : (
                        <div className={style.bannerPlaceholder}>Add Cover Image</div>
                    )}
                    <div className={style.overlay}>
                        <Camera size={32} />
                    </div>

                    <div className={style.profilePicContainer} onClick={(e) => { e.stopPropagation(); handleImageUpload('profilePic'); }}>
                        {formData.profilePic ? (
                            <img src={formData.profilePic} alt="Profile" className={style.profileImage} />
                        ) : (
                            <div className={style.bannerPlaceholder}>Photo</div>
                        )}
                        <div className={style.overlay}>
                            <Camera size={24} />
                        </div>
                    </div>
                </div>

                <form className={style.form} onSubmit={handleSubmit} style={{ marginTop: '3rem' }}>
                    <div className={style.inputGroup}>
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={style.inputGroup}>
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>

                    <div className={style.buttonContainer}>
                        <MediumButton type="button" onClick={() => closeModal("editProfile")}>
                            Cancel
                        </MediumButton>
                        <MediumButton type="submit" disabled={loading || uploading}>
                            {uploading ? "Uploading..." : loading ? "Saving..." : "Save Changes"}
                        </MediumButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default EditProfilePopUp;

"use client";

import { ImageAvatarProps } from '@/types/types';
import style from './ImageAvatar.module.css';
import Image from "next/image";
import Link from 'next/link';
import { useUserContext } from '@/hooks/use-user-context';

const ImageAvatar = ({ src, alt, size = 'medium', username }: ImageAvatarProps) => {
    const { user } = useUserContext();
    return (
        <Link className={`${style.ImageAvatar} ${style[size]}`} href={`/${username}`}>
            <Image
                src={user?.profilePictureUrl ?? src}
                alt={alt ?? 'Avatar'}
                layout="fill"
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 30px, 50px"
            />
        </Link>
    );
};

export default ImageAvatar;

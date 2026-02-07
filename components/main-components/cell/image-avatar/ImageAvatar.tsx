import { ImageAvatarProps } from '@/types/types';
import style from './ImageAvatar.module.css';
import Image from "next/image";
import Link from 'next/link';

const ImageAvatar = ({ src, alt, size = 'medium', username }: ImageAvatarProps) => {
    return (
        <Link className={`${style.ImageAvatar} ${style[size]}`} href={`/${username}`}>
            <Image
                src={src}
                alt={alt ?? 'Avatar'}
                layout="fill"
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 30px, 50px"
            />
        </Link>
    );
};

export default ImageAvatar;

import { ImageAvatarProps } from '@/types/types';
import style from './ImageAvatar.module.css';
import Image from 'next/image';

const ImageAvatar = ({ src, alt, size }: ImageAvatarProps) => {
    return (
        <Image
            className={`${style.ImageAvatar} ${style[size ? size : 'medium']}`}
            src={src}
            alt={alt ? alt : 'Avatar'}
        />
    );
};

export default ImageAvatar;

import { ImageAvatarProps } from '@/types/types';
import style from './ImageAvatar.module.css';
import Image from 'next/image';

const ImageAvatar = ({ src, alt, size = 'medium' }: ImageAvatarProps) => {
    return (
        <div className={`${style.ImageAvatar} ${style[size]}`}>
            <Image
                src={src}
                alt={alt ?? 'Avatar'}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 30px, 50px"
            />
        </div>
    );
};

export default ImageAvatar;

import { ImageAvatarProps } from '@/types/types';
import style from './ImageAvatar.module.css';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const ImageAvatar = ({ src, alt, size = 'medium', username }: ImageAvatarProps) => {
    const {push} = useRouter();
    const handleClick = () => {
        push(`/${username}`)
    }
    return (
        <div className={`${style.ImageAvatar} ${style[size]}`} onClick={handleClick}>
            <Image
                src={src}
                alt={alt ?? 'Avatar'}
                layout="fill"
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 30px, 50px"
            />
        </div>
    );
};

export default ImageAvatar;

import { StaticImageData } from "next/image";
import { ReactNode } from "react";

interface TextProps {
  align?: "alignLeft" | "alignCenter" | "alignRight";
  children: ReactNode;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export type { TextProps };
export interface SmallTextProps extends TextProps {
  // Additional properties specific to SmallText can be added here
}

export interface LargeTextProps extends TextProps {
  // Additional properties specific to LargeText can be added here
}

export interface MediumTextProps extends TextProps {
  // Additional properties specific to MediumText can be added here
}

export interface ImageAvatarProps {
  src: StaticImageData | string;
  alt?: string;
  size?: "small" | "medium" | "large";
}

export interface FollowButtonProps {
  isFollowing: boolean;
  onClick: () => void;
}

export interface LikeButtonProps {
  isLiked: boolean;
  count: number;
  slug: string;
}

export interface CommentButtonProps {
  onClick?: () => void;
  count: number;
  slug?: string;
}

// export interface SearchBarProps {
//     device: 'desktop' | 'mobile';
// }

export interface PostListProps {
  id?: number;
  title: string;
  subtitle?: string;
  image?: StaticImageData | string;
  likes: number;
  comments: number;
  time: string;
  slug: string;
  authorFullName?: string;
}

interface DefaultAvatarProps {
  size?: number;
  className?: string;
}

export const DefaultAvatar = ({ size = 32, className = '' }: DefaultAvatarProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="32" height="32" fill="#E4E4E7" />
      
      {/* User icon */}
      <path
        d="M16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16Z"
        fill="#71717A"
      />
      <path
        d="M16 18C11.5817 18 8 21.5817 8 26V28H24V26C24 21.5817 20.4183 18 16 18Z"
        fill="#71717A"
      />
    </svg>
  );
};

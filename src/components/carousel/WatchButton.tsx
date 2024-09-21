import { Link } from "react-router-dom";

type WatchButtonProps = {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    link?: string;
    variant?: "primary" | "secondary";
};

const WatchButton = ({
    label,
    icon,
    onClick,
    link,
    variant = "primary",
}: WatchButtonProps) => {
    const buttonClasses = `
        flex items-center justify-center gap-2 
        ${
            variant === "primary"
                ? "bg-red-full border-red-full text-white"
                : "border-red-full "
        }
        border-2 rounded-md font-bold text-base sm:text-xl md:text-2xl
        px-1 py-2 md:px-3 md:py-4 transition-all duration-500 ease-in-out
        hover:bg-red-full-800 hover:border-red-full-800
    `;

    if (link) {
        return (
            <Link to={link} className={buttonClasses}>
                {label}
                {icon}
            </Link>
        );
    }

    return (
        <button className={buttonClasses} onClick={onClick}>
            {label}
            {icon}
        </button>
    );
};

export default WatchButton;

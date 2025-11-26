import React from "react";
import { cn } from "../../lib/utils";

const gradientButtonVariants = {
    default: "",
    variant: "gradient-button-variant",
};

const GradientButton = React.forwardRef(
    ({ className, variant = "default", children, ...props }, ref) => {
        const variantClass = gradientButtonVariants[variant] || gradientButtonVariants.default;

        return (
            <button
                className={cn(
                    "gradient-button",
                    "inline-flex items-center justify-center",
                    "rounded-[11px] min-w-[132px] px-9 py-4",
                    "text-base leading-[19px] font-[500] text-white",
                    "font-sans font-bold",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    "disabled:pointer-events-none disabled:opacity-50",
                    variantClass,
                    className
                )}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
);

GradientButton.displayName = "GradientButton";

export default GradientButton;
export { gradientButtonVariants };

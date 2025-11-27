import { cn } from "../../lib/utils";
import { Sparkles } from "lucide-react";

function DisplayCard({
    className,
    icon = <Sparkles className="size-4 text-[#DFB6B2]" />,
    title = "Featured",
    description = "Discover amazing content",
    date = "Just now",
    iconClassName = "text-[#854F6C]",
    titleClassName = "text-[#FBE4D8]",
}) {
    return (
        <div
            className={cn(
                "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-[#522B5B]/30 bg-[#150B1F]/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-[#050205] after:to-transparent after:content-[''] hover:border-[#DFB6B2]/40 hover:bg-[#150B1F]/90 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
                className
            )}
        >
            <div>
                <span className="relative inline-block rounded-full bg-[#522B5B] p-1">
                    {icon}
                </span>
                <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
            </div>
            <p className="whitespace-nowrap text-lg text-[#FBE4D8]/80">{description}</p>
            <p className="text-[#DFB6B2]/60">{date}</p>
        </div>
    );
}

export default function DisplayCards({ cards }) {
    const defaultCards = [
        {
            className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[#522B5B]/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#050205]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[#522B5B]/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#050205]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
        },
    ];

    const displayCards = cards || defaultCards;

    return (
        <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
            {displayCards.map((cardProps, index) => (
                <DisplayCard key={index} {...cardProps} />
            ))}
        </div>
    );
}

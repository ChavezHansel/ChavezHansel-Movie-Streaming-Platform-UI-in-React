import React from "react";
import { Link } from "react-router-dom";
import FormatTag from "./FormatTag";
import Runtime from "./common/Runtime";

interface MediaCardProps {
    id: number;
    title: string;
    posterPath: string;
    formats: string[];
    runtime?: string;
    type: "movies" | "series" | "animation";
}

const MediaCard = ({
    id,
    title,
    posterPath,
    formats,
    runtime,
    type,
}: MediaCardProps) => {
    return (
        <Link
            to={`/${type}`}
            key={id}
            className="media-card max-w-full overflow-hidden"
        >
            <div className="max-h-[22rem] w-full rounded-lg flex items-center justify-center overflow-hidden">
                <img
                    src={`https://image.tmdb.org/t/p/w780${posterPath}`}
                    alt={title}
                    className="rounded-lg h-full w-auto"
                />
            </div>
            <div className="flex flex-row xs:flex-col sm:flex-col lg:flex-row gap-1 justify-between items-start mt-4">
                <h3 className="text-base truncate lg:text-lg text-white font-medium">
                    {title}
                </h3>
                <div className="flex gap-2 items-start min-w-[115px] justify-end">
                    <FormatTag name={formats[0]} />
                    <div className="border-red-full font-medium p-1 border rounded-md  flex items-center">
                        {runtime ? (
                            <Runtime value={runtime} />
                        ) : (
                            <p>Season 1</p>
                        )}{" "}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MediaCard;

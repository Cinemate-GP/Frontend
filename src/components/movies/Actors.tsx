"use clent";
import SectionTitle from "../SectionTitle";
import Link from "next/link";
import { SkeletonActors } from "../skeletons";
import ActorImage from "./ActorImag";
import { useState } from "react";
interface ActorsProps {
  id: number;
  name: string;
  role: string;
  extra: string;
  profilePath: string;
}

export default function Actors({
  actors,
  loading,
}: {
  actors: ActorsProps[] | undefined;
  loading: boolean;
}) {
  const [selected, setSelected] = useState("all");
  if (loading) return <SkeletonActors />;
  return (
    <div className="bg-secondaryBg mb-[4rem] mt-32 section p-4">
      <SectionTitle title="Staff" />
      <div className="flex gap-3 my-3 rounded bg-sideNavBg p-4 ">
        <button
          onClick={() => setSelected("all")}
          className={`${
            selected === "all" ? "bg-primary text-white" : ""
          } rounded-lg px-4 py-2 hover:bg-primary hover:text-white`}
        >
          All
        </button>
        <button
          onClick={() => setSelected("cast")}
          className={`${
            selected === "cast" ? "bg-primary text-white" : ""
          } rounded-lg px-4 py-2 hover:bg-primary hover:text-white`}
        >
          Cast
        </button>
        <button
          className={`${
            selected === "crew" ? "bg-primary text-white" : ""
          } rounded-lg px-4 py-2 hover:bg-primary hover:text-white`}
          onClick={() => setSelected("crew")}
        >
          Crew
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 bg-secondaryBg p-[1rem] rounded-xl max-h-[600px] overflow-auto custom-scrollbar">
        {actors?.length === 0 && <p>No Actors Found</p>}
        {(selected === "all"
          ? actors
          : actors?.filter((item) => item.role === selected)
        )?.map((actor) => (
          <Link
            href={`/actors/${actor.id}`}
            key={`${actor.id}-${actor.name}`}
          >
            <div className="flex items-center gap-4 hover:bg-hoverBg p-4 rounded-lg transition-all duration-300 shadow-sm">
              <ActorImage profilePath={actor.profilePath} name={actor.name} />

              <div className="flex flex-col gap-2">
                <h3 className="text-foreground font-bold">{actor.name}</h3>
                <p className="text-textMuted text-sm">{actor.extra}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

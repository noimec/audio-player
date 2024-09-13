import { FC, useCallback, useState } from "react";

import { DataSvg, TimeSvg } from "../../assets/svg";
import { Track } from "../Track";
import type { TracksScreenProps } from "../../types/components";

export const TracksScreen: FC<TracksScreenProps> = ({ tracks }) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const handleDropdownOpen = useCallback((trackId: number) => {
    setOpenDropdownId((prevId) => (prevId === trackId ? null : trackId));
  }, []);

  const handleDropdownClose = useCallback(() => {
    setOpenDropdownId(null);
  }, []);

  return (
    <section>
      <h2 className="text-3xl mb-1 sm:pt-4">Треки</h2>
      <div className="flex text-[#a4a4a4] text-xs items-center py-3 lg:hidden">
        <div className="w-full max-w-10">№</div>
        <div className="w-full max-w-[434px]">НАЗВАНИЕ</div>
        <div className="max-w-[363px] w-full xxl:max-w-[262px]">АЛЬБОМ</div>
        <div className="w-full max-w-[488px] mr-auto xxl:max-w-[239px]">
          <DataSvg />
        </div>
        <div className="w-full max-w-[200px] xxl:max-w-[99px]">
          <TimeSvg />
        </div>
      </div>
      <ul>
        {tracks &&
          tracks.map((track, index) => (
            <Track
              key={track.id}
              {...track}
              index={index + 1}
              isDropdownOpen={track.id === openDropdownId}
              onDropdownOpen={() => handleDropdownOpen(track.id)}
              onDropdownClose={handleDropdownClose}
            />
          ))}
      </ul>
    </section>
  );
};

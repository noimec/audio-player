import { RefObject, useEffect } from "react";

import { useLatest } from "./useLatest";

export const useOutsideClick = (
    ref: RefObject<HTMLElement | null>,
    callback: () => void,
    attached = true
) => {
    const latestHandler = useLatest(callback);

    useEffect(() => {
        if (!attached) return;

        const handleClick = (e: Event) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) {
                latestHandler.current()
            }
        };

        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [ref, latestHandler, attached]);
};
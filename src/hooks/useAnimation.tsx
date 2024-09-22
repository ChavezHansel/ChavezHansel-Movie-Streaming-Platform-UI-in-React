import { useContext } from "react";
import AnimationContext from "../context/AnimationContext.tsx";

const useAnimation = () => {
    return useContext(AnimationContext);
};
export default useAnimation;

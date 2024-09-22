import { RxTimer } from "react-icons/rx";
type RuntimeProps = {
    value: string;
};

const Runtime = ({ value }: RuntimeProps) => {
    return (
        <p className="text-base font-semibold text-white flex gap-1 items-center">
            <RxTimer className="text-xl" />
            {value}
        </p>
    );
};

export default Runtime;

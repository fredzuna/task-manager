interface IProps {
    text: string
}

export function TooltipMarker({ text }: IProps) {
    return (
        <div id="tooltip-default" role="tooltip" className=" w-7 absolute bg-gray-500 text-[10px] text-white whitespace-nowrap -top-4 text-ellipsis overflow-hidden ">
            {text}
        </div>
    )
}
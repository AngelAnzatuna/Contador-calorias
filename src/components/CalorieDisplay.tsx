
type CalorieDisplayProps = {
    calories: number,
    text: string
}

export default function CalorieDisplay({calories, text} : CalorieDisplayProps) {
    return (
        <p className = "text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center" >
            <span className={`font-black text-6xl ${calories >= 0 ? 'text-green-400' : 'text-red-400'} `}>{calories}</span>
            {text}
        </p >
    )
}

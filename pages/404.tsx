import Link from 'next/link'

export default function FourOhFour() {
    return <div className="h-[90vh] flex items-center justify-center" aria-label="404">
        <div className="flex flex-col items-center">
            <div className="flex gap-1">
                <span className="text-[#E3115D] text-[60px] font-bold">4</span>
                <span className="text-[#2AC6FA] text-[60px] font-bold">0</span>
                <span className="text-[#6EB741] text-[60px] font-bold">4</span>
            </div>
            <span className="block">Страница не найдена</span>
        </div>
        
    </div>
}
'use client'

import { cn } from "@/lib/utils"
import { JacketWithRelations } from "./jacket-list"
import { ModalJacketCard } from "./modal-page-card"

interface Props {
    className?: string
    items: JacketWithRelations[]
}

export const MainCards: React.FC<Props> = ({
    className,
    items
}) => {
    const sliceItems = items.slice(0,4)
    
    return (
        <section className={cn('py-20 bg-black', className)}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-2xl font-light text-white mb-3 tracking-wide">
                        ПОПУЛЯРНЫЕ МОДЕЛИ
                    </h2>
                    <div className="w-12 h-px bg-white mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sliceItems.map((item) => (
                        <ModalJacketCard 
                            key={item.id}
                            jacket={item}
                            className="bg-transparent border border-gray-800 hover:border-gray-600 transition-colors duration-300"
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
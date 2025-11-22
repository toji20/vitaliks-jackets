'use client'

import React from "react";
import { cn } from "@/lib/utils";
import { useQueryFilters } from "@/hooks/use-query-filters";
import { Input } from "../ui/input";
import { RangeSlider } from "../ui/range-slider";
import { useFilters } from "@/hooks/use-filters";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const filters = useFilters()

    useQueryFilters(filters)


    const updatePrices = (prices: number[]) => {
        filters.setPrices('priceFrom', prices[0]);
        filters.setPrices('priceTo', prices[1]);
    }

    return (
        <div className={className}>


            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                    type="number" 
                    placeholder="0" 
                    min={0} 
                    max={15000} 
                    value={String(filters.prices.priceFrom)} 
                    onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}/>
                    <Input 
                    type="number"
                     min={0} 
                     max={15000} 
                     placeholder="15000" 
                     value={String(filters.prices.priceTo)}
                     onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}/>
                </div>

                <RangeSlider
                min={0} 
                max={15000} step={500} 
                value={[ filters.prices.priceFrom || 0, filters.prices.priceTo  || 15000
                ]}
                onValueChange={updatePrices}/>
            </div>
        </div>
    );
};
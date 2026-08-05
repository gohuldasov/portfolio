import React from "react";
import type { EducationItemData } from "./educationData";
import { EducationCard } from "./EducationCard";

interface EducationItemProps {
    data: EducationItemData;
    index: number;
}

export const EducationItem: React.FC<EducationItemProps> = ({ data, index }) => {
    return (
        <EducationCard
            data={data}
            index={index}
            totalCards={4}
            isActive={true}
        />
    );
};

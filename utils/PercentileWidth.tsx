const getWidthClass = (width: number) => {
    if(width === 100) return `w-[100%]`;
    if (width >= 90) return 'w-[90%]';
    if (width >= 75) return 'w-[75%]';
    if (width >= 50) return 'w-[50%]';
    if (width >= 25) return 'w-[25%]';
    return 'w-[10%]';
};

export default getWidthClass;
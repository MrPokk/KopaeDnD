export const randomRoll = (min: number, max: number, modifier?: number) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min) + (modifier || 0);
}
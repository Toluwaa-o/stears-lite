/**
 * Removes all emojis from the given text
 * @param text - Input string potentially containing emojis
 * @returns Cleaned string with emojis removed
 */
const removeEmojis = (text: string): string => {
    // Comprehensive emoji regex pattern
    const emojiPattern = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2700}-\u{27BF}\u{24C2}-\u{1F251}]/gu;
    return text.replace(emojiPattern, '');
}

export default removeEmojis;
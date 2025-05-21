import { SentimentAnalyzer, PorterStemmer } from 'natural';
import { WordTokenizer } from 'natural';

/**
 * Analyzes the sentiment of a given text and categorizes it
 * @param text - The input text to analyze
 * @returns Object containing score (-1 to 1) and category
 */
const getSentimentCategory = (text: string): number => {
    // Initialize analyzer (using Natural library as VADER alternative)
    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const tokenizer = new WordTokenizer();
    const tokens = tokenizer.tokenize(text) || [];

    // Get sentiment score (-1 to 1)
    const score = analyzer.getSentiment(tokens);

    return score;
}

export default getSentimentCategory;
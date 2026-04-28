import { useState, useEffect } from 'react';

export interface CognitiveScores {
  reaction: number;
  memory: number;
  strategy: number;
  lexical: number;
  consistency: number;
}

export function useScoring() {
  const [scores, setScores] = useState<CognitiveScores>({
    reaction: 75,
    memory: 82,
    strategy: 70,
    lexical: 85,
    consistency: 90
  });

  const readinessScore = Math.round(
    (scores.reaction * 0.3) +
    (scores.memory * 0.25) +
    (scores.strategy * 0.2) +
    (scores.lexical * 0.15) +
    (scores.consistency * 0.1)
  );

  return { scores, readinessScore };
}

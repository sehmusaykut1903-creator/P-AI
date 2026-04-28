import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, RotateCcw, Trophy, Brain } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function ChessGame({ onBack }: Props) {
  const { t } = useTranslation();
  const [game, setGame] = useState(new Chess());
  const [moveCount, setMoveCount] = useState(0);

  const Board = Chessboard as any;

  function makeAMove(move: any) {
    const result = game.move(move);
    if (result) {
        setGame(new Chess(game.fen()));
        setMoveCount(prev => prev + 1);
        return true;
    }
    return false;
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to queen for simplicity
    });

    if (move) {
        // Simple delay for "AI" or just turn-based
        setTimeout(makeRandomMove, 500);
    }
    return move;
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function resetGame() {
    setGame(new Chess());
    setMoveCount(0);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold font-display">{t('games.chess')}</h2>
        </div>
        <button onClick={resetGame} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all border border-white/10">
          <RotateCcw size={14} /> {t('game_labels.restart')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-4 aspect-square max-w-[600px] mx-auto w-full flex items-center justify-center">
          <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl">
            {Board && (
              <Board 
                id="BasicBoard"
                position={game.fen()} 
                onPieceDrop={onDrop}
                boardOrientation="white"
                customDarkSquareStyle={{ backgroundColor: '#1E293B' }}
                customLightSquareStyle={{ backgroundColor: '#334155' }}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
            <div className="glass-card p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t('vitals')}</span>
                    <Trophy className="text-amber-400" size={16} />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">{t('game_labels.moves')}</span>
                        <span className="text-xl font-bold">{moveCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span>{t('game_labels.turn')}</span>
                        <span className={game.turn() === 'w' ? 'text-neon-cyan font-bold' : 'text-neuro-purple font-bold'}>
                            {game.turn() === 'w' ? 'W' : 'B'}
                        </span>
                    </div>
                </div>
                {game.isGameOver() && (
                    <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 text-center font-bold">
                        {t('session_complete')}
                    </div>
                )}
            </div>

            <div className="glass-card p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Brain className="text-neon-cyan" size={16} />
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t('aiInsights')}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

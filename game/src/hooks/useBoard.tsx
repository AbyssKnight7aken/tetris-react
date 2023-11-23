import {useState} from 'react';
import {buildBoard} from '../game-logic/board-builder';

export const useBoard = ({rows, columns}: { rows: number, columns: number }) => {
    const [board] = useState(buildBoard({rows, columns}));

    return [board];
}
import React from 'react';

type State = {
    color: string;
    erase: string;
    thick: string;
    undo_len: number;
};

type Action =
  | { type: 'SET_COLOR'; color: number }
  | { type: 'SET_ERASE'; erase: boolean }
  | { type: 'SET_THICK'; thick: number }
  | { type: 'SET_UNDO_LEN'; undo_len: number }
  | { type: 'RESET' };

export function PenUIReducer(state, action) {
    switch (action.type) {
        case 'SET_COLOR': 
            return ({ 
                ...state,
                color: action.color 
            })
        case 'SET_THICK':
            return ({ 
                ...state,
                erase: false,
                thick: action.thick 
            })
        case 'SET_ERASE':
            return ({ 
                ...state,
                erase: action.erase 
            })
        case 'RESET':
            return ({ 
                ...state,
                erase: false 
            })
        case 'SET_UNDO_LEN':
            return ({ 
                ...state,
                undo_len: action.undo_len 
        })
        default:
            throw new Error('Unhandled action');
}
}
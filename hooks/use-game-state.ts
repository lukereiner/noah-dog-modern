'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { GameState } from "@/types/game";
import { loadGameState, saveGameState, clearGameState, DEFAULT_GAME_STATE } from "@/lib/storage";

const QUERY_KEY = ['gameState'];

export function useGameState() {
    const queryClient = useQueryClient();

    const { data: gameState, isLoading } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: loadGameState,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    const updateStateMutation = useMutation({
        mutationFn: (newState: GameState) => {
            saveGameState(newState);
            return Promise.resolve(newState);
        },
        onSuccess: (newState) => {
            queryClient.setQueryData(QUERY_KEY, newState);
        },
    });

    const resetGameMutation = useMutation({
        mutationFn: () => {
            clearGameState();
            return Promise.resolve(DEFAULT_GAME_STATE);
        },
    });

    /* const placeBetMutation = useMutation({
        mutationFn: ({ wager }: { wager: number }) => {
            const current = queryClient.getQueryData<GameState>(QUERY_KEY) || DEFAULT_GAME_STATE;

            const newState: GameState = {
                ...current,
                wallet: current.wallet - wager,
            };

            saveGameState(newState);
            return Promise.resolve(newState);
        },
        onSuccess: (newState) => {
            queryClient.setQueryData(QUERY_KEY, newState);
        },
    }); */

    const processSpinMutation = useMutation({
        mutationFn: ({ outcome, payout }: { outcome: 'win' | 'loss'; payout: number }) => {
            const current = queryClient.getQueryData<GameState>(QUERY_KEY) || DEFAULT_GAME_STATE;

            const newState: GameState = {
                ...current,
                wallet: current.wallet + payout,
                wins: outcome === 'win' ? current.wins + 1 : current.wins,
                losses: outcome === 'loss' ? current.losses + 1 : current.losses,
            };

            saveGameState(newState);
            return Promise.resolve(newState);
        },
        onSuccess: (newState) => {
            queryClient.setQueryData(QUERY_KEY, newState);
        },
    });

    const updateWagerMutation = useMutation({
        mutationFn: (newWager: number) => {
            const current = queryClient.getQueryData<GameState>(QUERY_KEY) || DEFAULT_GAME_STATE;

            const newState: GameState = {
                ...current,
                wager: newWager,
            };

            saveGameState(newState);
            return Promise.resolve(newState);
        },
        onSuccess: (newState) => {
            queryClient.setQueryData(QUERY_KEY, newState);
        },
    })

    return {
        gameState: gameState || DEFAULT_GAME_STATE,
        isLoading,
        updateGameState: updateStateMutation.mutate,
        resetGame: resetGameMutation.mutate,
        //placeBet: placeBetMutation.mutate,
        processSpin: processSpinMutation.mutate,
        updateWager: updateWagerMutation.mutate,
    };
};
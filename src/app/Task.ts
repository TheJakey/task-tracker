export interface Task {
    id?: number;
    order: number;
    text: string;
    day: Date | null;
    reminder: boolean;
}
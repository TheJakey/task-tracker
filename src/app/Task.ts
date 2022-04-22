export interface Task {
    id?: number;
    text: string,
    day: Date | null,
    reminder: boolean,
}
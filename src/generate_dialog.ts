export const generate_dialog = (personality: string, facts: string[], length: number): string  => {
    const use_variables = `${personality} ${facts} ${length}`;
    return use_variables;
};
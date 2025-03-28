export type Tag = {
    id: number;
    label: string;
};

export type TagsProps = Tag[];
/**
 * TagsOptions
 * @returns TagsProps [{ id: number, label: string }]
 */
export const TagsOptions: TagsProps = [
    {
        id: 1,
        label: 'Cliente optou por marcar outro dia ',
    },
    {
        id: 2,
        label: 'cadastro incorreto',
    },
    {
        id: 3,
        label: 'Cliente remarcou o horário',
    },
    {
        id: 4,
        label: 'Cliente não compareceu',
    },
    {
        id: 5,
        label: 'Documentação rejeitada',
    },
    {
        id: 6,
        label: 'Sem retorno do cliente',
    },
    {
        id: 7,
        label: 'Cliente providenciando novo documento',
    },
    {
        id: 8,
        label: 'Cliente confuso',
    },
]
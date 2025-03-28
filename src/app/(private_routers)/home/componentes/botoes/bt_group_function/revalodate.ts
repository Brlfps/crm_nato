"use server";

import { revalidateTag } from "next/cache";


export default async function revalidateSolicitacao() {
    revalidateTag("get_solicitacao_all");
}

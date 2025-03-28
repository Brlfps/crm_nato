'use client'
import { InputUserContext } from "@/app/implementes/cardCreateUpdate/imputs/imputUsuario";
import { InputCpfContext } from "@/app/implementes/cardCreateUpdate/imputs/inputCpf";
import { InputNameContext } from "@/app/implementes/cardCreateUpdate/imputs/inputName";
import { Button } from "@chakra-ui/react";
import { useContext } from "react";




export function BtnSaveUser() {
     const { NameContex } = useContext(InputNameContext);
     const { CpfContex } = useContext(InputCpfContext);
     const { UserContex} = useContext(InputUserContext);

    return (
        <>
            <Button
                mt={4}
                colorScheme="green"
                type="submit"
            >
                Salvar
            </Button>
        </>
    );
}
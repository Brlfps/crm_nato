import { chakra } from "@chakra-ui/react";



export default function AddRelacionamento() {

    return(
        <>
        <chakra.form>
            <chakra.label htmlFor="email">Email</chakra.label>
            <chakra.input name="email" type="text" />
        </chakra.form>
        </>
    )
}

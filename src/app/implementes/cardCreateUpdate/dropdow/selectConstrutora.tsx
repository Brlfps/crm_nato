'use client';
import { UserCompraContext } from "@/context/UserCompraContext";
import useUserCompraContext from "@/hook/useUserCompraContext";
import { Select, SelectProps } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface DropConstrutoraProps extends SelectProps {}


export default function SelectConstrutora({ ...props }: DropConstrutoraProps) {
    const [Data, setData] = useState<any>([]);
    const {data: session} = useSession();
    const user = session?.user;
    const hierarquia  = user?.hierarquia;
    const { setContrutoraCX } = useUserCompraContext();

    useEffect(() => {
        if (hierarquia === "ADM") {
        (async () => {
            const req = await fetch("/api/construtora/getall");
            const res = await req.json();
            setData(res);
        })();
        } else {
            const construtora = user?.construtora
            setData(construtora);
        }
    }, []);


    return (
      <>
        <Select
          {...props}
          name="construtora"
          placeholder="Selecione uma Construtora"
          onChange={(e) => setContrutoraCX(Number(e.target.value))}
        >
          {Data.map((item: any) => (
            <option key={item.id} value={item.id}>
              {item.fantasia}
            </option>
          ))}
        </Select>
      </>
    );
}
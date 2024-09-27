'use client';

import BtRemoverDistrato from "@/app/componentes/bt_Remover_Distrato";
import { useSession } from "next-auth/react";

interface CardGridDistratoProps {
   Id: any
}

export default function CardGridDistrato({ Id }: CardGridDistratoProps) {
    const { data: session } = useSession();
    const User = session?.user;
    const Hierarquia = User?.hierarquia;

    return (
      <>
        {Hierarquia === "ADM" && (
          <>
            <BtRemoverDistrato id={Id} />
          </>
        )}
        {Hierarquia === "CCA" && (
            <>
              <BtRemoverDistrato id={Id} />
            </>
          )}
      </>
    );
}
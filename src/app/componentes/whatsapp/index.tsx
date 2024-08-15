import { chakra, Input, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { mask, unMask } from "remask";

interface WhatsAppProps {
  onValue: any;
  setValue: string;
  
}

export const Whatsapp = ({ onValue, setValue }: WhatsAppProps) => {
  const [Tel, setTel] = useState("");
  const [IsvalideTel, setIsvalideTel] = useState(false);

  useEffect(() => {
    if (setValue && !Tel) {
      const valor: string = setValue;
      const valorLinpo = unMask(valor);
      const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
      const check = checkwhatsapp(unMask(masked));
      if (!check) {
        setIsvalideTel(true);
      } else {
        onValue(valor);
        setIsvalideTel(false);
      }
      setTel(masked);
    }
  }, [Tel, onValue, setValue]);

  const WhatsAppMask = (e: any) => {
    const valor = e.target.value;
    if (valor.length === 0) {
      setIsvalideTel(false);
    }
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
    setTel(masked);
  };

  const checkwhatsapp = async (whatsapp: string): Promise<boolean> => {
    const request = await fetch("/api/verificador/whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        telefone: whatsapp,
      }),
    });
    const data = await request.json();
    if (data.status !== "VALID_WA_NUMBER") {
      return false;
    }
    return true;
  };

  return (
    <>
      <Input
        type="text"
        value={Tel}
        onChange={WhatsAppMask}
        onBlur={async (e) => {
          const valor = unMask(e.target.value);
          if (valor.length === 11) {
            const check = await checkwhatsapp(valor);
            if (!check) {
              setIsvalideTel(true);
            } else {
              onValue(valor);
              setIsvalideTel(false);
            }
          }
        }}
      />
      {IsvalideTel && (
        <chakra.span color="red" fontSize={"xs"} fontWeight="bold">
          Esse telefone não tem whatsapp
        </chakra.span>
      )}
    </>
  );
};

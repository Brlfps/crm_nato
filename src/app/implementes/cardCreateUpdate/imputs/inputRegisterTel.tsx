"use client";
import { TelefoneMaskFunction } from "@/functions/mask_tel";
import { Box, Input, InputProps, Text } from "@chakra-ui/react";
import { useState } from "react";
import { PropagateLoader, PulseLoader } from "react-spinners";


// Definindo o tipo para SetValue, ajuste conforme necessário para o tipo correto da sua aplicação
interface InputTel1Props extends InputProps {
  Index?: number|any;
}

export const InputRegisterTel = ({ Index, ...props }: InputTel1Props) => {
  const [tel1, setTel1] = useState<string>("");
  const [Teste, setTeste] = useState<boolean>(false);
  const [Error, setError] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const value = e.target.value;
      const valorLimpo = value.replace(/[^0-9]/g, "");
      const MaskTel = TelefoneMaskFunction(valorLimpo);
      setTel1(MaskTel);
    }
  };

  const CheckWhatsApp = async (numero: string) => {
    const request = await fetch("/api/verificador/whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        telefone: numero,
      }),
    });
    const data = await request.json();

    if (data.exists) {
      return true;
    }
    return false;
  };

  const HandleChekTel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const value = e.target.value;
      const valorLimpo = value.replace(/[^0-9]/g, "");
      if (valorLimpo.length > 9) {
        setLoading(true);
        const request = await CheckWhatsApp(valorLimpo);
        if (request) {
          setTeste(true);
          setError(false);
          setLoading(false);
        } else {
          setTeste(false);
          setError(true);
          setLoading(false);
        }
      }
    }
  };

  return (
    <>
      {Loading && (
        <Box
          w={"100%"}
          pt={5}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <PulseLoader color="#68D391" />
        </Box>
      )}
      {!Loading && (
        <Input
          type="text"
          value={tel1}
          onChange={handleChange}
          onBlur={HandleChekTel}
          placeholder="(__) _____-____"
          name={`telefone${Index && Index > 0 && Index}`}
          variant="flushed"
          {...props} // Spread dos props adicionais do Chakra UI
        />
      )}
      {Error && (
        <Text color={"red"} fontSize="xs">
          Telefone não possui WhatsApp
        </Text>
      )}
      <Box hidden>
        <input
          type="checkbox"
          checked={Teste}
          name={`whatCheck${Index && Index > 0 && Index}`}
          onChange={(e) => console.log(e.target.checked)}
          hidden
        />
      </Box>
    </>
  );
};

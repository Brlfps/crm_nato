'use client'
import { Button, ButtonProps } from "@chakra-ui/react";
import {  useFormState, useFormStatus } from "react-dom";
import { BeatLoader } from "react-spinners";

interface BtmProps extends ButtonProps {}


export function SaveBtm(props: BtmProps) {
    const { isLoading , ...otherprops } = props;
    const status = useFormStatus()
    
    return (
      <>
        <Button
          {...otherprops}
          isLoading={status.pending ? true : false}
          spinner={<BeatLoader size={8} color="white" />}
        />
      </>
    );
}

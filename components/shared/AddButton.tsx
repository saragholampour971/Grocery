"use client"
import React, {forwardRef} from 'react';
import {Button, ButtonProps} from "../ui/button";
import {cn} from "../../lib/utils";

const AddButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {className, ...rest} = props
    return (
      <Button ref={ref} className={cn('!w-[46px] !h-[46px] rounded-2xl', className)} {...rest}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
             strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
      </Button>
    );
  }
)
AddButton.displayName = "AddButton"

export default AddButton;

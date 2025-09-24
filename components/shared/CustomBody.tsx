import React, {PropsWithChildren} from 'react';
import {cn} from "../../lib/utils";

const CustomBody = (props: PropsWithChildren & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const {children, className, ...rest} = props
  return (
    <div className={cn('my-4', className)} {...rest}>
      {children}
    </div>
  );
};

export default CustomBody;

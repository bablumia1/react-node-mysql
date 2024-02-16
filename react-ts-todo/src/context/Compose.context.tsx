/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode } from "react";

interface IComposeContext {
  components?: FC<{ children?: ReactNode }>[];
  children?: ReactNode;
}

export default function ComposeContext(props: IComposeContext) {
  const { children, components = [] } = props;

  return (
    <>
      {components.reduceRight((acc, Comp: any) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
}
